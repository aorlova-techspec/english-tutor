import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { learningPath } from "../data/siteData";
import { IconArrow } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

export default function LearningPath() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const [active, setActive] = useState(reduce ? learningPath.steps.length - 1 : -1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const next = Math.min(learningPath.steps.length - 1, Math.round(v * (learningPath.steps.length - 1)));
    setActive(next);
  });

  return (
    <section id="process" className="scroll-mt-20 bg-white/60 py-20 lg:py-28" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={learningPath.kicker}
          title={<span id="process-title">{learningPath.heading}</span>}
        />

        <div ref={ref} className="relative mt-12 mx-auto max-w-3xl">
          <div aria-hidden="true" className="absolute bottom-6 top-6 left-[30px] w-1 rounded-full bg-ink/10" />
          {!reduce ? (
            <motion.div
              aria-hidden="true"
              className="absolute bottom-6 top-6 left-[30px] w-1 origin-top rounded-full bg-gradient-to-b from-blue to-coral"
              style={{ scaleY }}
            />
          ) : null}

          <ol className="space-y-4">
            {learningPath.steps.map((step, i) => {
              const isActive = active >= i;
              return (
                <li key={step.num}>
                  <Reveal delay={i * 0.05}>
                    <div className="flex items-start gap-5 sm:gap-7">
                      <motion.span
                        animate={
                          isActive
                            ? { backgroundColor: "#1557D5", color: "#fff", scale: 1.12 }
                            : { backgroundColor: "#ffffff", color: "#14213D", scale: 1 }
                        }
                        transition={{ duration: 0.35 }}
                        className="relative z-10 grid size-[60px] shrink-0 place-items-center rounded-full border-2 border-ink/10 font-display text-lg font-bold shadow-soft"
                      >
                        {step.num}
                      </motion.span>
                      <div className="grow rounded-[24px] bg-white p-5 shadow-soft sm:p-6">
                        <h3 className="text-xl font-extrabold">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-ink/70">{step.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1} className="mt-12 text-center">
          <a
            href="#lead"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-base font-extrabold text-white shadow-lift transition-transform hover:-translate-y-0.5"
          >
            {learningPath.cta}
            <IconArrow className="size-5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}