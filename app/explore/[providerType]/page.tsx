import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDomainConfig } from "@/config";
import { isProviderTypeValidForDomain } from "@/config/domain-guards";
import ProviderExploreListing from "@/components/provider/ProviderExploreListing";
import { fetchProviderListing } from "@/lib/homepage-api";
import { buildPageTitle } from "@/utils/seo";

export const revalidate = 86400;

type ExploreListingPageProps = {
  params: Promise<{ providerType: string }>;
};

export async function generateMetadata({
  params,
}: ExploreListingPageProps): Promise<Metadata> {
  const { providerType } = await params;
  const domainConfig = await getDomainConfig();

  if (!isProviderTypeValidForDomain(providerType, domainConfig.providerType)) {
    return { title: "Not found" };
  }

  const label = providerType === "clinic" ? "Clinics" : "Universities";

  return {
    title: buildPageTitle(`Explore ${label}`, domainConfig.name),
    description: domainConfig.seo.description,
  };
}

export default async function ExploreListingPage({
  params,
}: ExploreListingPageProps) {
  const { providerType } = await params;
  const domainConfig = await getDomainConfig();

  if (!isProviderTypeValidForDomain(providerType, domainConfig.providerType)) {
    notFound();
  }

  const providers = await fetchProviderListing(
    domainConfig.id,
    domainConfig.providerType,
  );

  return (
    <ProviderExploreListing config={domainConfig} providers={providers} />
  );
}
