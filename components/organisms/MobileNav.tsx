"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { Logo } from "@/components/atoms/Logo";
import { NavLink } from "@/components/molecules/NavLink";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function MobileNav({ activePath }: { activePath?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const currentPadding =
        parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  useEffect(() => {
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const panel = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex-col overflow-y-auto bg-bg/85 backdrop-blur-xl md:hidden",
        open ? "flex" : "hidden",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <Logo />
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="p-2 text-text"
        >
          <Icon name="close" size={24} />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-6">
        {site.nav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            active={activePath === item.href}
            onClick={() => setOpen(false)}
            className="border-b border-border py-3 text-lg"
          >
            {item.label}
          </NavLink>
        ))}
        <Link
          href={site.cta.primary.href}
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-linear-to-br from-accent to-accent-glow px-6 text-sm font-semibold text-white"
        >
          {site.cta.primary.label}
        </Link>
        <a
          href={site.community.discord.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border px-6 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
        >
          <Icon name="discord" size={18} />
          {site.community.discord.label}
        </a>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="p-2 text-text md:hidden"
      >
        <Icon name={open ? "close" : "menu"} size={24} />
      </button>

      {mounted ? createPortal(panel, document.body) : null}
    </>
  );
}
