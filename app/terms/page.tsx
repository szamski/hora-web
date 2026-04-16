import type { Metadata } from "next";
import { getPageMdx } from "@/lib/mdx";
import { LegalPageLayout } from "@/components/templates/LegalPageLayout";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageMdx("terms");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/terms/" },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: "https://horacal.app/terms/",
    },
  };
}

export default async function TermsPage() {
  const { content, frontmatter } = await getPageMdx("terms");
  return (
    <LegalPageLayout
      title={frontmatter.title}
      lastUpdated={frontmatter.lastUpdated}
    >
      {content}
    </LegalPageLayout>
  );
}
