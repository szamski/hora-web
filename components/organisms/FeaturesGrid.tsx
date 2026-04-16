import Link from "next/link";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { home } from "@/content/home";
import type { IconName } from "@/components/atoms/Icon";

export function FeaturesGrid() {
  const f = home.features;
  return (
    <section
      id="features"
      className="mx-auto max-w-[960px] px-6 py-16 md:py-24"
    >
      <SectionHeading heading={f.heading} subtitle={f.subtitle} className="mb-12" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {f.items.map((item) => (
          <FeatureCard
            key={item.title}
            icon={item.icon as IconName}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link
          href={f.allFeaturesLink.href}
          className="text-sm text-muted transition-colors hover:text-text"
        >
          {f.allFeaturesLink.label}
        </Link>
      </p>
    </section>
  );
}
