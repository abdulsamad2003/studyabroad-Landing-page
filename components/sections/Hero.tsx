"use client";

import { useRef } from "react";
import Link from "next/link";
import type { DomainConfig } from "@/config/types";
import { getHomepageAssets } from "@/lib/homepage-assets";
import { getDomainChatBranding } from "@/lib/chat-branding";
import AIChatWidget, { type AIChatWidgetHandle } from "@/components/shared/AIChatWidget";
import Button from "@/components/ui/Button";

type HeroProps = {
  config: DomainConfig;
};

export default function Hero({ config }: HeroProps) {
  const chatRef = useRef<AIChatWidgetHandle>(null);
  const assets = getHomepageAssets(config.id);
  const chatBranding = getDomainChatBranding(config);

  const focusChat = () => {
    chatRef.current?.focusInput();
    document
      .getElementById("hero-chat")
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section
      className="hero-section relative overflow-hidden border-b border-slate-800"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${assets.heroImage})`,
      }}
      aria-label={assets.heroImageAlt}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-24 pb-32 md:pt-28 md:pb-40 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="page-eyebrow">{config.tagline}</p>
          <h1 className="mt-4 max-w-xl font-semibold tracking-tight text-white">
            {config.hero.heading}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-200">
            {config.hero.subheading}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={config.hero.ctaPrimaryHref}>
              <Button className="px-6 py-3">{config.hero.ctaPrimary}</Button>
            </Link>
            <Button variant="glass" type="button" onClick={focusChat} className="px-6 py-3">
              {config.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <div className="flex w-full justify-center lg:justify-end">
          <AIChatWidget
            ref={chatRef}
            agentId={config.agentId || config.id}
            variant="embedded"
            {...chatBranding}
          />
        </div>
      </div>
    </section>
  );
}
