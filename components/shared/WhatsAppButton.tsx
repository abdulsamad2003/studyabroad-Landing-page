import type { DomainConfig } from "@/config/types";
import { buildWhatsAppHref } from "@/utils/whatsapp";

type WhatsAppButtonProps = {
  config: DomainConfig;
};

export default function WhatsAppButton({ config }: WhatsAppButtonProps) {
  const href = buildWhatsAppHref(config.whatsappNumber);

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 left-4 z-30 cursor-pointer rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-green-600 md:bottom-4"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
