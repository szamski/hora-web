"use client";

import { useEffect } from "react";

const NAV_OFFSET = 72; // sticky nav (56px) + breathing room

export function SmoothAnchorScroll() {
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      let hashId: string | null = null;
      let scrollToTop = false;

      if (href.startsWith("#")) {
        hashId = href.slice(1) || null;
        if (!hashId) scrollToTop = true;
      } else if (href.includes("#")) {
        const [pathname, hash] = href.split("#");
        const onSamePage =
          pathname === "" || pathname === window.location.pathname;
        if (!onSamePage) return;
        if (hash) hashId = hash;
        else scrollToTop = true;
      } else {
        const onSamePage =
          href === window.location.pathname ||
          href === window.location.pathname.replace(/\/$/, "") ||
          `${href}/` === window.location.pathname;
        if (!onSamePage) return;
        scrollToTop = true;
      }

      let top = 0;
      if (hashId) {
        const el = document.getElementById(hashId);
        if (!el) return;
        top = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
      } else if (!scrollToTop) {
        return;
      }

      e.preventDefault();
      e.stopImmediatePropagation();

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });

      if (hashId) {
        history.pushState(null, "", `#${hashId}`);
      } else {
        history.pushState(null, "", window.location.pathname);
      }
    }

    document.addEventListener("click", handle, { capture: true });
    return () =>
      document.removeEventListener("click", handle, { capture: true });
  }, []);

  return null;
}
