"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SceneCard } from "@/components/SceneCard";
import { PotatoCharacter } from "@/components/PotatoCharacter";
import { useNarrator } from "@/lib/useNarrator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";

type Scene = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ambiance?: string;
  accentColor: string;
  dialogues: {
    speaker: "narrator" | "golu" | "molu" | "sfx" | "music";
    text: string;
  }[];
};

const scenes: Scene[] = [
  {
    id: "scene-1",
    title: "Golu aur Molu ki Pehli Jhalk",
    subtitle: "Scene 1 · Introduction",
    description:
      "Kitchen ka farsh chamak raha hai aur kone mein sabziyon ki tokri chamchamati hai. Golu aur Molu, do gol-matol aalu, aaj mast mood mein hain!",
    ambiance: "Soft playful background hum",
    accentColor: "#f97316",
    dialogues: [
      { speaker: "narrator", text: "Yeh hain Golu aur Molu. Yeh pakke dost hain!" },
      { speaker: "golu", text: "Hee hee! Kya mast din hai, Molu!" },
      { speaker: "molu", text: "Bilkul! Chalo kuch masti ho jaaye." }
    ]
  },
  {
    id: "scene-2",
    title: "Kitchen Mein Pakdam-Pakdai",
    subtitle: "Scene 2 · Khel Shuru",
    description:
      "Golu aankh maarte hi ludhakna shuru karta hai. Molu bhi piche piche tezi se aata hai. Kitchen floor par aaluon ka chase shuru!",
    ambiance: "Quick drumbeat and giggles",
    accentColor: "#facc15",
    dialogues: [
      { speaker: "golu", text: "Pakdo pakdo! Molu, pakad ke dikhao!" },
      { speaker: "molu", text: "Rukooo! Main aa raha hoon!" },
      { speaker: "sfx", text: "Dhaap dhaap... ludhak ludhak... Hee hee hee!" }
    ]
  },
  {
    id: "scene-3",
    title: "Neeli Balti ka Khatra",
    subtitle: "Scene 3 · Khatra",
    description:
      "Molu ka balance bigadta hai aur woh kitchen ke kone mein rakhi neeli baalti ke bahut paas aa chuka hai. Music achanak dum-dum-dum ban jaata hai!",
    ambiance: "Tension string stabs",
    accentColor: "#38bdf8",
    dialogues: [
      { speaker: "music", text: "Dum-dum-dum!" },
      { speaker: "molu", text: "Whoaaaa!" },
      { speaker: "narrator", text: "Molu seedha balti ki ore ludhak raha hai!" }
    ]
  },
  {
    id: "scene-4",
    title: "Splash aur Madad",
    subtitle: "Scene 4 · Madad",
    description:
      "Ek bada sa CHHAPAAAK hota hai! Molu paani mein haath-pair maar raha hai. Golu seedha kinare tak ludhak kar aata hai aur dost ko bachane ki taiyari karta hai.",
    ambiance: "Hopeful flute melody",
    accentColor: "#34d399",
    dialogues: [
      { speaker: "sfx", text: "CHHAPAAAK!" },
      { speaker: "molu", text: "Golu! Madad!" },
      { speaker: "golu", text: "Darr mat Molu, main hoon na!" }
    ]
  }
];

