import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDomainConfig } from "@/config";
import { isProviderTypeValidForDomain } from "@/config/domain-guards";
import { fetchProviderBySlug } from "@/lib/provider-api";
import ProviderPage from "@/components/provider/ProviderPage";
import { buildPageTitle } from "@/utils/seo";

export const revalidate = 86400;

type ExploreProviderPageProps = {
  params: Promise<{ providerType: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ExploreProviderPageProps): Promise<Metadata> {
  const { providerType, slug } = await params;
  const domainConfig = await getDomainConfig();

  if (!isProviderTypeValidForDomain(providerType, domainConfig.providerType)) {
    return { title: "Not found" };
  }

  const provider = await fetchProviderBySlug(domainConfig.id, providerType, slug);

  if (!provider) {
    return { title: "Not found" };
  }

  return {
    title: buildPageTitle(provider.name, domainConfig.name),
    description: provider.description ?? domainConfig.seo.description,
  };
}

export default async function ExploreProviderPage({
  params,
}: ExploreProviderPageProps) {
  const { providerType, slug } = await params;
  const domainConfig = await getDomainConfig();

  if (!isProviderTypeValidForDomain(providerType, domainConfig.providerType)) {
    notFound();
  }

  const provider = await fetchProviderBySlug(
    domainConfig.id,
    providerType,
    slug,
  );

  if (!provider) {
    notFound();
  }

  return <ProviderPage config={domainConfig} provider={provider} />;
}
