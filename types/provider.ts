export type ProviderStat = {
  label: string;
  value: string;
};

export type Provider = {
  id: string;
  slug: string;
  name: string;
  type: string;
  description?: string;
  rating?: number;
  location?: string;
  imageUrl?: string;
};

export type ProviderDetail = Provider & {
  stats?: ProviderStat[];
  gallery?: string[];
};
