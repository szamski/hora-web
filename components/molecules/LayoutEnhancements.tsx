"use client";

import { DeferredMount } from "@/components/molecules/DeferredMount";
import { ScrollProgressBar } from "@/components/molecules/ScrollProgressBar";
import { SectionViewTracker } from "@/components/molecules/SectionViewTracker";

export function LayoutEnhancements() {
  return (
    <DeferredMount timeout={4000}>
      <ScrollProgressBar />
      <SectionViewTracker />
    </DeferredMount>
  );
}
