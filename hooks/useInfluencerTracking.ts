"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLeadStore } from "@/store/leadStore";
import {
  parseUtmParams,
  persistAttribution,
  readStoredAttribution,
} from "@/lib/influencer-attribution";
import { trackInfluencerVisit } from "@/utils/tracking";

export function useInfluencerTracking(slug?: string) {
  const searchParams = useSearchParams();
  const { setInfluencerSlug, setUtm } = useLeadStore();

  useEffect(() => {
    const utm = parseUtmParams(searchParams.toString());

    if (slug) {
      const stored = readStoredAttribution(sessionStorage);
      const resolvedUtm = Object.keys(utm).length > 0 ? utm : stored.utm;

      setInfluencerSlug(slug);
      persistAttribution(sessionStorage, slug, resolvedUtm);
      setUtm(resolvedUtm);
      trackInfluencerVisit(slug);
      return;
    }

    const stored = readStoredAttribution(sessionStorage);
    if (stored.influencerSlug) {
      setInfluencerSlug(stored.influencerSlug);
    }
    if (Object.keys(stored.utm).length > 0) {
      setUtm(stored.utm);
    }
  }, [slug, searchParams, setInfluencerSlug, setUtm]);
}
