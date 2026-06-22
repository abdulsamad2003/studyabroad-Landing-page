"use client";

import { usePathname } from "next/navigation";
import { isHomeHeroRoute } from "@/utils/routes";

type MainShellProps = {
  children: React.ReactNode;
};

export default function MainShell({ children }: MainShellProps) {
  const pathname = usePathname();
  const flushHero = isHomeHeroRoute(pathname);

  return (
    <main className={`flex-1 pb-20 md:pb-0 ${flushHero ? "" : "pt-16"}`}>
      {children}
    </main>
  );
}
