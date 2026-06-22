export interface BusinessAgent {
  id: string;
  slug: string;
  businessName: string;
  logo: string;
  primaryColor: string;
  agentId: string;
  greeting: string;
  tagline: string;
  leadFormFields: string[];
  category: string;
  influencerSlug?: string;
  isActive: boolean;
}
