"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAgentStore } from "@/store/agentStore";
import api from "@/lib/axios";
import type { BusinessAgent } from "@/types/agent";

async function fetchAgentBySlug(slug: string): Promise<BusinessAgent> {
  const { data } = await api.get<BusinessAgent>(`/agents/slug/${slug}`);
  return data;
}

export function useAgentSlug(slug?: string) {
  const { agent, setAgent, clearAgent } = useAgentStore();

  const query = useQuery({
    queryKey: ["agent", slug],
    queryFn: () => fetchAgentBySlug(slug!),
    enabled: Boolean(slug),
  });

  useEffect(() => {
    if (query.data) {
      setAgent(query.data);
    }

    return () => {
      clearAgent();
    };
  }, [query.data, setAgent, clearAgent]);

  return {
    agent: query.data ?? agent,
    isLoading: query.isLoading,
    error: query.error,
  };
}
