import type { DomainConfig } from "@/config/types";
import type { Provider } from "@/types/provider";
import ProviderPreviewGrid from "./ProviderPreviewGrid";

type ProviderExploreListingProps = {
  config: DomainConfig;
  providers: Provider[];
};

export default function ProviderExploreListing({
  config,
  providers,
}: ProviderExploreListingProps) {
  const isClinic = config.providerType === "clinic";
  const heading = isClinic ? "Explore clinics" : "Explore universities";
  const subheading = isClinic
    ? "Compare fertility centres by location, ratings, and treatment focus before you book a consultation."
    : "Browse partner universities by location, reputation, and program strengths for your target intake.";

  return (
    <main className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="page-eyebrow">{isClinic ? "Trusted partners" : "Partner network"}</p>
        <h1 className="mt-3 font-semibold tracking-tight text-slate-900">{heading}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">{subheading}</p>
      </div>

      {providers.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
          {isClinic
            ? "Clinic listings will appear here once available."
            : "University listings will appear here once available."}
        </p>
      ) : (
        <ProviderPreviewGrid config={config} providers={providers} />
      )}
    </main>
  );
}
