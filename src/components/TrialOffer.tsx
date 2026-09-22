import { trialOffer } from "../data/siteData";
import { IconArrow, IconCheck } from "./icons";
import { MagneticButton, Reveal } from "./primitives";

export default function TrialOffer() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="trial-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] bg-blue px-7 py-12 text-white shadow-lift sm:px-12 lg:px-16">
            <div aria-hidden="true" className="absolute -right-24 -top-24 size-72 rounded-full bg-sun/15" />
            <div aria-hidden="true" className="absolute -bottom-32 -left-16 size-80 rounded-full bg-coral/20" />
            <span
              aria-hidden="true"
              className="floaty absolute right-10 top-10 hidden rotate-12 rounded-full border-2 border-sun/60 px-4 py-2 font-display text-sm font-bold text-sun lg:block"
            >
              first step
            </span>

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold tracking-wide text-sun">
                  {trialOffer.kicker}
                </span>
                <h2 id="trial-title" className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.75rem]">
                  {trialOffer.heading}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{trialOffer.text}</p>
              </div>

              <div className="rounded-[28px] bg-white/10 p-7 backdrop-blur sm:p-8">
                <p className="text-sm font-bold uppercase tracking-widest text-sun">Что входит</p>
                <ul className="mt-4 space-y-3">
                  {trialOffer.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base font-semibold">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sun text-blue">
                        <IconCheck className="size-3.5" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60">Пробный урок</p>
                    <p className="mt-1 font-display text-2xl font-bold text-sun">{trialOffer.price}</p>
                  </div>
                  <MagneticButton
                    href="#lead"
                    strength={16}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-extrabold text-blue shadow-card transition-transform hover:scale-[1.03]"
                  >
                    {trialOffer.cta}
                    <IconArrow className="size-5" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}