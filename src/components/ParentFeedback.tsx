import { motion } from "motion/react";
import { parentFeedback } from "../data/siteData";
import { IconChat } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

export default function ParentFeedback() {
  return (
    <section className="bg-white/60 py-20 lg:py-28" aria-labelledby="feedback-parent-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="order-2 lg:order-1">
          <SectionHeading
            kicker={parentFeedback.kicker}
            title={<span id="feedback-parent-title">{parentFeedback.heading}</span>}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{parentFeedback.text}</p>
          </Reveal>

          <Reveal delay={0.16}>
            <figure className="mt-8 rounded-[28px] bg-cream p-7 shadow-card sm:p-8">
              <IconChat className="size-8 text-coral" aria-hidden="true" />
              <blockquote className="mt-4 text-lg font-semibold leading-relaxed text-ink/85">{parentFeedback.example}</blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-sm font-extrabold text-blue">
                <span className="size-2.5 rounded-full bg-sun" aria-hidden="true" />
                Пример короткой обратной связи
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, clipPath: "inset(10% 10% 10% 10% round 32px)" }}
            whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div aria-hidden="true" className="absolute -top-6 -right-6 -z-10 h-28 w-28 rounded-[28px] bg-coral/80" />
            <img
              src={parentFeedback.image.src}
              alt={parentFeedback.image.alt}
              width={1000}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[10/9] w-full rounded-[32px] object-cover shadow-card"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-card backdrop-blur">
              <p className="font-display text-sm font-bold text-blue">short & clear</p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}