import type { MDXComponents } from "mdx/types";
import { AutoVideo } from "./AutoVideo";
import { DiscordCta } from "./DiscordCta";
import { MdxImage } from "./MdxImage";
import { MdxLink } from "./MdxLink";
import { OneMoreThing } from "./OneMoreThing";

export const mdxComponents: MDXComponents = {
  img: MdxImage as MDXComponents["img"],
  a: MdxLink as MDXComponents["a"],
  AutoVideo: AutoVideo as unknown as MDXComponents["AutoVideo"],
  DiscordCta: DiscordCta as unknown as MDXComponents["DiscordCta"],
  OneMoreThing: OneMoreThing as unknown as MDXComponents["OneMoreThing"],
};
