import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CSSProperties } from "react";
import { directions } from "../data/siteData";
import { IconArrow } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

const accentStyles: Record<string, { tab: string; sticker: string; chip: string; blob: string }> = {
  coral: {
    tab: "data-[active=true]:bg-coral data-[active=true]:text-white",
    sticker: "bg-coral text-white",
    chip: "bg-coral/15 text-coral",
    blob: "bg-coral/70",
  },
  blue: {
    tab: "data-[active=true]:bg-blue data-[active=true]:text-white",
    sticker: "bg-blue text-white",
    chip: "bg-blue/15 text-blue",
    blob: "bg-blue/70",
  },
  sun: {
    tab: "data-[active=true]:bg-sun data-[active=true]:text-ink",
    sticker: "bg-sun text-ink",
    chip: "bg-sun/40 text-ink",
    blob: "bg-sun",
  },
  ink: {
    tab: "data-[active=true]:bg-ink data-[active=true]:text-white",
    sticker: "bg-ink text-white",
    chip: "bg-ink/10 text-ink",
    blob: "bg-ink/25",
  },
};

export default function Directions() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = directions[activeIdx];
  const a = accentStyles[current.accent];

  const select = (idx: number) => setActiveIdx(idx);

  return (
    <section id="directions" className="scroll-mt-20 bg-white/60 py-20 lg:py-28" aria-labelledby="directions-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Направления занятий"
          title={<span id="directions-title">Английский под конкретную цель</span>}
        />

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Направления занятий"
            className="mt-10 flex gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible"
          >
            {directions.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                id={`dir-tab-${d.id}`}
                aria-selected={activeIdx === i}
                aria-controls="dir-panel"
                data-active={activeIdx === i}
                onClick={() => select(i)}
                className={`tilt-card inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink/10 px-5 py-3 text-sm font-extrabold transition-colors data-[active=true]:border-transparent sm:px-6 sm:text-base ${a.tab} ${
                  activeIdx === i ? "shadow-soft" : "bg-white text-ink/70 hover:text-ink"
                }`}
                style={{ "--tilt": i % 2 === 0 ? "1.6deg" : "-1.6deg" } as CSSProperties}
              >
                <span aria-hidden="true">✦</span>
                {d.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-[32px] bg-cream shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              role="tabpanel"
              id="dir-panel"
              aria-labelledby={`dir-tab-${current.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid min-h-[420px] items-center gap-0 lg:grid-cols-[1fr_0.9fr]"
            >
              <div className="p-7 sm:p-10 lg:p-12">
                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${a.chip}`}>
                  <span className="size-2 rounded-full bg-current" aria-hidden="true" />
                  {current.format}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">{current.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-ink/70">{current.description}</p>

                <dl className="mt-6 space-y-3">
                  <div className="flex gap-3 rounded-2xl bg-white p-4">
                    <dt className="shrink-0 text-sm font-extrabold uppercase tracking-wider text-ink/45">{current.metaKey}:</dt>
                    <dd className="text-base font-semibold text-ink/85">{current.metaValue}</dd>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-white p-4">
                    <dt className="shrink-0 text-sm font-extrabold uppercase tracking-wider text-ink/45">Формат:</dt>
                    <dd className="text-base font-semibold text-ink/85">{current.format}</dd>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-white p-4">
                    <dt className="shrink-0 text-sm font-extrabold uppercase tracking-wider text-ink/45">Цена:</dt>
                    <dd className="text-base font-semibold text-ink/85">{current.price}</dd>
                  </div>
                </dl>

                <a
                  href="#lead"
                  className={`mt-8 inline-flex items-center gap-2 rounded-full ${a.sticker} px-7 py-4 text-base font-extrabold shadow-soft transition-transform hover:-translate-y-0.5`}
                >
                  {current.cta}
                  <IconArrow className="size-5" aria-hidden="true" />
                </a>
              </div>

              <div className="relative h-56 lg:h-full lg:min-h-[440px]">
                <div aria-hidden="true" className={`absolute inset-0 translate-x-5 translate-y-5 rounded-[28px] ${a.blob}`} />
                <img
                  src={current.image.src}
                  alt={current.image.alt}
                  width={1000}
                  height={760}
                  loading="lazy"
                  decoding="async"
                  className="relative h-full w-full rounded-[28px] object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}