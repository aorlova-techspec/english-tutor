import { motion } from "motion/react";
import { about } from "../data/siteData";
import { IconArrow } from "./icons";
import { MagneticButton, Reveal, SectionHeading, Underline } from "./primitives";

export default function AboutTeacher() {
  return (
    <section id="about" className="scroll-mt-20 py-20 lg:py-28" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10% round 32px)" }}
            whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div aria-hidden="true" className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-[28px] bg-sun" />
            <img
              src={about.image.src}
              alt={about.image.alt}
              width={1000}
              height={1100}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-[32px] object-cover shadow-card"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-3 shadow-card backdrop-blur">
              <p className="font-display text-lg font-bold text-blue">{about.approach}</p>
            </div>
          </motion.div>
        </Reveal>

        <div>
          <SectionHeading
            kicker={about.kicker}
            title={
              <span id="about-title">
                Рядом с учеником — <Underline>{about.heading.split("— ")[1]}</Underline>
              </span>
            }
          />

          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{about.text}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <blockquote className="mt-6 rounded-[24px] border-l-4 border-coral bg-coral/10 p-5 text-base font-semibold leading-relaxed text-ink/85">
              {about.approach}
            </blockquote>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {about.facts.map((f, i) => (
              <Reveal key={f.label} delay={0.1 + i * 0.06}>
                <div className="rounded-3xl bg-white p-4 text-center shadow-soft">
                  <p className="text-sm font-extrabold text-blue">{f.value}</p>
                  <p className="mt-1 text-xs font-semibold text-ink/50">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <MagneticButton
              href="#lead"
              strength={12}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-extrabold text-white shadow-soft transition-colors hover:bg-blue"
            >
              {about.cta}
              <IconArrow className="size-5" aria-hidden="true" />
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}