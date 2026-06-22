import { Suspense } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DomainConfig } from "@/config/types";
import { buildExploreHref } from "@/config/domain-guards";
import ProviderPreviewGrid from "@/components/provider/ProviderPreviewGrid";
import { fetchProviderPreview } from "@/lib/homepage-api";
import { getHomepageContent } from "@/lib/homepage-content";
import PreviewEmptyState from "./PreviewEmptyState";
import PreviewSkeleton from "./PreviewSkeleton";
import SectionShell from "./SectionShell";

type ProviderListingProps = {
  config: DomainConfig;
};

async function ProviderListingContent({ config }: ProviderListingProps) {
  const content = getHomepageContent(config.id).providerListing;
  const providers = await fetchProviderPreview(config.id, config.providerType);

  if (providers.length === 0) {
    return <PreviewEmptyState message={content.emptyMessage} />;
  }

  return <ProviderPreviewGrid config={config} providers={providers} />;
}

export default function ProviderListing({ config }: ProviderListingProps) {
  const content = getHomepageContent(config.id).providerListing;

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      subheading={content.subheading}
    >
      <Suspense
        fallback={
          <PreviewSkeleton label={`Loading ${config.providerType} previews...`} />
        }
      >
        <ProviderListingContent config={config} />
      </Suspense>
      <div className="mt-8 text-center md:text-left">
        <Link
          href={buildExploreHref(config.providerType)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:gap-2 hover:underline"
        >
          View all {config.providerType === "university" ? "universities" : "clinics"}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </SectionShell>
  );
}
