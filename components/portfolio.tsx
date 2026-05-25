"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useQuoteModal } from "@/context/quote-modal";

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
  image: string;
};

const ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "Foliering av takfönster",
    subtitle: "Kommersiell lokal, inomhus",
    category: "Fönsterfoliering",
    description:
      "Färgad folie monterad på stora takfönster och glaspartier i en kommersiell inomhusmiljö, utförd från stege med noggrann passning mot profilerade ramar.",
    image: "/images/skylt1%20(1).jpeg",
  },
  {
    id: 2,
    title: "Solna Stad – Stadsgateskylt",
    subtitle: "Utomhusskylt, kommunalt uppdrag",
    category: "Skyltmontering",
    description:
      "Montering av stor grön informationsskylt åt Solna Stad med budskapet \"Här är en trivsam stadsgata!\" – placerad längs gata under pågående stadsbyggnadsprojekt.",
    image: "/images/skylt1%20(2).jpeg",
  },
  {
    id: 3,
    title: "Välkomstskylt Haninge",
    subtitle: "Kommunal entrémarkering",
    category: "Skyltmontering",
    description:
      "Mörkgrå välkomstskylt med Haninge kommuns logotyp och texten \"Välkommen till Haninge\", monterad vid kommunens infart som en tydlig och professionell entrémarkering.",
    image: "/images/skylt1%20(3).jpeg",
  },
  {
    id: 4,
    title: "Förskolan Vinjegatan 23",
    subtitle: "Fasadskylt, kommunalt uppdrag",
    category: "Skyltmontering",
    description:
      "Montering av institutionsskylt på förskolas träfasad i Haninge, utförd från stege. Skylten bär Haninge kommuns profil med logotyp, namn och adress.",
    image: "/images/skylt1%20(4).jpeg",
  },
  {
    id: 5,
    title: "Lyftkorgsmontage – Solna Stad",
    subtitle: "Storformat, kommunal skyltning",
    category: "Skyltmontering",
    description:
      "Montage av storformatsskylt åt Solna Stad med hjälp av lyftkorg för säker och precis placering på hög höjd. Samma skyltserie som stadsgateskyltarna längs ombyggda gator.",
    image: "/images/skylt1%20(5).jpeg",
  },
  {
    id: 6,
    title: "Butiksfönster Helfoliering",
    subtitle: "Centrumläge, vit avskärmningsfolie",
    category: "Fönsterfoliering",
    description:
      "Heltäckande vit folie monterad på butiksfönster i stadsmiljö, för avskärmning under renovering. Ger ett städat och enhetligt intryck mot gatan under byggtiden.",
    image: "/images/skylt1%20(6).jpeg",
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
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);
  const { openModal } = useQuoteModal();

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

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
              Tidigare arbeten
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
              Projekt vi genomfört
              
            </h2>
          </div>
        
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
                <article onClick={() => setLightbox(item)} className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
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
                  <div className="absolute inset-x-0 top-0 -translate-y-2 px-5 pt-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm leading-relaxed text-white/90">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-brand-orange">
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
        
          <button
            onClick={openModal}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy underline-offset-4 hover:text-brand-orange hover:underline transition-colors"
          >
            Kontakta oss idag
            <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={lightbox.image}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <div className="px-6 py-4">
                <span className="inline-block rounded-full bg-brand-orange/90 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  {lightbox.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-white">{lightbox.title}</h3>
                <p className="mt-1 text-sm text-white/60">{lightbox.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{lightbox.description}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/90 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
