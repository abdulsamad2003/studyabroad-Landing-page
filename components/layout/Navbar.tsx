"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DomainConfig } from "@/config/types";
import { isHomeHeroRoute } from "@/utils/routes";

type NavbarProps = {
  config: DomainConfig;
};

const SCROLL_THRESHOLD = 24;

export default function Navbar({ config }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const overHero = isHomeHeroRoute(pathname);
  const solid = scrolled;
  const lightOnDark = !solid && overHero;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-slate-200/90 bg-white shadow-sm"
          : "border-b border-transparent bg-transparent shadow-none"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-[0.95rem] font-semibold tracking-tight transition-colors ${
            lightOnDark ? "text-white drop-shadow-sm" : "text-slate-900"
          }`}
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-white shadow-sm">
            {config.name.charAt(0)}
          </span>
          {config.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {config.navbarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                lightOnDark
                  ? "text-white/90 drop-shadow-sm hover:text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors md:hidden ${
            lightOnDark
              ? "border-white/40 text-white drop-shadow-sm hover:bg-white/10"
              : "border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </nav>

      {menuOpen && (
        <div
          className={`border-t px-4 py-4 md:hidden ${
            solid
              ? "border-slate-200 bg-white"
              : lightOnDark
                ? "border-white/20 bg-black/50 backdrop-blur-md"
                : "border-slate-200/70 bg-white/90 backdrop-blur-md"
          }`}
        >
          <div className="flex flex-col gap-3">
            {config.navbarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  lightOnDark
                    ? "text-white/90 hover:text-white"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
