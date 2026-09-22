import { mail } from "../data/siteData";

export type LeadPayload = {
  name: string;
  contact: string;
  student: string;
  age: string;
  goal: string;
  level: string;
  time: string;
  comment: string;
};

export type LeadResult = { ok: true } | { ok: false; message: string };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitLead(data: LeadPayload): Promise<LeadResult> {
  if (!mail.enabled || !mail.toEmail) {
    await sleep(1200);
    return { ok: true };
  }

  const body = {
    _subject: mail.subject,
    _captcha: "false",
    _template: "table",
    "Имя": data.name,
    "Телефон или мессенджер": data.contact,
    "Кто будет заниматься": data.student,
    "Возраст": data.age,
    "Цель": data.goal,
    "Текущий уровень": data.level || "не указан",
    "Удобное время": data.time,
    "Комментарий": data.comment || "—",
  };

  if (import.meta.env.DEV) {
    console.info("[submitLead] payload:", body);
  }

  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(mail.toEmail)}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { ok: false, message: `HTTP ${res.status}` };
    }

    const json = (await res.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;
    const ok = json ? json.success === true || json.success === "true" : false;
    return ok ? { ok: true } : { ok: false, message: json?.message ?? "unknown error" };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "network error" };
  }
}