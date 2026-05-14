"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const PlugConnectedIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      animate(
        ".plug-upper-part",
        {
          y: 2,
          x: -2,
        },
        {
          duration: 0.35,
          ease: "easeOut",
        },
      );

      animate(
        ".plug-lower-leg",
        {
          opacity: 0,
        },
        {
          duration: 0.35,
          ease: "easeOut",
        },
      );

      animate(
        ".plug-lower-part",
        {
          y: -2,
          x: 2,
        },
        {
          duration: 0.35,
          ease: "easeOut",
        },
      );
    }, [animate]);

    const stop = useCallback(async () => {
      animate(
        ".plug-upper-part, .plug-lower-leg, .plug-lower-part",
        {
          y: 0,
          x: 0,
          opacity: 1,
        },
        {
          duration: 0.3,
          ease: "easeInOut",
        },
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
        onHoverStart={start}
        onHoverEnd={stop}
      >
        <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
        {/* <motion.path d="M20 16l-4 4" /> */}
        <motion.path
          d="M7 12l5 5l-1.5 1.5a3.536 3.536 0 1 1 -5 -5l1.5 -1.5z"
          className="plug-lower-part"
        />
        <motion.path
          d="M17 12l-5 -5l1.5 -1.5a3.536 3.536 0 1 1 5 5l-1.5 1.5z"
          className="plug-upper-part"
        />
        <motion.path d="M3 21l2.5 -2.5" className="plug-lower-part" />
        <motion.path d="M18.5 5.5l2.5 -2.5" className="plug-upper-part" />
        <motion.path
          d="M10 11l-2 2"
          className="plug-lower-part plug-lower-leg"
        />
        <motion.path
          d="M13 14l-2 2"
          className="plug-lower-part plug-lower-leg"
        />
        {/* <motion.path d="M16 16l4 4" /> */}
      </motion.svg>
    );
  },
);

PlugConnectedIcon.displayName = "PlugConnectedIcon";
export default PlugConnectedIcon;