export default function Page() {
  const [activeSceneId, setActiveSceneId] = useState<string>(scenes[0]?.id ?? "");

  const narratorLines = useMemo(
    () =>
      scenes.flatMap((scene) =>
        scene.dialogues
          .filter((line) => line.speaker === "narrator" || line.speaker === "golu" || line.speaker === "molu")
          .map((line, index) => ({
            id: `${scene.id}-${line.speaker}-${index}`,
            text: line.text
          }))
      ),
    []
  );

  const { isSpeaking, start, stop, supportsSpeech, currentLineIndex } = useNarrator({
    lines: narratorLines
  });

  const activeIndex = scenes.findIndex((scene) => scene.id === activeSceneId);
  const narratorHighlightId = narratorLines[currentLineIndex]?.id;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-16">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-200 via-rose-100 to-sky-200 p-10 shadow-xl">
        <VisuallyHidden>
          <h1>Golu aur Molu ki Kitchen Kahaani</h1>
        </VisuallyHidden>
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <motion.p
              className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.4em] text-stone-600 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Animated Kahaani
            </motion.p>
            <motion.h2
              className="text-4xl font-black text-stone-800 md:text-5xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              &ldquo;Hee Hee&rdquo; se &ldquo;CHHAPAAK&rdquo; tak – Kitchen mein do aaluon ki masti!
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed text-stone-700"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Scroll karte hue Golu aur Molu ki kahaani dekhiye. Har scene mein playful visuals, Hindi dialogues aur sound cues hain jo bachchon ke liye perfect hain.
            </motion.p>
            {supportsSpeech && (
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <button
                  type="button"
                  className={clsx(
                    "scene-advance",
                    isSpeaking ? "bg-emerald-500 hover:bg-emerald-400" : "bg-orange-500 hover:bg-orange-400"
                  )}
                  onClick={isSpeaking ? stop : start}
                >
                  {isSpeaking ? "Narration Rokें" : "Kahaani Sunें"}
                </button>
                <span className="audio-control">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {isSpeaking ? "Narrator bol raha hai..." : "Hindi narrator tayaar hai"}
                </span>
              </motion.div>
            )}
            {!supportsSpeech && (
              <p className="text-sm text-stone-500">
                Aapke browser mein Text-to-Speech support nahi mila. Dialogues neeche likhe hue hain.
              </p>
            )}
          </div>
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <div className="relative flex w-full max-w-xs flex-col items-center gap-10 rounded-3xl bg-white/80 p-6 text-center shadow-lg">
              <PotatoCharacter name="Golu" variant="golu" mood="happy" bounce />
              <PotatoCharacter name="Molu" variant="molu" mood="happy" bounce flip />
            </div>
            <motion.div
              className="absolute -bottom-6 left-1/2 hidden w-72 -translate-x-1/2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-stone-600 shadow-lg md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              Golu aur Molu ka chase dekhne ke liye niche scroll karein!
            </motion.div>
          </motion.div>
        </div>
      </header>

      <nav className="sticky top-4 z-10 flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/80 px-6 py-4 shadow-lg backdrop-blur">
        {scenes.map((scene, index) => {
          const isActiveNav = activeSceneId === scene.id;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                const element = document.getElementById(scene.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className={clsx(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                isActiveNav
                  ? "border-transparent bg-orange-400 text-white shadow-lg"
                  : "border-stone-200 bg-white/70 text-stone-600 hover:bg-white"
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-base font-black">
                {index + 1}
              </span>
              {scene.title}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-col gap-16">
        {scenes.map((scene, index) => (
          <SceneCard
            key={scene.id}
            {...scene}
            isActive={scene.id === activeSceneId}
            onFocus={setActiveSceneId}
            illustration={
              <SceneIllustration
                index={index}
                accentColor={scene.accentColor}
                sceneId={scene.id}
                narratorHighlightId={narratorHighlightId}
              />
            }
          />
        ))}
      </div>
    </main>
  );
}

function SceneIllustration({
  index,
  accentColor,
  sceneId,
  narratorHighlightId
}: {
  index: number;
  accentColor: string;
  sceneId: string;
  narratorHighlightId?: string;
}) {
  const highlight = narratorHighlightId?.includes(sceneId);

  if (index === 0) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute -top-6 left-6 h-24 w-24 rounded-3xl bg-emerald-200/60 blur-xl" />
        <PotatoCharacter name="Golu" variant="golu" mood="happy" size="md" bounce={highlight} />
        <PotatoCharacter name="Molu" variant="molu" mood="happy" size="md" bounce={highlight} className="-ml-10" />
        <BasketVeggies accentColor={accentColor} />
      </div>
    );
  }

  if (index === 1) {
    return (
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={{ x: [0, 12, -12, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <TrackLines />
        <PotatoCharacter name="Golu" variant="golu" mood="happy" bounce size="md" />
        <PotatoCharacter name="Molu" variant="molu" mood="happy" size="md" className="-ml-12" />
        <motion.div
          className="absolute -top-6 left-10 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-orange-600 shadow"
          animate={{ scale: highlight ? [1, 1.08, 1] : 1 }}
        >
          &ldquo;Pakdo Pakdo!&rdquo;
        </motion.div>
        <motion.div
          className="absolute bottom-6 right-10 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-sky-600 shadow"
          animate={{ scale: highlight ? [1, 1.08, 1] : 1 }}
        >
          &ldquo;Rukooo!&rdquo;
        </motion.div>
      </motion.div>
    );
  }

  if (index === 2) {
    return (
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        animate={{ rotate: highlight ? [0, -2, 2, -2, 0] : 0 }}
        transition={{ repeat: highlight ? Infinity : 0, duration: 2, ease: "easeInOut" }}
      >
        <Bucket accentColor={accentColor} />
        <PotatoCharacter name="Molu" variant="molu" mood="surprised" size="md" className="absolute -bottom-4 left-1/2 -translate-x-1/2" />
        <motion.div
          className="absolute top-10 left-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-sky-700 shadow"
          animate={{ y: highlight ? [-6, 0, -6] : 0 }}
        >
          &ldquo;Whoaaaa!&rdquo;
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative flex h-full w-full items-center justify-center"
      animate={{ scale: highlight ? [1, 1.05, 1] : 1 }}
      transition={{ repeat: highlight ? Infinity : 0, duration: 2.5, ease: "easeInOut" }}
    >
      <Bucket accentColor={accentColor} filled />
      <PotatoCharacter
        name="Molu"
        variant="molu"
        mood="worried"
        size="md"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2"
      />
      <PotatoCharacter
        name="Golu"
        variant="golu"
        mood="relieved"
        size="sm"
        bounce
        className="absolute -left-6 bottom-6"
      />
      <motion.div
        className="absolute top-4 right-6 rounded-full bg-white/80 px-4 py-2 text-sm font-bold text-emerald-600 shadow"
        animate={{ scale: highlight ? [1, 1.1, 1] : 1 }}
      >
        &ldquo;Main hoon na!&rdquo;
      </motion.div>
    </motion.div>
  );
}

function BasketVeggies({ accentColor }: { accentColor: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      role="img"
      aria-label="Sabziyon ki tokri"
      className="absolute -bottom-20 right-6 w-48"
    >
      <defs>
        <linearGradient id="basketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="150" rx="70" ry="20" fill="#d97706" opacity="0.35" />
      <path d="M30 120 Q110 180 190 120" fill="url(#basketGradient)" stroke="#b45309" strokeWidth="6" />
      <path d="M32 116 Q110 160 188 116" fill="none" stroke="#f59e0b" strokeWidth="6" />
      <circle cx="70" cy="90" r="34" fill={accentColor} />
      <circle cx="110" cy="72" r="28" fill="#f97316" />
      <circle cx="140" cy="98" r="30" fill="#84cc16" />
      <circle cx="170" cy="70" r="24" fill="#22c55e" />
    </svg>
  );
}

function Bucket({ accentColor, filled }: { accentColor: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 220 220" className="w-48" role="img" aria-label="Neeli baalti">
      <defs>
        <linearGradient id="bucketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="200" rx="70" ry="18" fill="#0ea5e9" opacity="0.35" />
      <path
        d="M60 60 L50 175 Q110 205 170 175 L160 60"
        fill="url(#bucketGradient)"
        stroke="#1d4ed8"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {filled ? (
        <path
          d="M60 120 Q110 155 160 120 L160 130 Q110 165 60 130 Z"
          fill="rgba(56, 189, 248, 0.85)"
        />
      ) : (
        <path
          d="M60 60 Q110 35 160 60 Q110 85 60 60"
          fill="rgba(255, 255, 255, 0.7)"
        />
      )}
      <path d="M58 60 Q110 40 162 60" stroke="#1d4ed8" strokeWidth="6" fill="none" />
    </svg>
  );
}

function TrackLines() {
  return (
    <div className="absolute inset-0 -z-10 flex items-center justify-center">
      <div className="grid h-[70%] w-[70%] grid-cols-3 gap-3 opacity-40">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-full border-2 border-dashed border-orange-200"
            style={{ animation: `spin ${7 + idx}s linear infinite` }}
          />
        ))}
      </div>
    </div>
  );
}
