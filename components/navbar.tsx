"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useQuoteModal } from "@/context/quote-modal";

const NAV_LINKS = [
  { label: "Tjänster", href: "#tjanster", id: "tjanster" },
  { label: "Portfolio", href: "#portfolio", id: "portfolio" },
  { label: "Om oss", href: "#om-oss", id: "om-oss" },
  { label: "Kontakt", href: "#kontakt", id: "kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openModal } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback(
    (id: string, closeMenu = false) =>
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (closeMenu) setOpen(false);
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth" });
        history.pushState(null, "", `#${id}`);
      },
    []
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-navy/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-0 text-lg font-bold tracking-tight text-white lg:text-xl"
          >
            Skyltar&nbsp;
            <span className="text-brand-orange">O</span>
            &nbsp;Montering
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={scrollToSection(link.id)}
                  className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <button
              onClick={openModal}
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden border-transparent bg-brand-orange text-white hover:bg-brand-orange/90 lg:inline-flex"
              )}
            >
              Få offert idag
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-md p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={open ? "Stäng meny" : "Öppna meny"}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-brand-navy lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={scrollToSection(link.id, true)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => { setOpen(false); openModal(); }}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full border-transparent bg-brand-orange text-white hover:bg-brand-orange/90"
                  )}
                >
                  Få offert idag
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
