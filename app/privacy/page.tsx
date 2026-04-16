import type { Metadata } from "next";
import { getPageMdx } from "@/lib/mdx";
import { LegalPageLayout } from "@/components/templates/LegalPageLayout";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageMdx("privacy");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/privacy/" },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: "https://horacal.app/privacy/",
    },
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
