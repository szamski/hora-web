import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PartyPopperIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(".popper", { y: 3, x: -3 }, { duration: 0.25, ease: "easeOut" });

      animate(
        ".confetti",
        {
          y: [0, -6, -10],
          x: [0, 6, 10],
          opacity: [1, 1, 0],
          scale: [1, 1.2, 0.8],
        },
        { duration: 0.6, ease: "easeOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".popper, .confetti",
        { y: 0, x: 0, opacity: 1, scale: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    return (
      <motion.svg
        ref={scope}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <motion.path className="popper" d="M5.8 11.3 2 22l10.7-3.79" />
        <motion.path className="confetti" d="M4 3h.01" />
        <motion.path className="confetti" d="M22 8h.01" />
        <motion.path className="confetti" d="M15 2h.01" />
        <motion.path className="confetti" d="M22 20h.01" />
        <motion.path
          className="confetti"
          d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"
        />
        <motion.path
          className="confetti"
          d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"
        />
        <motion.path
          className="confetti"
          d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"
        />
        <motion.path
          className="popper"
          d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
        />
      </motion.svg>
    );
  },
);

PartyPopperIcon.displayName = "PartyPopperIcon";
export default PartyPopperIcon;
