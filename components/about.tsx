"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease },
  };
}

const VALUES = [
  "Montörer med gedigen yrkeserfarenhet",
  "Monterar hela Sverige - utan krångel",
  "Kvalitetsmaterial som monteras för att hålla",
  "Flexibla lösningar anpassade efter dina behov",
  "Personlig kontakt från start till färdig installation",
];

const STATS = [
  { value: "30+", label: "Års erfarenhet" },
  { value: "5 000+", label: "Genomförda uppdrag" },
  { value: "Alltid", label: "Nöjda kunder" },
  { value: "Hela Sverige", label: "Monterar vi" },
];

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease }}
      className="flex flex-col items-center justify-center rounded-2xl border border-brand-navy/10 bg-white p-6 text-center shadow-sm"
    >
      <span className="text-3xl font-bold text-brand-orange lg:text-4xl">
        {value}
      </span>
      <span className="mt-1.5 text-sm leading-snug text-gray-500">{label}</span>
    </motion.div>
  );
}

export default function About() {
  const listRef = useRef<HTMLUListElement>(null);
  const listInView = useInView(listRef, { once: true, margin: "-80px" });

  return (
    <section id="om-oss" className="relative overflow-hidden bg-brand-navy py-24 lg:py-36">
      {/* Decorative orange glow – bottom left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at -5% 110%, rgba(255,98,0,0.14) 0%, transparent 65%)",
        }}
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* ── Left column: text ── */}
          <div>
            <motion.span
              {...fadeUp(0)}
              className="inline-block rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-sm font-medium text-brand-orange"
            >
              Om oss
            </motion.span>

            <motion.h2
              {...fadeUp(0.1)}
              className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {" "}
              <span className="text-brand-orange">Montering som håller.</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 text-lg leading-relaxed text-white/60"
            >
              Rätt monterad skylt ska synas, hålla och representera ditt varumärke på
              bästa möjliga sätt. 
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-4 text-lg leading-relaxed text-white/60"
            >
              Vi är alltid behjälpliga och anpassningsbara efter dina behov. 
              — från mätning till
              slutbesiktning.
            </motion.p>

            {/* Values checklist */}
            <motion.ul
              ref={listRef}
              role="list"
              className="mt-10 space-y-3.5"
            >
              {VALUES.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -18 }}
                  animate={listInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.08, ease }}
                  className="flex items-start gap-3 text-white/75"
                >
                  <CheckCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-brand-orange"
                    strokeWidth={2}
                  />
                  <span className="text-base leading-snug">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* ── Right column: stats grid ── */}
          <div className="flex flex-col gap-6">
            {/* Top accent card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="relative overflow-hidden rounded-3xl bg-brand-orange p-8 text-white shadow-lg"
            >
              {/* Inner decoration */}
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 size-40 rounded-full bg-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -left-6 size-32 rounded-full bg-white/8"
              />
              <p className="relative text-sm font-medium uppercase tracking-widest text-white/75">
                
              </p>
              <p className="relative mt-3 text-xl font-semibold leading-snug sm:text-2xl">
                Alltid anpassningsbara på plats efter dina önskemål
              </p>
              <p className="relative mt-4 text-sm text-white/70">
                
              </p>
            </motion.div>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
