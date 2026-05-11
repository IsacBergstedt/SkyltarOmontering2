"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Tjänster", href: "#tjanster" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="#kontakt"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden border-transparent bg-brand-orange text-white hover:bg-brand-orange/90 lg:inline-flex"
              )}
            >
              Få offert idag
            </Link>

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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "w-full border-transparent bg-brand-orange text-white hover:bg-brand-orange/90"
                  )}
                >
                  Få offert idag
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
