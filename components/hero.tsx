"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useQuoteModal } from "@/context/quote-modal";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease },
  };
}

const STATS = [
  { value: "30+", label: "Års erfarenhet" },
  { value: "5000+", label: "Genomförda projekt" },
  { value: "100%", label: "Nöjda kunder" },
];

export default function Hero() {
  const { openModal } = useQuoteModal();
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-navy">
      {/* Orange glow – top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 90% 5%, rgba(255,98,0,0.13) 0%, transparent 70%)",
        }}
      />
      {/* Subtle white shimmer – left center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 0% 65%, rgba(255,255,255,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Main content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-medium text-brand-orange">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-orange" />
              Certifierad &amp; Försäkrad
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
          >
            Skyltar som syns.
            <br />
            <span className="text-brand-orange">Montering</span> som håller.
          </motion.h1>

          {/* Body copy */}
          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/65 lg:text-xl"
          >
            Vi installerar skyltar, fordonsfolier och fönsterfilm med precision
            och erfarenhet — alltid i tid, alltid med kvalitet.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.45)}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <button
              onClick={openModal}
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 border-transparent bg-brand-orange text-white hover:bg-brand-orange/90"
              )}
            >
              Få offert idag
              <ArrowRight size={17} />
            </button>
            <a
              href="#portfolio"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 bg-transparent text-white hover:border-white/35 hover:bg-white/8"
              )}
            >
              Se våra projekt
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.6)}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-10"
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-white lg:text-4xl">
                  {value}
                </p>
                <p className="mt-1 text-sm text-white/50">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/35"
      >
        <span className="text-[10px] font-medium uppercase tracking-widest">
          Scrolla
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Right orange accent line */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent 10%, rgba(255,98,0,0.4) 40%, rgba(255,98,0,0.4) 60%, transparent 90%)",
        }}
      />
    </section>
  );
}
