import { NextRequest, NextResponse } from "next/server";
import { getWaitlistCount } from "@/lib/waitlist";
import { getPostHogClient } from "@/lib/posthog-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const count = await getWaitlistCount(-1);
  if (count < 0) {
    return NextResponse.json(
      { error: "resend_unavailable" },
      { status: 502 },
    );
  }

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: "system:waitlist-snapshot",
    event: "waitlist_total_snapshot",
    properties: {
      total_subscribers: count,
      source: "resend_audience",
    },
  });
  await posthog.shutdown();

  return NextResponse.json({ ok: true, count });
}
