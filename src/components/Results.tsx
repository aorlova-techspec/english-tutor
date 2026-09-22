import { motion } from "motion/react";
import { results } from "../data/siteData";
import { IconCheck } from "./icons";
import { Reveal, SectionHeading, Underline } from "./primitives";

export default function Results() {
  return (
    <section id="results" className="scroll-mt-20 py-20 lg:py-28" aria-labelledby="results-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            kicker={results.kicker}
            title={
              <span id="results-title">
                Прогресс, который <Underline color="blue">можно заметить</Underline>
              </span>
            }
          />
          <Reveal delay={0.1}>
            <p className="mt-5 rounded-2xl bg-sun/30 px-4 py-3 text-sm font-bold text-ink/70">{results.note}</p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {results.items.map((item, i) => (
              <Reveal key={item} delay={0.08 + i * 0.06}>
                <li className="flex items-start gap-4 rounded-[20px] bg-white p-4 shadow-soft">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                    <IconCheck className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-lg font-semibold text-ink/85">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10% round 32px)" }}
            whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div aria-hidden="true" className="absolute -bottom-6 -left-6 -z-10 h-36 w-36 -rotate-12 rounded-[28px] bg-sun" />
            <img
              src={results.image.src}
              alt={results.image.alt}
              width={1000}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-[5/4] w-full rounded-[32px] object-cover shadow-card"
            />
            <div className="absolute top-5 right-5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-card backdrop-blur">
              <p className="font-display text-sm font-bold text-coral">full sentences</p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}