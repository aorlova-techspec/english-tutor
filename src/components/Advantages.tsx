import { advantages } from "../data/siteData";
import { Reveal, SectionHeading } from "./primitives";

export default function Advantages() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="advantages-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeading
            kicker={advantages.kicker}
            title={<span id="advantages-title">{advantages.heading}</span>}
          />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.items.map((item, i) => (
            <Reveal key={item.num} delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-[28px] bg-white p-7 shadow-card transition-transform hover:-translate-y-1">
                <div
                  aria-hidden="true"
                  className="absolute -right-6 -top-8 grid size-24 place-items-center rounded-full font-display text-4xl font-bold text-ink/5 transition-colors duration-300 group-hover:bg-sun/80 group-hover:text-ink/15"
                >
                  {item.num}
                </div>
                <h3 className="relative text-xl font-extrabold leading-snug">{item.title}</h3>
                <p className="relative mt-3 leading-relaxed text-ink/70">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}