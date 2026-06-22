import Link from "next/link";
import type { DomainConfig } from "@/config/types";

type FooterProps = {
  config: DomainConfig;
};

export default function Footer({ config }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-white py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight text-slate-900">
            {config.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
            {config.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {config.footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-slate-200 px-4 pt-6 text-sm text-slate-500">
        © {new Date().getFullYear()} {config.name}. All rights reserved.
      </div>
    </footer>
  );
}
