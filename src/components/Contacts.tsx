import { contacts, replaceable } from "../data/siteData";
import { IconPhone, IconTelegram, IconWhatsApp, IconStar } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

export default function Contacts() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="contacts-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading kicker={contacts.kicker} title={<span id="contacts-title">Свяжитесь со мной</span>} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="prose-card flex h-full flex-col">
              <span className="grid size-12 place-items-center rounded-2xl bg-blue/10 text-blue">
                <IconStar className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-ink/45">Формат занятий</p>
              <p className="mt-1 text-lg font-extrabold">{contacts.format}</p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <a href={`tel:${replaceable.phone}`} className="prose-card flex h-full flex-col transition-transform hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-2xl bg-coral/15 text-coral">
                <IconPhone className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-ink/45">Телефон</p>
              <p className="mt-1 text-lg font-extrabold">{replaceable.phone}</p>
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <a href={contacts.telegram} className="prose-card flex h-full flex-col transition-transform hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-2xl bg-sun/40 text-ink">
                <IconTelegram className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-ink/45">Telegram</p>
              <p className="mt-1 text-lg font-extrabold">Написать в Telegram</p>
            </a>
          </Reveal>

          <Reveal delay={0.18}>
            <a href={contacts.whatsapp} className="prose-card flex h-full flex-col transition-transform hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-2xl bg-ink/10 text-ink">
                <IconWhatsApp className="size-6" aria-hidden="true" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-wider text-ink/45">WhatsApp</p>
              <p className="mt-1 text-lg font-extrabold">Написать в WhatsApp</p>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-ink/60">{contacts.schedule}</p>
        </Reveal>
      </div>
    </section>
  );
}