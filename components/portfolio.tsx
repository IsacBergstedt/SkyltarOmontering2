"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Car01Icon,
  Building04Icon,
  Layers01Icon,
  ShopSignIcon,
  SpotlightIcon,
} from "@hugeicons/core-free-icons";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const CATEGORIES = [
  "Alla",
  "Fordonsfoliering",
  "Fasadskyltar",
  "Fönsterfoliering",
  "Skyltmontering",
] as const;
type Category = (typeof CATEGORIES)[number];

type PortfolioItem = {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<Category, "Alla">;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
};

const ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Scania Lastbilsflotta",
    subtitle: "3 fordon, helfoliering",
    category: "Fordonsfoliering",
    description:
      "Heltäckande reklamfoliering av tre Scania-lastbilar med tryckt grafik för ett regionalt byggföretag.",
    gradientFrom: "#0A2540",
    gradientTo: "#0d3d6a",
    icon: Car01Icon,
  },
  {
    id: 2,
    title: "ICA Kvantum Fasadskylt",
    subtitle: "Externfasad, LED-belyst",
    category: "Fasadskyltar",
    description:
      "Montage av stor LED-belyst fasadskylt i rostfritt stål och akryl på köpcentrumets ytterfasad.",
    gradientFrom: "#1c1917",
    gradientTo: "#2e231a",
    icon: Building04Icon,
  },
  {
    id: 3,
    title: "BMW Showroom Fönsterfilm",
    subtitle: "700 m² kontorsglas",
    category: "Fönsterfoliering",
    description:
      "Solavskärmande och integritetsskyddande fönsterfilm monterad på hela showroomets glasfasad.",
    gradientFrom: "#0d2d2a",
    gradientTo: "#1a4540",
    icon: Layers01Icon,
  },
  {
    id: 4,
    title: "Restaurang Centro",
    subtitle: "Entré & menyskyltning",
    category: "Skyltmontering",
    description:
      "Komplett skyltpaket: entrélogga i mässing, menytavlor och vägledningsskyltar i rostfritt stål.",
    gradientFrom: "#1e1b4b",
    gradientTo: "#2d2870",
    icon: ShopSignIcon,
  },
  {
    id: 5,
    title: "Volvo V90 Fleet Wrap",
    subtitle: "12 bilar, delfoliering",
    category: "Fordonsfoliering",
    description:
      "Enhetlig delfoliering av hela flottan med logotyp, webbadress och kontaktuppgifter.",
    gradientFrom: "#0f1923",
    gradientTo: "#1a2d3f",
    icon: Car01Icon,
  },
  {
    id: 6,
    title: "Centrumhuset Ljusskylt",
    subtitle: "Takmontering, dubbelsidigt",
    category: "Fasadskyltar",
    description:
      "Dubbelsidigt monterad ljusskylt på taknocken med intern LED och automatisk dygnsljusstyrning.",
    gradientFrom: "#1a1a2e",
    gradientTo: "#16213e",
    icon: SpotlightIcon,
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function Portfolio() {
  const [active, setActive] = useState<Category>("Alla");

  const filtered =
    active === "Alla" ? ITEMS : ITEMS.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="inline-block rounded-full border border-brand-navy/15 bg-brand-navy/5 px-4 py-1.5 text-sm font-medium text-brand-navy">
              Portfolio
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Projekt vi är{" "}
              <span className="text-brand-orange">stolta över</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-gray-500 sm:text-right">
            Ett urval av genomförda projekt. Varje uppdrag utförs med samma höga
            standard.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                active === cat
                  ? "bg-brand-navy text-white shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={active}
            role="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <motion.li key={item.id} variants={cardVariants}>
                <article className="group relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  {/* Image placeholder */}
                  <div className="aspect-[4/3] w-full">
                    {/* Gradient bg */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.gradientFrom} 0%, ${item.gradientTo} 100%)`,
                      }}
                    />
                    {/* Dot pattern texture */}
                    <div
                      className="absolute inset-0 opacity-[0.07]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                    {/* Decorative icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <HugeiconsIcon
                        icon={item.icon}
                        size={72}
                        className="text-white"
                        strokeWidth={1}
                      />
                    </div>
                  </div>

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-brand-navy/0 transition-colors duration-350 group-hover:bg-brand-navy/82" />

                  {/* Always-visible bottom bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12">
                    <span className="inline-block rounded-full bg-brand-orange/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                      {item.category}
                    </span>
                    <h3 className="mt-1.5 text-base font-bold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60">{item.subtitle}</p>
                  </div>

                  {/* Hover-revealed description + CTA */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 px-5 pb-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="mt-16 text-sm leading-relaxed text-white/80">
                      {item.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
                      Se projekt
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-gray-400">
            Vill du se fler projekt eller diskutera ditt uppdrag?
          </p>
          <a
            href="#kontakt"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy underline-offset-4 hover:text-brand-orange hover:underline transition-colors"
          >
            Kontakta oss idag
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
