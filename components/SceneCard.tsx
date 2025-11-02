"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import clsx from "clsx";

interface DialogueLine {
  speaker: "narrator" | "golu" | "molu" | "sfx" | "music";
  text: string;
}

export interface SceneCardProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ambiance?: string;
  dialogues: DialogueLine[];
  illustration: ReactNode;
  accentColor: string;
  onFocus?: (sceneId: string) => void;
  isActive?: boolean;
}

export function SceneCard({
  id,
  title,
  subtitle,
  description,
  ambiance,
  dialogues,
  illustration,
  accentColor,
  onFocus,
  isActive
}: SceneCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.45, once: false });

  useEffect(() => {
    if (isInView && onFocus) {
      onFocus(id);
    }
  }, [id, isInView, onFocus]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={clsx(
        "relative grid min-h-[420px] grid-cols-1 items-center gap-10 rounded-3xl border border-stone-200 bg-white/80 p-8 shadow-lg backdrop-blur-md transition-all md:grid-cols-[1.1fr_0.9fr]",
        isActive ? "ring-4 ring-orange-200" : "ring-0"
      )}
      style={{ borderColor: accentColor }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-stone-500">{subtitle}</p>
          <h2 className="mt-2 text-3xl font-black text-stone-800 md:text-4xl">{title}</h2>
        </header>
        <p className="text-lg leading-relaxed text-stone-700">{description}</p>
        {ambiance && (
          <p
            className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-600"
            aria-label="Music cue"
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
            {ambiance}
          </p>
        )}
        <div className="space-y-3" role="dialog" aria-label={`${title} dialogues`}>
          {dialogues.map((line, index) => (
            <motion.div
              key={`${line.speaker}-${index}`}
              className={clsx(
                "relative rounded-2xl border bg-white px-4 py-3 text-base shadow-sm",
                line.speaker === "narrator" && "border-dashed border-stone-300 text-stone-600",
                line.speaker === "golu" && "border-orange-200/80 text-orange-700",
                line.speaker === "molu" && "border-sky-200/80 text-sky-700",
                line.speaker === "sfx" && "border-fuchsia-200/80 text-fuchsia-700 italic",
                line.speaker === "music" && "border-emerald-200/80 text-emerald-700 italic"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 * index }}
            >
              <span className="block text-xs font-bold uppercase tracking-wide text-stone-400">
                {line.speaker === "narrator"
                  ? "Voiceover"
                  : line.speaker === "sfx"
                  ? "Sound"
                  : line.speaker === "music"
                  ? "Music"
                  : line.speaker === "golu"
                  ? "Golu"
                  : "Molu"}
              </span>
              <span className="block font-semibold text-stone-800">{line.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.div
          className="scene-gradient relative flex h-full w-full items-center justify-center rounded-3xl p-6"
          initial={{ scale: 0.96 }}
          animate={isActive ? { scale: 1, boxShadow: "0 25px 45px rgba(0,0,0,0.16)" } : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
        >
          <div className="absolute inset-0 rounded-3xl border border-white/50" />
          <motion.div
            className="relative flex h-full w-full items-center justify-center"
            animate={isActive ? { y: [-4, 4, -4] } : {}}
            transition={isActive ? { repeat: Infinity, duration: 6, ease: "easeInOut" } : undefined}
          >
            {illustration}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
