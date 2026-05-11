"use client";

import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShopSignIcon,
  Car01Icon,
  Layers01Icon,
  Building04Icon,
  SpotlightIcon,
  ToolboxIcon,
} from "@hugeicons/core-free-icons";

/* ─── Data ──────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: ShopSignIcon,
    title: "Skyltmontering",
    description:
      "Professionell montering av alla typer av skyltar – fasad, stolpe eller vägg. Vi säkerställer att skylten sitter rätt, säkert och varaktigt.",
  },
  {
    icon: Car01Icon,
    title: "Fordonsfoliering",
    description:
      "Heltäckande eller delvis foliering av bilar, skåpbilar och lastbilar. Perfekt för reklam, varumärkesprofilering eller lackskydd.",
  },
  {
    icon: Layers01Icon,
    title: "Fönsterfoliering",
    description:
      "Solavskärmning, integritetsskydd och dekorativ fönsterfilm för kontor, butiker och fordon. Stilrent och funktionellt.",
  },
  {
    icon: Building04Icon,
    title: "Fasadskyltar",
    description:
      "Imponerande fasadskyltar i metall, akryl eller komposit som syns på långt håll och stärker ert varumärke dygnet runt.",
  },
  {
    icon: SpotlightIcon,
    title: "Ljusskyltning",
    description:
      "LED-skyltar och ljuslådor med hög synlighet oavsett väder och tid på dygnet. Energieffektiv belysning med lång livslängd.",
  },
  {
    icon: ToolboxIcon,
    title: "Butiksprofil",
    description:
      "Komplett visuell profil för din butik – från entréskylt och fönsterdekor till inredningsgrafik och banderoller.",
  },
];

/* ─── Infinite grid pattern ─────────────────────────────────────────── */

function GridPattern({
  offsetX,
  offsetY,
  id,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  id: string;
}) {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* ─── Variants ───────────────────────────────────────────────────────── */

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ─── Section ────────────────────────────────────────────────────────── */

export default function Services() {
  /* Mouse tracking for cursor-reveal effect */
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  /* Infinite scroll offset */
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.35) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.35) % 40);
  });

  /* Radial mask centred on cursor */
  const maskImage = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      id="tjanster"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-[#F7F8FA] py-24 lg:py-32"
    >
      {/* Base grid — always visible, very subtle */}
      <div className="pointer-events-none absolute inset-0 text-brand-navy opacity-[0.055]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="svc-grid-base" />
      </div>

      {/* Cursor-reveal grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 text-brand-navy opacity-35"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} id="svc-grid-reveal" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-brand-navy/15 bg-brand-navy/5 px-4 py-1.5 text-sm font-medium text-brand-navy">
            Våra tjänster
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
            Allt du behöver —{" "}
            <span className="text-brand-orange">på ett ställe</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-500">
            Vi erbjuder ett komplett utbud av skylt- och folieringstjänster för
            företag i alla storlekar. Kvalitet och precision i varje projekt.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.ul
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.li
              key={service.title}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-5 inline-flex w-fit items-center justify-center rounded-xl bg-brand-orange/10 p-3 transition-colors duration-300 group-hover:bg-brand-orange/15">
                <HugeiconsIcon
                  icon={service.icon}
                  size={26}
                  className="text-brand-orange"
                  strokeWidth={1.6}
                />
              </div>

              <h3 className="text-lg font-semibold text-brand-navy">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                {service.description}
              </p>

              <div className="mt-6 flex items-center gap-1 text-sm font-medium text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Begär offert
                <ArrowUpRight size={15} />
              </div>

              <div className="absolute inset-y-0 left-0 w-0.5 rounded-l-2xl bg-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
