import type { Metadata } from "next";
import { getPageMdx } from "@/lib/mdx";
import { LegalPageLayout } from "@/components/templates/LegalPageLayout";
import { defaultOg } from "@/lib/og";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageMdx("zoom-guide");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/zoom-guide/" },
    openGraph: defaultOg({
      title: frontmatter.title,
      description: frontmatter.description,
      url: "https://horacal.app/zoom-guide/",
    }),
  };
}

export default async function ZoomGuidePage() {
  const { content, frontmatter } = await getPageMdx("zoom-guide");
  return (
    <LegalPageLayout
      title={frontmatter.title}
      lastUpdated={frontmatter.lastUpdated}
    >
      {content}
    </LegalPageLayout>
  );
}
