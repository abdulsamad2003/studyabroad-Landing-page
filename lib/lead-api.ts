import api from "@/lib/axios";
import type { LeadPayload } from "@/types/lead";

export async function submitLead(payload: LeadPayload): Promise<void> {
  await api.post("/leads", payload);
}
