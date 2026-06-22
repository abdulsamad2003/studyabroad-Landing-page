import Image from "next/image";
import { Check } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";

type ProductsServicesProps = {
  config: DomainConfig;
};

export default function ProductsServices({ config }: ProductsServicesProps) {
  const content = getHomepageContent(config.id).productsServices;

  if (!content) return null;

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      variant="transparent"
      compact
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            <div className="relative h-44 shrink-0 border-b border-slate-100 sm:h-48">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight text-slate-900 md:text-lg">
                  {item.title}
                </h3>
                <span
                  className="shrink-0 text-base font-bold tracking-tight md:text-lg"
                  style={{ color: config.primaryColor }}
                >
                  {item.price}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: config.primaryColor }}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-sm leading-relaxed text-slate-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
