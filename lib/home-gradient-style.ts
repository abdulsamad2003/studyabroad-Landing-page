import type { CSSProperties } from "react";

function mixWithWhite(hex: string, colorWeightPercent: number): string {
  const normalized = hex.replace("#", "");
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  const weight = colorWeightPercent / 100;
  const mix = (channel: number) =>
    Math.round(channel * weight + 255 * (1 - weight));

  return `rgb(${mix(r)} ${mix(g)} ${mix(b)})`;
}

/**
 * Visible 135deg band gradient with soft waves across a tall About→FAQs scroll.
 * Peaks at ~30% theme mix — clearly tinted, still safe for dark body text.
 */
export function buildHomeGradientBandStyle(
  primaryColor: string,
  secondaryColor: string,
): CSSProperties {
  const secondary = secondaryColor || primaryColor;

  return {
    backgroundColor: mixWithWhite(primaryColor, 28),
    backgroundImage: [
      `linear-gradient(135deg,`,
      `${mixWithWhite(primaryColor, 32)} 0%,`,
      `${mixWithWhite(primaryColor, 22)} 8%,`,
      `${mixWithWhite(primaryColor, 10)} 18%,`,
      `${mixWithWhite(secondary, 26)} 34%,`,
      `${mixWithWhite(primaryColor, 8)} 50%,`,
      `${mixWithWhite(secondary, 20)} 66%,`,
      `${mixWithWhite(primaryColor, 12)} 82%,`,
      `${mixWithWhite(secondary, 16)} 100%)`,
    ].join(" "),
  };
}
