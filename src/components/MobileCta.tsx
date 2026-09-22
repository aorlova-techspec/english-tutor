import { useEffect, useState } from "react";
import { hero } from "../data/siteData";
import { IconArrow } from "./icons";

export default function MobileCta() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const lead = document.getElementById("lead");
    if (!lead) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(lead);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-cream via-cream/95 to-transparent px-4 pb-4 pt-6 transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
    >
      <a
        href="#lead"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue px-6 py-4 text-base font-extrabold text-white shadow-lift"
      >
        {hero.primaryCta}
        <IconArrow className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}