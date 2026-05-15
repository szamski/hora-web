import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const GaugeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".needle",
        { rotate: [0, 45, -20, 30, 0] },
        { duration: 0.8, ease: "easeInOut" },
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".needle", { rotate: 0 }, { duration: 0.3, ease: "easeInOut" });
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        <motion.path
          className="needle"
          style={{ transformOrigin: "12px 14px" }}
          d="m12 14 4-4"
        />
      </motion.svg>
    );
  },
);

GaugeIcon.displayName = "GaugeIcon";
export default GaugeIcon;
