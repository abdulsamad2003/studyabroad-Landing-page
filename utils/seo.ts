export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
};

export function buildPageTitle(title: string, siteName = "Sayy") {
  return `${title} | ${siteName}`;
}

export function buildMetaTags(meta: SeoMeta) {
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.ogImage ? [meta.ogImage] : [],
    },
  };
}
