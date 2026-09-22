import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, Ref } from "react";
import { motion, useReducedMotion } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.22 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Underline({
  children,
  className = "",
  delay = 0,
  color = "sun",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  color?: "sun" | "blue";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-drawn");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`u-draw ${color === "blue" ? "u-draw--blue" : ""} ${className}`}
      style={{ "--udelay": `${delay}s` } as CSSProperties}
    >
      {children}
    </span>
  );
}

export function MagneticButton({
  children,
  strength = 12,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.hypot(x, y);
    const max = rect.width * 0.5;
    if (dist > max) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const k = (1 - dist / max) * (strength / rect.width);
    setOffset({ x: x * k, y: y * k });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const style: CSSProperties = reduce
    ? {}
    : {
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0 ? "transform .35s cubic-bezier(.22,1,.36,1)" : "transform .08s linear",
      };

  const base = className ?? "";

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={style}
        className={base}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={style}
      className={base}
    >
      {children}
    </button>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  kickerColor = "blue",
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  kickerColor?: "blue" | "coral";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold tracking-wide ${
            kickerColor === "blue" ? "bg-blue/10 text-blue" : "bg-coral/15 text-coral"
          }`}
        >
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">{subtitle}</p>
        </Reveal>
      ) : null}
    </div>
  );
}