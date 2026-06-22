import { notFound } from "next/navigation";
import { Suspense } from "react";
import HomePage from "@/components/HomePage";
import InfluencerTracker from "@/components/shared/InfluencerTracker";
import { getDomainConfig } from "@/config";
import { fetchInfluencerBySlug } from "@/lib/influencer-api";

export const revalidate = 3600;

type InfluencerPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InfluencerPage({ params }: InfluencerPageProps) {
  const { slug } = await params;
  const config = await getDomainConfig();
  const influencer = await fetchInfluencerBySlug(config.id, slug);

  if (!influencer) {
    notFound();
  }

  return (
    <>
      <Suspense fallback={null}>
        <InfluencerTracker slug={slug} />
      </Suspense>
      <HomePage />
    </>
  );
}
