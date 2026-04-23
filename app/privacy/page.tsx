import type { Metadata } from "next";
import { getPageMdx } from "@/lib/mdx";
import { LegalPageLayout } from "@/components/templates/LegalPageLayout";
import { defaultOg } from "@/lib/og";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageMdx("privacy");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/privacy/" },
    openGraph: defaultOg({
      title: frontmatter.title,
      description: frontmatter.description,
      url: "https://horacal.app/privacy/",
    }),
  };
}

export default async function PrivacyPage() {
  const { content, frontmatter } = await getPageMdx("privacy");
  return (
    <LegalPageLayout
      title={frontmatter.title}
      lastUpdated={frontmatter.lastUpdated}
    >
      {content}
    </LegalPageLayout>
  );
}
