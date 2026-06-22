import type { DomainConfig } from "@/config/types";
import type { ProviderDetail } from "@/types/provider";
import { buildProviderDisplayStats } from "@/lib/provider-stats";
import AIChatWidget from "@/components/shared/AIChatWidget";
import Card from "@/components/ui/Card";
import ProviderLeadForm from "./ProviderLeadForm";

type ProviderPageProps = {
  config: DomainConfig;
  provider: ProviderDetail;
};

export default function ProviderPage({ config, provider }: ProviderPageProps) {
  const stats = buildProviderDisplayStats(provider, config.providerType);
  const gallery =
    provider.gallery && provider.gallery.length > 0
      ? provider.gallery
      : provider.imageUrl
        ? [provider.imageUrl]
        : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="page-eyebrow">
          {config.providerType === "university" ? "University" : "Clinic"}
        </p>
        <h1 className="mt-2 font-semibold tracking-tight text-slate-900">
          {provider.name}
        </h1>
        {provider.location && (
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {provider.location}
          </p>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          {stats.length > 0 && (
            <Card>
              <h2 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">
                Key stats
              </h2>
              <dl className="grid gap-4 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={`${stat.label}-${stat.value}`}>
                    <dt className="text-sm text-slate-500">{stat.label}</dt>
                    <dd className="mt-1 font-medium text-slate-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          )}

          <Card>
            <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">
              About
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {provider.description ??
                "Detailed provider information will appear here once available from the backend."}
            </p>
          </Card>

          <Card>
            <h2 className="mb-4 text-lg font-semibold tracking-tight text-slate-900">
              Gallery
            </h2>
            {gallery.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {gallery.map((imageUrl) => (
                  <div
                    key={imageUrl}
                    className="flex h-36 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-500"
                  >
                    {imageUrl.startsWith("http") || imageUrl.startsWith("/") ? (
                      <span className="px-3 text-center">{imageUrl}</span>
                    ) : (
                      imageUrl
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Gallery images will appear here once available.
              </p>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <ProviderLeadForm
            config={config}
            providerSlug={provider.slug}
            providerName={provider.name}
          />
          <AIChatWidget
            agentId={config.agentId || config.id}
            variant="embedded"
            welcomeMessage={`Ask me about ${provider.name}. Full AI responses are coming soon.`}
          />
        </div>
      </div>
    </main>
  );
}
