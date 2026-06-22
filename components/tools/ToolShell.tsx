"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { DomainConfig } from "@/config/types";
import type { ToolResult } from "@/types/tool";
import { buildToolSchema } from "@/lib/tool-validation";
import { runToolLogic } from "@/tools/logic/registry";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ToolResultsCard from "./ToolResultsCard";

type ToolShellProps = {
  config: DomainConfig;
  toolKey: keyof DomainConfig["tools"];
  title: string;
  description: string;
  submitLabel?: string;
};

export default function ToolShell({
  config,
  toolKey,
  title,
  description,
  submitLabel = "Get results",
}: ToolShellProps) {
  const tool = config.tools[toolKey];
  const [result, setResult] = useState<ToolResult | null>(null);

  const schema = useMemo(() => buildToolSchema(tool.fields), [tool.fields]);
  type FormValues = z.infer<typeof schema>;

  const defaultValues = useMemo(
    () => Object.fromEntries(tool.fields.map((field) => [field.name, ""])),
    [tool.fields],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit((values) => {
    setResult(
      runToolLogic(
        config.id,
        tool.logicKey,
        values as Record<string, string | number>,
      ),
    );
  });

  return (
    <section className="mx-auto max-w-2xl px-4 py-20">
      <Card>
        <h1 className="font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          {tool.fields.map((field) => {
            if (field.type === "select") {
              const error = form.formState.errors[field.name]?.message as
                | string
                | undefined;

              return (
                <label key={field.name} className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">{field.label}</span>
                  <select
                    className={`rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-primary)_20%,transparent)] ${error ? "border-red-400" : ""}`}
                    aria-invalid={error ? true : undefined}
                    defaultValue=""
                    {...form.register(field.name)}
                  >
                    <option value="" disabled>
                      Select {field.label.toLowerCase()}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {error && <span className="text-sm text-red-600">{error}</span>}
                </label>
              );
            }

            return (
              <Input
                key={field.name}
                label={field.label}
                type={field.type === "number" ? "number" : "text"}
                step={field.type === "number" ? "any" : undefined}
                error={
                  form.formState.errors[field.name]?.message as string | undefined
                }
                {...form.register(field.name)}
              />
            );
          })}

          <Button type="submit">{submitLabel}</Button>
        </form>

        {result && <ToolResultsCard result={result} />}
      </Card>
    </section>
  );
}
