import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { Variants } from "motion/react";
import { hero } from "../data/siteData";
import { IconArrow, IconCheck } from "./icons";
import { MagneticButton, Underline } from "./primitives";
import EasterEgg from "./EasterEgg";

const colorMap: Record<string, string> = {
  coral: "text-coral",
  blue: "text-blue",
  sun: "text-ink bg-sun",
  ink: "text-ink bg-white",
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function FloatingWords() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      {hero.floatingWords.map((w) => (
        <span
          key={w.word}
          aria-hidden="true"
          className={`floaty pointer-events-none absolute z-10 hidden whitespace-nowrap rounded-full border-2 border-ink/8 px-4 py-2 font-display text-xs font-bold shadow-soft sm:block lg:text-sm ${colorMap[w.color]}`}
          style={
            {
              top: w.top,
              left: w.left,
              right: w.right,
              "--rot": w.rot,
              "--fdur": w.dur,
              "--fdelay": w.delay,
            } as CSSProperties
          }
        >
          {w.word}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const words = hero.heading.split(" ");

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -right-40 size-[480px] rounded-full bg-sun/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/3 -left-40 size-[420px] rounded-full bg-coral/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
        <div>
          <motion.div variants={item} initial="hidden" animate="show" className="inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue/15 bg-blue/5 px-4 py-2 text-sm font-bold text-blue">
              <IconCheck className="size-4 text-coral" aria-hidden="true" />
              {hero.kicker}
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="mt-6 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            {words.map((word, i) =>
              word === "говорить" ? (
                <span key={i} className="inline-block">
                  <Underline delay={1.1}>{word}</Underline>
                </span>
              ) : (
                <motion.span key={i} variants={item} className="inline-block">
                  {word}
                  {"\u00A0"}
                </motion.span>
              ),
            )}
          </motion.h1>

          <motion.p variants={item} initial="hidden" animate="show" className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} initial="hidden" animate="show" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton
              href="#lead"
              strength={14}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue px-7 py-4 text-base font-extrabold text-white shadow-lift transition-colors hover:bg-blue-deep"
            >
              {hero.primaryCta}
              <IconArrow className="size-5" aria-hidden="true" />
            </MagneticButton>
            <a
              href="#directions"
              className="inline-flex items-center justify-center rounded-full border-2 border-ink/12 bg-white px-7 py-4 text-base font-extrabold text-ink transition-colors hover:border-blue hover:text-blue"
            >
              {hero.secondaryCta}
            </a>
          </motion.div>

          <motion.p variants={item} initial="hidden" animate="show" className="mt-4 text-sm text-ink/50">
            {hero.microtext}
          </motion.p>

          <motion.ul variants={item} initial="hidden" animate="show" className="mt-7 flex flex-wrap gap-2">
            {hero.proofChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink/80 shadow-soft"
              >
                <span className="size-2 rounded-full bg-coral" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, clipPath: "inset(12% 12% 12% 12% round 32px)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 translate-x-6 translate-y-6 rounded-[32px] bg-coral/80 sm:translate-x-8 sm:translate-y-8" />
          <div aria-hidden="true" className="absolute -left-8 -top-8 z-10 hidden h-24 w-24 -rotate-12 rounded-[24px] bg-sun sm:block" />
          <div aria-hidden="true" className="absolute -bottom-10 -right-4 z-10 hidden h-20 w-20 rounded-full border-8 border-blue/25 sm:block" />

          <div className="relative overflow-hidden rounded-[32px] shadow-card">
            <img
              src={hero.image.src}
              alt={hero.image.alt}
              width={1000}
              height={1100}
              fetchPriority="high"
              decoding="async"
              className="aspect-[10/11] w-full object-cover"
            />
          </div>

          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-card backdrop-blur">
            <EasterEgg />
            <span className="text-xs font-bold text-ink/70">tap the star</span>
          </div>

          <FloatingWords />
        </motion.div>
      </div>
    </section>
  );
}