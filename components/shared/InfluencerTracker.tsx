"use client";

import { useInfluencerTracking } from "@/hooks/useInfluencerTracking";

type InfluencerTrackerProps = {
  slug: string;
};

export default function InfluencerTracker({ slug }: InfluencerTrackerProps) {
  useInfluencerTracking(slug);
  return null;
}
