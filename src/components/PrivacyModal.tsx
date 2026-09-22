import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { privacyNote } from "../data/siteData";
import { PrivacyContext } from "../context/privacy";
import { IconClose, IconQuestion } from "./icons";

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restored = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    restored.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restored.current?.focus();
    };
  }, [isOpen, close]);

  return (
    <PrivacyContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm"
            role="presentation"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-title"
              initial={{ y: 24, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-cream p-7 shadow-lift sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-blue text-white">
                    <IconQuestion className="size-6" aria-hidden="true" />
                  </span>
                  <h2 id="privacy-title" className="text-2xl font-extrabold">
                    Политика конфиденциальности
                  </h2>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Закрыть окно"
                  className="grid size-10 place-items-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
                >
                  <IconClose className="size-5" aria-hidden="true" />
                </button>
              </div>

              <p className="mt-5 leading-relaxed text-ink/70">{privacyNote.intro}</p>
              <ul className="mt-4 space-y-2">
                {privacyNote.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-ink/75">
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl bg-sun/30 p-4 text-sm font-bold leading-relaxed text-ink/75">
                {privacyNote.legalNote}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </PrivacyContext.Provider>
  );
}