import { useCallback, useRef, useState } from "react";
import { IconStar } from "./icons";

export default function EasterEgg({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [burst, setBurst] = useState(0);
  const lockRef = useRef(false);

  const trigger = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setShow(true);
    setBurst((n) => n + 1);
    window.setTimeout(() => {
      setShow(false);
      lockRef.current = false;
    }, 1800);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={trigger}
        aria-label="Сюрприз"
        className="group relative grid size-10 place-items-center rounded-full bg-sun/90 text-ink shadow-soft transition-transform hover:scale-110 active:scale-95"
      >
        <IconStar className={`size-5 ${show ? "wiggle" : ""}`} aria-hidden="true" />
      </button>
      {show ? (
        <span
          key={burst}
          role="status"
          className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-1.5 font-display text-xs font-bold text-sun shadow-card"
        >
          Great job!
        </span>
      ) : null}
    </div>
  );
}