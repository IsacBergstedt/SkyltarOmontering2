"use client";

import { useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { X, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal";

const SERVICES = [
  "Skyltmontering",
  "Fordonsfoliering",
  "Fönsterfoliering",
  "Fasadskyltar",
  "Ljusskyltning",
  "Butiksprofil",
  "Övrigt",
];

type FormState = {
  namn: string;
  epost: string;
  telefon: string;
  tjanst: string;
  meddelande: string;
};

const EMPTY: FormState = {
  namn: "",
  epost: "",
  telefon: "",
  tjanst: "",
  meddelande: "",
};

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-brand-navy">
        {label}
        {required && <span className="ml-0.5 text-brand-orange">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-brand-navy outline-none placeholder:text-gray-400 transition-colors focus:border-brand-orange focus:bg-white focus:ring-2 focus:ring-brand-orange/20";

export default function QuoteModal() {
  const { open, setOpen } = useQuoteModal();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setForm(EMPTY);
      setSent(false);
    }, 300);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />

        {/* Popup wrapper – scrollable on small screens */}
        <Dialog.Popup className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className={cn(
              "relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl",
              "transition-all duration-300",
              "data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:translate-y-4",
              "data-[ending-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:translate-y-4"
            )}
          >
            {/* Orange top bar */}
            <div className="h-1.5 w-full rounded-t-3xl bg-brand-orange" />

            <div className="px-7 pb-8 pt-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Dialog.Title className="text-xl font-bold text-brand-navy">
                    Begär offert
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-sm text-gray-500">
                    Fyll i formuläret så återkommer vi inom 24 timmar.
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  onClick={handleClose}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Stäng"
                >
                  <X size={18} />
                </Dialog.Close>
              </div>

              {/* Content */}
              {sent ? (
                <div className="mt-10 flex flex-col items-center gap-4 text-center pb-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-brand-orange/10">
                    <CheckCircle2 size={32} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-brand-navy">
                      Tack för din förfrågan!
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Vi hör av oss till{" "}
                      <span className="font-medium text-brand-navy">{form.epost}</span>{" "}
                      så snart som möjligt.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 rounded-xl bg-brand-navy px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/85"
                  >
                    Stäng
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Namn" required>
                      <input
                        type="text"
                        required
                        placeholder="Anna Karlsson"
                        value={form.namn}
                        onChange={set("namn")}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Telefonnummer">
                      <input
                        type="tel"
                        placeholder="070-000 00 00"
                        value={form.telefon}
                        onChange={set("telefon")}
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <Field label="E-postadress" required>
                    <input
                      type="email"
                      required
                      placeholder="anna@foretaget.se"
                      value={form.epost}
                      onChange={set("epost")}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Tjänst" required>
                    <select
                      required
                      value={form.tjanst}
                      onChange={set("tjanst")}
                      className={cn(inputClass, "appearance-none cursor-pointer")}
                    >
                      <option value="" disabled>
                        Välj tjänst…
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Beskriv ditt projekt">
                    <textarea
                      rows={4}
                      placeholder="Berätta kort om vad du behöver hjälp med, var projektet ska genomföras och eventuell tidsram…"
                      value={form.meddelande}
                      onChange={set("meddelande")}
                      className={cn(inputClass, "resize-none")}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-orange/90 disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Skickar…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Skicka förfrågan
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Inga bindande avtal — bara ett förutsättningslöst samtal.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
