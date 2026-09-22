import { useState } from "react";
import { lessonSteps } from "../data/siteData";
import { Reveal, SectionHeading } from "./primitives";

function FlipCard({ name, desc }: { name: string; desc: string }) {
  const [open, setOpen] = useState(false);
  const id = `step-desc-${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      aria-controls={id}
      className="perspective group block h-44 w-full"
    >
      <span className={`flip-inner relative block h-full w-full ${open ? "is-flipped" : ""}`}>
        <span className="backface-hidden absolute inset-0 grid place-items-center rounded-[24px] border-2 border-ink/10 bg-white p-5 shadow-soft transition-colors group-hover:border-blue/30">
          <span className="text-center">
            <span className="block font-display text-lg font-bold text-blue">{name}</span>
            <span className="mt-2 block text-sm font-bold text-ink/45">нажми, чтобы открыть</span>
          </span>
        </span>
        <span
          id={id}
          className="backface-hidden absolute inset-0 grid place-items-center rounded-[24px] bg-blue px-5 py-4 text-white shadow-card"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span className="text-center text-base font-semibold leading-snug">{desc}</span>
        </span>
      </span>
    </button>
  );
}

export default function LessonSteps() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="lesson-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={lessonSteps.kicker}
          title={<span id="lesson-title">{lessonSteps.heading}</span>}
          subtitle={lessonSteps.text}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {lessonSteps.cards.map((card, i) => (
            <Reveal key={card.name} delay={(i % 3) * 0.07}>
              <FlipCard name={card.name} desc={card.desc} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] shadow-card">
            <img
              src={lessonSteps.materialsImage.src}
              alt={lessonSteps.materialsImage.alt}
              width={1600}
              height={520}
              loading="lazy"
              decoding="async"
              className="h-64 w-full object-cover sm:h-72"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
            <div className="absolute inset-0 flex items-center p-7 sm:p-10">
              <p className="max-w-md text-xl font-extrabold leading-snug text-white sm:text-2xl">
                Видео, карточки, интерактивные упражнения и актуальные темы
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}