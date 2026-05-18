import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const NAV = [
  { label: "Tjänster", href: "#tjanster" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Kontakt", href: "#kontakt" },
];

const SERVICES = [
  "Skyltmontering",
  "Fordonsfoliering",
  "Fönsterfoliering",
  "Fasadskyltar",
  "Ljusskyltning",
  "Butiksprofil",
];

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-brand-navy text-white">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xl font-bold tracking-tight">
              Skyltar&nbsp;<span className="text-brand-orange">O</span>&nbsp;Montering
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Professionell skyltmontering, fordonsfoliering och fönsterfilm i
              över 30 år. Vi levererar kvalitet med precision — alltid i tid.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigation
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Tjänster
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <span className="text-sm text-white/65">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="tel:+46708321225"
                  className="flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 text-brand-orange" />
                  070-832 12 25
                </a>
              </li>
              <li>
                <a
                  href="mailto:skyltaromontering@gmail.com"
                  className="flex items-start gap-3 text-sm text-white/65 transition-colors hover:text-white"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 text-brand-orange" />
                  skyltaromontering@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-white/65">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-brand-orange" />
                  Stockholm, men vi utför jobb i hela Sverige!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/35 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Skyltar O Montering.</p>
          <div className="flex gap-5">
            <Link href="#" className="transition-colors hover:text-white/60">
              Integritetspolicy
            </Link>
            <Link href="#" className="transition-colors hover:text-white/60">
              Villkor
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
