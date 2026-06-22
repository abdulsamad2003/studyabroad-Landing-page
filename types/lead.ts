export type Lead = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  influencerSlug?: string;
  agentSlug?: string;
  domainId?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  createdAt?: string;
  [key: string]: string | undefined;
};

export type LeadPayload = Omit<Lead, "id" | "createdAt">;
