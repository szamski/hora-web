import { home } from "@/content/home";
import { getWaitlistCount } from "@/lib/waitlist";
import { HeroScene } from "./HeroScene";

export async function Hero() {
  const liveCount = await getWaitlistCount(home.hero.newsletter.socialProof.count);
  return <HeroScene liveCount={liveCount} />;
}
