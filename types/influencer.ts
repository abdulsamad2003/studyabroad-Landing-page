import type { DomainId } from "@/config/types";

export type Influencer = {
  id: string;
  slug: string;
  category: DomainId;
  isActive?: boolean;
};
