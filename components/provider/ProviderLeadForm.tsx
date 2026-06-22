"use client";

import type { DomainConfig } from "@/config/types";
import { buildProviderLeadSource } from "@/lib/provider-lead";
import { useLeadForm } from "@/hooks/useLeadForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function fieldLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

type ProviderLeadFormProps = {
  config: DomainConfig;
  providerSlug: string;
  providerName: string;
};

export default function ProviderLeadForm({
  config,
  providerSlug,
  providerName,
}: ProviderLeadFormProps) {
  const { form, onSubmit, isSubmitting } = useLeadForm({
    domainId: config.id,
    fields: config.leadFormFields,
    source: buildProviderLeadSource(providerSlug),
  });

  return (
    <Card>
      <h2 className="mb-1 text-xl font-semibold tracking-tight text-slate-900">
        Enquire about {providerName}
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-slate-600">
        Share your details and we&apos;ll connect you with the right counsellor.
      </p>
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        {config.leadFormFields.map((field) => (
          <Input
            key={field}
            label={fieldLabel(field)}
            error={form.formState.errors[field]?.message as string | undefined}
            {...form.register(field)}
          />
        ))}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit enquiry"}
        </Button>
      </form>
    </Card>
  );
}
