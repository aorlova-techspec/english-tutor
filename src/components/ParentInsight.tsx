import { parentInsight } from "../data/siteData";
import { IconChat, IconGrowth, IconLogic, IconSpark } from "./icons";
import { Reveal, SectionHeading, Underline } from "./primitives";

const iconMap = {
  chat: IconChat,
  logic: IconLogic,
  spark: IconSpark,
  growth: IconGrowth,
};

const accents = ["bg-coral/15 text-coral", "bg-blue/15 text-blue", "bg-sun/40 text-ink", "bg-ink/10 text-ink"];

export default function ParentInsight() {
  return (
    <section className="relative py-20 lg:py-28" aria-labelledby="insight-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker={parentInsight.kicker}
          title={
            <span id="insight-title">
              Не просто выполнить <Underline color="sun">упражнение</Underline>. Понять — и начать{" "}
              <Underline color="blue" delay={0.15}>говорить</Underline>
            </span>
          }
        />
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/70">{parentInsight.text}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {parentInsight.cards.map((card, i) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <Reveal key={card.title} delay={i * 0.08}>
                <article className="prose-card h-full">
                  <span className={`grid size-12 place-items-center rounded-2xl ${accents[i % accents.length]}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug">{card.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}