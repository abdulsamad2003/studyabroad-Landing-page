export function trackEvent(name: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  console.log("[track]", name, data);
}

export function trackInfluencerVisit(slug: string) {
  trackEvent("influencer_visit", { slug });
}

export function trackLeadSubmit(source: string) {
  trackEvent("lead_submit", { source });
}
