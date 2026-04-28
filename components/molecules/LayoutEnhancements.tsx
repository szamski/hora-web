"use client";

import { AnalyticsDelegates } from "@/components/molecules/AnalyticsDelegates";
import { DeferredMount } from "@/components/molecules/DeferredMount";
import { ScrollProgressBar } from "@/components/molecules/ScrollProgressBar";
import { SectionViewTracker } from "@/components/molecules/SectionViewTracker";

export function LayoutEnhancements() {
  return (
    <>
      <AnalyticsDelegates />
      <DeferredMount timeout={4000}>
        <ScrollProgressBar />
        <SectionViewTracker />
      </DeferredMount>
    </>
  );
}
