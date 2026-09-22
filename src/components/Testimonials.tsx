import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "../data/siteData";
import { IconArrow, IconChat } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const count = testimonials.items.length;
  const go = (next: number) => setIndex((next + count) % count);

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -70) go(index + 1);
    else if (info.offset.x > 70) go(index - 1);
  };

  return (
    <section id="feedback" className="scroll-mt-20 bg-white/60 py-20 lg:py-28" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={testimonials.kicker}
            title={<span id="testimonials-title">{testimonials.heading}</span>}
          />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Предыдущий отзыв"
                className="grid size-12 place-items-center rounded-full border-2 border-ink/10 bg-white text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconArrow className="size-5 rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Следующий отзыв"
                className="grid size-12 place-items-center rounded-full border-2 border-ink/10 bg-white text-ink transition-colors hover:border-blue hover:text-blue"
              >
                <IconArrow className="size-5" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-sun/40 px-4 py-1.5 text-sm font-bold text-ink/70">
            {testimonials.demoNote}
          </p>
        </Reveal>

        <div className="relative mt-10 overflow-hidden">
          <div role="group" aria-roledescription="карусель" aria-label="Отзывы учеников и родителей">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              {testimonials.items.map((t) => (
                <div key={t.who} className="w-full shrink-0 px-1.5">
                  <article className="mx-auto flex h-full min-h-[280px] flex-col justify-between rounded-[32px] border-2 border-ink/5 bg-cream p-8 shadow-card sm:p-10">
                    <div>
                      <IconChat className="size-9 text-coral" aria-hidden="true" />
                      <blockquote className="mt-5 text-xl font-semibold leading-relaxed sm:text-2xl">{t.text}</blockquote>
                    </div>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-full bg-blue font-display text-sm font-bold text-white">
                        {t.who.charAt(0)}
                      </span>
                      <div>
                        <p className="font-extrabold">{t.who}</p>
                        <p className="text-sm font-semibold text-ink/45">отзыв после занятий</p>
                      </div>
                    </figcaption>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Выбор отзыва">
          {testimonials.items.map((t, i) => (
            <button
              key={t.who}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Отзыв ${i + 1} из ${count}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                index === i ? "w-8 bg-blue" : "w-2.5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sr-only"
            aria-live="polite"
          >
            Отзыв {index + 1} из {count}: {testimonials.items[index].who}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}