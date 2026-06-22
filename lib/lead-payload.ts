import type { DomainId } from "@/config/types";
import type { UtmParams } from "@/store/leadStore";
import type { LeadPayload } from "@/types/lead";

export type BuildLeadPayloadInput = {
  domainId: DomainId;
  formValues: Record<string, string>;
  source?: string;
  influencerSlug?: string;
  agentSlug?: string;
  utm?: UtmParams;
};

export function buildLeadPayload(input: BuildLeadPayloadInput): LeadPayload {
  const { domainId, formValues, source, influencerSlug, agentSlug, utm } = input;

  const payload: LeadPayload = {
    domainId,
    ...formValues,
  };

  if (source) payload.source = source;
  if (influencerSlug) payload.influencerSlug = influencerSlug;
  if (agentSlug) payload.agentSlug = agentSlug;

  if (utm) {
    for (const [key, value] of Object.entries(utm)) {
      if (value) payload[key] = value;
    }
  }

  return payload;
}
