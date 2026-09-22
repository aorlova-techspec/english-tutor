import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faq } from "../data/siteData";
import { IconChevron } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <Reveal delay={index * 0.04}>
      <div className={`overflow-hidden rounded-[24px] border-2 transition-colors ${open ? "border-blue/25 bg-white" : "border-ink/8 bg-white/70"}`}>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
        >
          <span className="text-lg font-extrabold leading-snug">{q}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className={`grid size-9 shrink-0 place-items-center rounded-full ${open ? "bg-blue text-white" : "bg-ink/5 text-ink"}`}
          >
            <IconChevron className="size-5" aria-hidden="true" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="px-5 pb-6 text-base leading-relaxed text-ink/70 sm:px-6">{a}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-white/60 py-20 lg:py-28" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={faq.kicker} title={<span id="faq-title">{faq.heading}</span>} align="center" />
        <div className="mt-12 space-y-4">
          {faq.items.map((item, i) => (
            <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}