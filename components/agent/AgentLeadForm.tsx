"use client";

import type { DomainId } from "@/config/types";
import type { BusinessAgent } from "@/types/agent";
import { buildAgentLeadSource } from "@/lib/agent-lead";
import { useLeadForm } from "@/hooks/useLeadForm";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

function fieldLabel(field: string): string {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

type AgentLeadFormProps = {
  agent: BusinessAgent;
  domainId: DomainId;
};

export default function AgentLeadForm({ agent, domainId }: AgentLeadFormProps) {
  const { form, onSubmit, isSubmitting } = useLeadForm({
    domainId,
    fields: agent.leadFormFields,
    source: buildAgentLeadSource(agent.slug),
    agentSlug: agent.slug,
    influencerSlug: agent.influencerSlug,
  });

  return (
    <Card>
      <h2 className="mb-1 text-xl font-semibold tracking-tight text-slate-900">
        Get in touch
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-slate-600">
        Submit your details and we&apos;ll connect you with their team.
      </p>
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        {agent.leadFormFields.map((field) => (
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
  );
}
