import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type PageFrontmatter = {
  title: string;
  description: string;
  lastUpdated: string;
};

export const getPageMdx = cache(async (slug: string) => {
  const filePath = path.join(CONTENT_DIR, "pages", `${slug}.mdx`);
  const raw = await readFile(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<PageFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  return { content, frontmatter };
});
