"use client";

import { useState, useRef, type FormEvent } from "react";
import { EB_Garamond } from "next/font/google";
import { Dialog } from "@base-ui/react/dialog";
import { motion } from "framer-motion";
import { X, CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "@/context/quote-modal";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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

const EMPTY: FormState = { namn: "", epost: "", telefon: "", tjanst: "", meddelande: "" };

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
    <label className="flex flex-col gap-1">
      <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {label}
        {required && <span className="ml-0.5 text-brand-orange">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 outline-none placeholder:text-gray-400 transition-colors focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/15";

const signVariants = {
  open: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring" as const, damping: 14, stiffness: 90, mass: 1.4 },
  },
  closed: {
    y: -70,
    rotate: -3,
    opacity: 0,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

export default function QuoteModal() {
  const { open, setOpen } = useQuoteModal();
  const actionsRef = useRef<Dialog.Root.Actions | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => { setForm(EMPTY); setSent(false); }, 500);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} actionsRef={actionsRef}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-brand-navy/65 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />

        <Dialog.Popup className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto pt-[0vh] pb-10 px-4">
          <motion.div
            className="relative w-full max-w-2xl"
            style={{ transformOrigin: "top center" }}
            animate={open ? "open" : "closed"}
            initial="closed"
            variants={signVariants}
            onAnimationComplete={(def) => {
              if (def === "closed") actionsRef.current?.unmount();
            }}
          >
            {/* Ceiling hooks — painted above the sign via z-20 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/jagtappardet.png"
              alt=""
              className="relative z-10 w-full h-[458px] object-cover object-center pointer-events-none select-none"
              draggable={false}
            />

            {/* Wrapper: no z-index → grommet z-[15] resolves in motion.div context, above sign, below img z-20 */}
            <div className="relative w-full -mt-[140px]">

              {/* Grommet rings — siblings of sign so the sign's CSS mask does NOT clip them */}
              <div
                className="pointer-events-none absolute z-[25] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  top: "47px",
                  left: "calc(50% - 230px)",
                  background:
                    "radial-gradient(circle, transparent 0 100%, #777 100%, #ccc 47%, #aaa 55%, #e0e0e0 63%, #999 71%, transparent 76%)",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.65))",
                }}
              />
              <div
                className="pointer-events-none absolute z-[25] size-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  top: "47px",
                  left: "calc(50% + 230px)",
                  background:
                    "radial-gradient(circle, transparent 0 100%, #777 100%, #ccc 47%, #aaa 55%, #e0e0e0 63%, #999 71%, transparent 76%)",
                  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.65))",
                }}
              />

              {/* White sign — CSS mask punches two transparent holes matching carabiner positions */}
              <div
                className={cn(
                  "relative z-20 w-full bg-white rounded-b-2xl",
                  "shadow-[0_30px_90px_-10px_rgba(0,0,0,0.55),0_10px_30px_-5px_rgba(0,0,0,0.2)]",
                )}
                style={{
                  mask: "radial-gradient(circle 6px at calc(50% - 191px) 20px, transparent 6px, black 7px), radial-gradient(circle 6px at calc(50% + 191px) 20px, transparent 6px, black 7px)",
                  maskComposite: "intersect",
                  WebkitMask: "radial-gradient(circle 6px at calc(50% - 191px) 20px, transparent 6px, black 7px), radial-gradient(circle 6px at calc(50% + 191px) 20px, transparent 6px, black 7px)",
                  WebkitMaskComposite: "source-in",
                } as React.CSSProperties}
              >
              <Dialog.Close
                onClick={handleClose}
                className="absolute right-3 top-3 max-[500px]:top-[22px] z-10 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                aria-label="Stäng"
              >
                <X size={15} />
              </Dialog.Close>

              {/* Title block — sits just below the grommet holes at y=47px */}
              <div className={cn(garamond.className, "absolute left-0 right-0 flex flex-col items-center text-center px-16")} style={{ top: "56px" }}>
                <Dialog.Title className="text-2xl font-bold text-brand-navy leading-tight">
                  Begär offert
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-500 leading-tight">
                  Vi återkommer inom 24 timmar.
                </Dialog.Description>
              </div>

<div className={cn(garamond.className, "px-8 pb-6 pt-[94px]")}>

                {sent ? (
                  <div className="mt-7 flex flex-col items-center gap-3 text-center pb-1">
                    <div className="flex size-14 items-center justify-center rounded-full bg-brand-orange/10">
                      <CheckCircle2 size={26} className="text-brand-orange" />
                    </div>
                    <p className="text-xl font-semibold text-brand-navy">Tack för din förfrågan!</p>
                    <p className="text-base text-gray-600">
                      Vi hör av oss till{" "}
                      <span className="font-medium text-brand-navy">{form.epost}</span>{" "}
                      så snart som möjligt.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-1 cursor-pointer rounded-lg bg-brand-navy px-5 py-2 text-base font-medium text-white transition-colors hover:bg-brand-navy/85"
                    >
                      Stäng
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
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

                    <Field label="Telefon">
                      <input
                        type="tel"
                        placeholder="070-000 00 00"
                        value={form.telefon}
                        onChange={set("telefon")}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="E-post" required>
                      <input
                        type="email"
                        required
                        placeholder="din@epost.se"
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
                        <option value="" disabled>Välj tjänst…</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Beskriv projektet">
                      <textarea
                        rows={3}
                        placeholder="Berätta kort om vad du behöver hjälp med…"
                        value={form.meddelande}
                        onChange={set("meddelande")}
                        className={cn(inputClass, "resize-none")}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={sending}
                      className="group mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-navy py-2.5 text-base font-semibold text-white transition-all hover:bg-brand-navy/85 focus:ring-2 focus:ring-brand-navy/20 disabled:opacity-60"
                    >
                      {sending ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Skickar…
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Skicka förfrågan
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                      Inga bindande avtal — du kan även höra av dig på: 070-832 12 25.
                    </p>
                  </form>
                )}
              </div>
              </div>{/* end sign panel */}
            </div>{/* end wrapper */}
          </motion.div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
