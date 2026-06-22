import type { ApiResponse } from "@/types/api";

export function normalizeListResponse<T>(body: unknown): T[] {
  if (!body || typeof body !== "object") {
    return [];
  }

  const payload = body as ApiResponse<T[]>;
  return Array.isArray(payload.data) ? payload.data : [];
}
