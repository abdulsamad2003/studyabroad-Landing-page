"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DomainConfig } from "@/config/types";

type MobileBottomBarProps = {
  config: DomainConfig;
};

export default function MobileBottomBar({ config }: MobileBottomBarProps) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4 gap-1 px-2 py-2 text-center text-xs font-medium">
        {config.mobileNavLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`cursor-pointer rounded-lg px-1 py-2 transition-colors ${
                isActive ? "text-white" : "text-slate-600"
              }`}
              style={isActive ? { backgroundColor: config.primaryColor } : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
