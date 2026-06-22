import type { Metadata } from "next";
import { getDomainConfig } from "@/config";
import { buildPageTitle } from "@/utils/seo";
import HomePage from "@/components/HomePage";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getDomainConfig();

  return {
    title: buildPageTitle(config.seo.title, config.name),
    description: config.seo.description,
    keywords: config.seo.keywords,
  };
}

export default function Home() {
  return <HomePage />;
}
