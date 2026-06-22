import type { ReactNode } from "react";
import type { DomainConfig } from "@/config/types";
import { buildHomeGradientBandStyle } from "@/lib/home-gradient-style";

type HomeGradientBandProps = {
  config: DomainConfig;
  children: ReactNode;
};

export default function HomeGradientBand({ config, children }: HomeGradientBandProps) {
  const gradientStyle = buildHomeGradientBandStyle(
    config.primaryColor,
    config.secondaryColor ?? config.primaryColor,
  );

  return (
    <div className="home-gradient-band relative">
      <div
        aria-hidden="true"
        className="home-gradient-band__layer pointer-events-none absolute inset-0"
        style={gradientStyle}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
