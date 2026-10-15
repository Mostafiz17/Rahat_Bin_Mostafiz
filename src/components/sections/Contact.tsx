import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Copy, Check, CheckCircle2, AlertCircle, X, Download } from "lucide-react";
import confetti from "canvas-confetti";
import { SectionHeading } from "../ui/SectionHeading";
import { SocialLinks } from "../ui/SocialLinks";
import { Button } from "../ui/Button";
import { personalInfo } from "../../data/personalInfo";
import { EASE, EASE_EXPO } from "../../utils/motion";

const subjects = [
  "Full-stack web app",
  "Cinematic video edit",
  "Motion & VFX",
  "Full-time role",
  "Collaboration / other",
];

type Toast = { type: "success" | "error"; message: string } | null;

/** Floating-label text field with a solid focus border. */
const Field: React.FC<{
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}> = ({ id, label, type = "text", textarea = false, value, onChange, required }) => {
  const shared =
    "peer w-full rounded-2xl border-2 border-line bg-canvas/60 px-5 pb-3 pt-7 text-base text-fg outline-none transition-colors duration-300 placeholder-shown:border-line focus:border-accent";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          value={value}
          required={required}
          placeholder=" "
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          placeholder=" "
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} h-16`}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-5 origin-left text-base text-muted transition-all duration-300 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
    </div>
  );
};

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [toast, setToast] = useState<Toast>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(t);
  }, [toast]);

  // Reset "copied" icon
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      setToast({ type: "success", message: `Copied ${email}` });
    } catch {
      setToast({ type: "error", message: "Couldn't copy. Try selecting the address instead." });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name.trim() || !emailOk || form.message.trim().length < 10) {
      setToast({ type: "error", message: "Please add your name, a valid email and a short message." });
      return;
    }
    setStatus("sending");
    // Client-side only: wire this to your form backend (Formspree, EmailJS, your API) when ready.
    window.setTimeout(() => {
      setStatus("idle");
      setToast({ type: "success", message: "Message sent! I'll reply within 24 hours." });
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ["#6366f1", "#8b5cf6", "#06b6d4"] });
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
    }, 1600);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="06"
          eyebrow="Get in touch"
          title="Let's build something"
          titleAccent="remarkable."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT: direct channels */}
          <div className="space-y-8 lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-lead text-fg md:text-title"
            >
              I'm always open to new projects, creative ideas, or a place to be part of your vision.
            </motion.p>

            <ul className="space-y-3">
              {[
                { label: "Personal inbox", value: personalInfo.emails.personal, href: `mailto:${personalInfo.emails.personal}`, icon: <Mail className="h-5 w-5" /> },
                { label: "Work inbox", value: personalInfo.emails.work, href: `mailto:${personalInfo.emails.work}`, icon: <Mail className="h-5 w-5" /> },
              ].map((c, i) => (
                <motion.li
                  key={c.value}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                  className="surface flex items-center justify-between gap-3 rounded-2xl p-4 transition-colors hover:border-accent/50"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                      <a href={c.href} className="block truncate text-sm font-semibold text-fg hover:text-accent md:text-base">
                        {c.value}
                      </a>
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyEmail(c.value)}
                    aria-label={`Copy ${c.value}`}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {copied === c.value ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                className="surface flex items-center gap-4 rounded-2xl p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Based in</span>
                  <span className="block text-sm font-semibold text-fg md:text-base">{personalInfo.location} · UTC+6</span>
                </span>
              </motion.li>
            </ul>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted">Elsewhere</p>
              <SocialLinks />
            </div>

            <Button variant="outline" href={`mailto:${personalInfo.emails.personal}?subject=Resume%20Request`}>
              <Download className="h-4 w-4" /> Request resume
            </Button>
          </div>

          {/* RIGHT: form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE_EXPO }}
            className="surface rounded-3xl p-6 shadow-pop md:p-10 lg:col-span-7"
          >
            <h3 className="text-title font-bold text-fg">Send a message</h3>
            <p className="mb-8 mt-1 text-sm text-muted">I usually reply within 24 hours.</p>

            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="c-name" label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <Field id="c-email" label="Email address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-semibold text-fg">What's this about?</legend>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => {
                    const selected = form.subject === s;
                    return (
                      <label
                        key={s}
                        className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 text-sm font-medium transition-colors duration-300 ${
                          selected ? "border-accent text-white" : "border-line text-fg hover:border-accent"
                        }`}
                      >
                        <input
                          type="radio"
                          name="subject"
                          value={s}
                          checked={selected}
                          onChange={() => setForm({ ...form, subject: s })}
                          className="sr-only"
                        />
                        {selected && (
                          <motion.span
                            layoutId="subject-chip"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-accent"
                          />
                        )}
                        <span className="relative z-10">{s}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Field id="c-message" label="Tell me about your project" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} required />

              <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">Your details are only used to reply to you.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-cursor="Send"
                  className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-fg px-8 text-base font-semibold text-canvas transition-transform duration-300 hover:scale-[1.03] active:scale-95 disabled:opacity-70"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === "sending" ? (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-canvas border-t-transparent" />
                        Sending…
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                        Send message
                        <motion.span
                          aria-hidden="true"
                          className="grid h-8 w-8 place-items-center rounded-full bg-accent text-white transition-transform duration-500 group-hover:-rotate-12"
                        >
                          <Send className="h-4 w-4" />
                        </motion.span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.4, ease: EASE_EXPO }}
            className="fixed bottom-6 left-1/2 z-[140] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-line bg-fg px-5 py-4 text-canvas shadow-pop md:bottom-8"
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
            )}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button type="button" onClick={() => setToast(null)} aria-label="Dismiss" className="grid h-9 w-9 place-items-center rounded-full hover:bg-canvas/10">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
