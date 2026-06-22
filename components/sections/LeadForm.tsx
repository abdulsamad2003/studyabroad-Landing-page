"use client";

import type { DomainConfig } from "@/config/types";
import { useDomainConfig } from "@/hooks/useDomainConfig";
import { useLeadForm } from "@/hooks/useLeadForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function fieldLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

type LeadFormProps = {
  config: DomainConfig;
};

export default function LeadForm({ config }: LeadFormProps) {
  useDomainConfig(config);

  const { form, onSubmit, isSubmitting } = useLeadForm({
    domainId: config.id,
    fields: config.leadFormFields,
    source: "apply",
  });

  return (
    <section className="mx-auto max-w-lg px-4 py-20">
      <Card>
        <h1 className="font-semibold tracking-tight text-slate-900">Apply</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Tell us about yourself and we&apos;ll connect you with the right experts.
        </p>
        <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
          {config.leadFormFields.map((field) => (
            <Input
              key={field}
              label={fieldLabel(field)}
              error={form.formState.errors[field]?.message as string | undefined}
              {...form.register(field)}
            />
          ))}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
