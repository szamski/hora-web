import { home } from "@/content/home";
import { getWaitlistCount } from "@/lib/waitlist";
import { HeroScene } from "./HeroScene";

export async function Hero() {
  const socialProof = home.hero.newsletter.socialProof;
  const liveCount = await getWaitlistCount(socialProof.count);

  return <HeroScene liveCount={liveCount} />;
}
