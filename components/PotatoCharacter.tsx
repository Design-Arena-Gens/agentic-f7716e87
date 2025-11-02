"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export type PotatoMood = "happy" | "surprised" | "worried" | "relieved";

interface PotatoCharacterProps {
  name: string;
  mood?: PotatoMood;
  variant?: "golu" | "molu";
  flip?: boolean;
  bounce?: boolean;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  className?: string;
}

const moodEyebrows: Record<PotatoMood, string> = {
  happy: "translateY(-2px) rotate(4deg)",
  surprised: "translateY(-8px)",
  worried: "translateY(-4px) skewX(-6deg)",
  relieved: "translateY(-3px) rotate(3deg)"
};

const mouthVariants: Record<
  PotatoMood,
  { className: string; style?: CSSProperties }
> = {
  happy: { className: "rounded-full", style: { width: "64px", height: "20px" } },
  surprised: { className: "rounded-full", style: { width: "18px", height: "18px" } },
  worried: { className: "rounded-b-full", style: { width: "56px", height: "16px" } },
  relieved: { className: "rounded-full", style: { width: "58px", height: "18px" } }
};

export function PotatoCharacter({
  name,
  mood = "happy",
  variant = "golu",
  flip,
  bounce,
  size = "md",
  highlight,
  className
}: PotatoCharacterProps) {
  const scale = size === "lg" ? 1.15 : size === "sm" ? 0.75 : 1;
  return (
    <motion.figure
      aria-label={name}
      className={clsx(
        "relative flex select-none flex-col items-center",
        highlight && "brightness-110",
        className
      )}
      animate={bounce ? { y: [0, -12 * scale, 0] } : undefined}
      transition={bounce ? { repeat: Infinity, duration: 1.6, ease: "easeInOut" } : undefined}
    >
      <motion.div
        className={clsx(
          "relative mb-3 flex items-center justify-center rounded-full bg-potatoSkin",
          "shadow-[inset_-12px_-18px_0_rgba(0,0,0,0.12)]",
          flip && "-scale-x-100"
        )}
        style={{
          width: `${160 * scale}px`,
          height: `${190 * scale}px`,
          boxShadow: "-10px 18px 0 rgba(0,0,0,0.12)"
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,240,210,0.8), transparent 60%)"
          }}
        />
        <div className="absolute left-1/2 top-[34%] flex w-[60%] -translate-x-1/2 justify-between">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span
                className="block h-3 w-8 rounded-full bg-potatoShadow"
                style={{ transform: moodEyebrows[mood] }}
              />
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="absolute h-8 w-8 rounded-full bg-white/70" />
                <span className="h-5 w-5 rounded-full bg-stone-800"> </span>
                <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-white" />
              </span>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-[68%] flex -translate-x-1/2 items-center justify-center">
          <span
            className={clsx("block bg-red-400", mouthVariants[mood].className)}
            style={mouthVariants[mood].style}
          >
            {mood === "surprised" && <span className="block h-2 w-2 rounded-full bg-white" />}
          </span>
        </div>
        <div className="absolute bottom-6 left-[28%] flex gap-5">
          <span className="h-3 w-3 rounded-full bg-potatoShadow/80" />
          <span className="h-4 w-4 rounded-full bg-potatoShadow/70" />
          <span className="h-2 w-2 rounded-full bg-potatoShadow/60" />
        </div>
      </motion.div>
      <figcaption className="text-lg font-bold text-stone-700">{name}</figcaption>
      <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-500">
        {variant === "golu" ? "Golu" : "Molu"}
      </span>
    </motion.figure>
  );
}
