import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { getHomepageAssets } from "@/lib/homepage-assets";
import type { Provider } from "@/types/provider";

type ProviderPreviewGridProps = {
  config: DomainConfig;
  providers: Provider[];
};

function getProviderImage(provider: Provider, config: DomainConfig): string {
  if (provider.imageUrl) return provider.imageUrl;
  return getHomepageAssets(config.id).heroImage;
}

export default function ProviderPreviewGrid({
  config,
  providers,
}: ProviderPreviewGridProps) {
  const providerLabel = config.providerType === "university" ? "University" : "Clinic";

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {providers.map((provider) => (
        <Link
          key={provider.id}
          href={`/explore/${config.providerType}/${provider.slug}`}
          className="group"
        >
          <article className="relative h-80 overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Image
              src={getProviderImage(provider, config)}
              alt={provider.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/15" />

            <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
              {provider.rating != null && (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
                  {provider.rating.toFixed(1)}
                </span>
              )}
              <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                {providerLabel}
              </span>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-white md:text-xl">
                    {provider.name}
                  </h3>
                  {provider.location && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-300">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {provider.location}
                    </span>
                  )}
                  {provider.description && (
                    <span className="mt-2 block line-clamp-2 text-sm leading-relaxed text-slate-300">
                      {provider.description}
                    </span>
                  )}
                </div>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-slate-900"
                  aria-hidden
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
