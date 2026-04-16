import { type NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const bodySchema = z.object({ email: z.string().email().max(254) });

const ALLOWED_ORIGINS = new Set([
  "https://horacal.app",
  "http://localhost:3000",
]);

function corsHeaders(origin: string | null): HeadersInit {
  const allow =
    origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://horacal.app";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function jsonHeaders(origin: string | null): HeadersInit {
  return { ...corsHeaders(origin), "Content-Type": "application/json" };
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = jsonHeaders(origin);

  const ip = getClientIp(req);
  if (!checkRateLimit(`subscribe:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Try again later." },
      { status: 429, headers },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email" },
      { status: 400, headers },
    );
  }

  const { email } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error("Resend env vars missing");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500, headers },
    );
  }

  const resend = new Resend(apiKey);

  const contact = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  });
  if (contact.error) {
    console.error("Resend contacts.create failed", contact.error);
    return NextResponse.json(
      { error: contact.error.message },
      { status: 500, headers },
    );
  }

  const baseUrl = new URL(req.url).origin;
  const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${encodeURIComponent(
    Buffer.from(email).toString("base64"),
  )}`;

  const html = await render(WelcomeEmail({ unsubscribeUrl }));
  const text = await render(WelcomeEmail({ unsubscribeUrl }), {
    plainText: true,
  });

  const emailRes = await resend.emails.send({
    from: "hora Calendar <hello@horacal.app>",
    to: email,
    subject: "Hey — you're on the hora waitlist",
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  if (emailRes.error) {
    console.error("Resend emails.send failed", emailRes.error);
  }

  after(async () => {
    const ga = process.env.GA_MEASUREMENT_ID;
    const secret = process.env.GA_API_SECRET;
    if (!ga || !secret) return;
    try {
      await fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${ga}&api_secret=${secret}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            client_id: email,
            events: [
              { name: "waitlist_success", params: { method: "server_side" } },
            ],
          }),
        },
      );
    } catch {
      // non-blocking
    }
  });

  return NextResponse.json({ success: true }, { headers });
}
