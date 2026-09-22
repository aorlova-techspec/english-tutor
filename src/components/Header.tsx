import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand, nav } from "../data/siteData";
import { IconClose, IconMenu, IconStar } from "./icons";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 rounded-xl font-extrabold">
      <span className="grid size-10 place-items-center rounded-2xl bg-blue text-sun">
        <IconStar className="size-5" />
      </span>
      <span className="text-lg leading-none tracking-tight">
        {brand.mark} <span className="sr-only">EASY</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Основная навигация" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`rounded-full px-3.5 py-2 text-sm font-bold transition-colors ${
                active === item.id ? "bg-blue/10 text-blue" : "text-ink/75 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#lead"
            className="hidden items-center gap-2 rounded-full bg-blue px-5 py-2.5 text-sm font-extrabold text-white shadow-soft transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Пробный урок
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink text-white lg:hidden"
            aria-label="Открыть меню"
            aria-expanded={open}
          >
            <IconMenu className="size-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-cream lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center rounded-2xl bg-ink text-white"
                aria-label="Закрыть меню"
              >
                <IconClose className="size-6" />
              </button>
            </div>
            <nav aria-label="Мобильная навигация" className="mx-auto mt-8 flex max-w-7xl flex-col gap-1 px-4 sm:px-6">
              {nav.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={() => goTo(item.id)}
                  className="rounded-2xl px-4 py-4 text-left text-2xl font-extrabold text-ink/85 hover:bg-blue/10 hover:text-blue"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => goTo("lead")}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-blue px-6 py-4 text-lg font-extrabold text-white shadow-lift"
              >
                Пробный урок
              </motion.button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}