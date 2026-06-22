"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import type { DomainId } from "@/config/types";
import { buildLeadPayload } from "@/lib/lead-payload";
import { submitLead } from "@/lib/lead-api";
import { useLeadStore } from "@/store/leadStore";
import { trackLeadSubmit } from "@/utils/tracking";

type UseLeadFormOptions = {
  domainId: DomainId;
  fields?: string[];
  source?: string;
  influencerSlug?: string;
  agentSlug?: string;
};

function buildLeadSchema(fields: string[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (field === "email") {
      shape[field] = z.string().min(1, "Email is required").email("Enter a valid email");
    } else {
      shape[field] = z.string().min(1, `${field} is required`);
    }
  }

  return z.object(shape);
}

export function useLeadForm(options: UseLeadFormOptions) {
  const {
    domainId,
    fields = ["name", "email", "phone"],
    source,
    influencerSlug,
    agentSlug,
  } = options;
  const { setLead, influencerSlug: storedInfluencerSlug, utm } = useLeadStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(() => buildLeadSchema(fields), [fields]);
  type LeadFormValues = z.infer<typeof schema>;

  const defaultValues = useMemo(
    () => Object.fromEntries(fields.map((field) => [field, ""])),
    [fields],
  );

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const payload = buildLeadPayload({
      domainId,
      formValues: values as Record<string, string>,
      source,
      influencerSlug: influencerSlug ?? storedInfluencerSlug,
      agentSlug,
      utm,
    });

    setIsSubmitting(true);
    try {
      await submitLead(payload);
      setLead(payload);
      trackLeadSubmit(source ?? "form");
      toast.success("Thanks! We'll be in touch soon.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  });

  return { form, onSubmit, isSubmitting };
}
