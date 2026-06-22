"use client";

import { useEffect } from "react";
import { useLeadStore } from "@/store/leadStore";
import { readStoredAttribution } from "@/lib/influencer-attribution";

export default function AttributionRestore() {
  const { setInfluencerSlug, setUtm } = useLeadStore();

  useEffect(() => {
    const stored = readStoredAttribution(sessionStorage);
    if (stored.influencerSlug) {
      setInfluencerSlug(stored.influencerSlug);
    }
    if (Object.keys(stored.utm).length > 0) {
      setUtm(stored.utm);
    }
  }, [setInfluencerSlug, setUtm]);

  return null;
}
