import { useState } from "react";
import type { FormEvent } from "react";
import { form } from "../data/siteData";
import { submitLead } from "../lib/submitLead";
import type { LeadPayload } from "../lib/submitLead";
import { IconCheck, IconClose, IconStar } from "./icons";
import { Reveal, SectionHeading } from "./primitives";

type FormState = {
  name: string;
  contact: string;
  student: string;
  age: string;
  goal: string;
  level: string;
  time: string;
  comment: string;
  consent: boolean;
};

const empty: FormState = {
  name: "",
  contact: "",
  student: "",
  age: "",
  goal: "",
  level: "",
  time: "",
  comment: "",
  consent: false,
};

type Status = "idle" | "loading" | "success" | "error";

const inputCls =
  "w-full rounded-2xl border-2 border-ink/10 bg-white px-4 py-3 text-base font-semibold placeholder:text-ink/35 transition-colors focus:border-blue focus:outline-none";

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-bold text-coral">
      {children}
    </p>
  );
}

export default function LeadForm() {
  const [data, setData] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof FormState, value: string | boolean) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = "Укажите имя";
    const contactClean = data.contact.trim().replace(/[\s\-()]/g, "");
    if (!data.contact.trim()) next.contact = "Укажите телефон или мессенджер";
    else if (contactClean.length < 6) next.contact = "Проверьте номер или имя пользователя";
    if (!data.student) next.student = "Выберите, кто будет заниматься";
    if (!data.age) next.age = "Укажите возраст";
    if (!data.goal) next.goal = "Выберите цель";
    if (!data.time) next.time = "Выберите удобное время";
    if (!data.consent) next.consent = "Нужно согласие на обработку данных";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;
    setStatus("loading");
    const payload: LeadPayload = {
      name: data.name.trim(),
      contact: data.contact.trim(),
      student: data.student,
      age: data.age,
      goal: data.goal,
      level: data.level,
      time: data.time,
      comment: data.comment.trim(),
    };
    const result = await submitLead(payload);
    setStatus(result.ok ? "success" : "error");
  };

  const select = (key: "student" | "age" | "goal" | "level" | "time", options: string[]) => (
    <select
      id={key}
      value={data[key]}
      aria-invalid={errors[key] ? true : undefined}
      aria-describedby={errors[key] ? `${key}-error` : undefined}
      onChange={(e) => set(key, e.target.value)}
      className={`${inputCls} ${data[key] ? "text-ink" : "text-ink/35"}`}
    >
      <option value="" disabled>
        {form.fields[key]}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  if (status === "success") {
    return (
      <section id="lead" className="scroll-mt-20 py-20 lg:py-28" aria-labelledby="lead-title">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[32px] border-2 border-blue/15 bg-white p-10 text-center shadow-card">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-blue/10 text-blue">
                <IconStar className="size-8" aria-hidden="true" />
              </span>
              <h2 id="lead-title" className="mt-6 text-3xl font-extrabold">
                {form.successTitle}
              </h2>
              <p className="mt-3 text-lg text-ink/70">{form.successText}</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="lead" className="scroll-mt-20 py-20 lg:py-28" aria-labelledby="lead-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeading
            kicker={form.kicker}
            title={<span id="lead-title">{form.heading}</span>}
            kickerColor="coral"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{form.subtitle}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <ul className="mt-8 space-y-3">
              {["Отвечу на вопросы до записи", "Предложу подходящий формат", "Подберу время пробного урока"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold text-ink/80">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sun text-ink">
                    <IconCheck className="size-4" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="rounded-[32px] border border-ink/8 bg-white p-7 shadow-card sm:p-9" aria-label="Форма записи на пробный урок">
            {status === "error" ? (
              <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl bg-coral/10 p-4 text-coral">
                <IconClose className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p className="font-bold">{form.errorTitle} {form.errorText}</p>
              </div>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.name} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder={form.fields.name}
                  className={`${inputCls} text-ink`}
                />
                <FieldError id="name-error">{errors.name}</FieldError>
              </div>

              <div>
                <label htmlFor="contact" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.contact} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  autoComplete="tel"
                  inputMode="tel"
                  value={data.contact}
                  onChange={(e) => set("contact", e.target.value)}
                  aria-invalid={errors.contact ? true : undefined}
                  aria-describedby={errors.contact ? "contact-error" : undefined}
                  placeholder="+7 900 000-00-00 или @username"
                  className={`${inputCls} text-ink`}
                />
                <FieldError id="contact-error">{errors.contact}</FieldError>
              </div>

              <div>
                <label htmlFor="student" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.student} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                {select("student", form.studentOptions)}
                <FieldError id="student-error">{errors.student}</FieldError>
              </div>

              <div>
                <label htmlFor="age" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.age} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                {select("age", form.ageOptions)}
                <FieldError id="age-error">{errors.age}</FieldError>
              </div>

              <div>
                <label htmlFor="goal" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.goal} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                {select("goal", form.goalOptions)}
                <FieldError id="goal-error">{errors.goal}</FieldError>
              </div>

              <div>
                <label htmlFor="level" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.level}
                </label>
                {select("level", form.levelOptions)}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="time" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.time} <span aria-hidden="true" className="text-coral">*</span>
                </label>
                <div className="sm:max-w-xs">{select("time", form.timeOptions)}</div>
                <FieldError id="time-error">{errors.time}</FieldError>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="comment" className="mb-1.5 block text-sm font-extrabold">
                  {form.fields.comment}
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  value={data.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  placeholder="Например: готовимся к ОГЭ, удобно заниматься по вторникам и четвергам"
                  className={`${inputCls} resize-y text-ink`}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "consent-error" : "consent-hint"}
                  className="mt-1 size-5 shrink-0 accent-blue"
                />
                <span>
                  <span className="font-semibold">{form.consent} <span aria-hidden="true" className="text-coral">*</span></span>
                  <span id="consent-hint" className="block text-sm text-ink/45">
                    {form.consentHint}
                  </span>
                </span>
              </label>
              <FieldError id="consent-error">{errors.consent}</FieldError>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-blue px-8 py-4 text-lg font-extrabold text-white shadow-lift transition-colors hover:bg-blue-deep disabled:cursor-wait disabled:opacity-80"
            >
              {status === "loading" ? (
                <>
                  <span className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white" aria-hidden="true" />
                  Отправляем…
                </>
              ) : (
                form.cta
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}