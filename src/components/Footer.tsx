import { brand, footer, nav } from "../data/siteData";
import { IconStar } from "./icons";
import { usePrivacy } from "../context/privacy";

export default function Footer() {
  const { open } = usePrivacy();

  return (
    <footer className="border-t border-ink/10 bg-white/60 pb-24 pt-14 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" className="inline-flex items-center gap-2 rounded-xl font-extrabold">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue text-sun">
                <IconStar className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg">{brand.mark}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/55">
              Индивидуальный английский: понятный прогресс, живая практика и спокойная атмосфера.
            </p>
          </div>

          <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm font-bold text-ink/70 transition-colors hover:text-blue">
                {item.label}
              </a>
            ))}
            <a href="#lead" className="text-sm font-bold text-ink/70 transition-colors hover:text-blue">
              Пробный урок
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {footer.rights}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button type="button" onClick={open} className="font-bold text-ink/60 underline-offset-4 hover:underline">
              {footer.privacy}
            </button>
            <a href="#lead" className="font-bold text-ink/60 underline-offset-4 hover:underline">
              {footer.consentDoc}
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink/35">{footer.replaceableApiNote}</p>
      </div>
    </footer>
  );
}