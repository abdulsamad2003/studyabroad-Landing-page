import type { DomainConfig } from "@/config/types";
import { getHomepageContent } from "@/lib/homepage-content";
import SectionShell from "./SectionShell";
import FAQAccordion from "./FAQAccordion";

type FAQsProps = {
  config: DomainConfig;
};

export default function FAQs({ config }: FAQsProps) {
  const content = getHomepageContent(config.id).faqs;

  if (!content) {
    return null;
  }

  return (
    <SectionShell
      eyebrow={content.eyebrow}
      heading={content.heading}
      subheading={content.subheading}
      compact
    >
      <FAQAccordion items={content.items} />
    </SectionShell>
  );
}
