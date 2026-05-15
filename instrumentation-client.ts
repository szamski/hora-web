import {
  captureFirstTouch,
  initPostHog,
  installPostHogLogBridge,
} from "@/lib/analytics";

captureFirstTouch();

if (typeof window !== "undefined") {
  let started = false;
  const startRecording = () => {
    if (started) return;
    started = true;
    cleanup();
    void initPostHog()
      .then((posthog) => {
        installPostHogLogBridge();
        try {
          posthog.startSessionRecording();
        } catch {
          /* posthog not ready yet — next visit will start it */
        }
      })
      .catch(() => {
        /* network blocker / privacy extension — analytics already degrade gracefully */
      });
  };
  const events: Array<keyof WindowEventMap> = [
    "pointerdown",
    "keydown",
    "scroll",
    "touchstart",
  ];
  const onFirstInteraction = () => startRecording();
  const cleanup = () => {
    for (const event of events) {
      window.removeEventListener(event, onFirstInteraction);
    }
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (fallbackId !== null) {
      window.clearTimeout(fallbackId);
    }
  };
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      startRecording();
    }
  };
  const listenerOptions = { once: true, passive: true } as const;
  for (const event of events) {
    window.addEventListener(event, onFirstInteraction, listenerOptions);
  }
  document.addEventListener("visibilitychange", onVisibilityChange, {
    passive: true,
  });
  const fallbackId = window.setTimeout(startRecording, 15000);
}
