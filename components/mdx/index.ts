import type { MDXComponents } from "mdx/types";
import { AutoVideo } from "./AutoVideo";
import { MdxImage } from "./MdxImage";
import { MdxLink } from "./MdxLink";

export const mdxComponents: MDXComponents = {
  img: MdxImage as MDXComponents["img"],
  a: MdxLink as MDXComponents["a"],
  AutoVideo: AutoVideo as unknown as MDXComponents["AutoVideo"],
};
