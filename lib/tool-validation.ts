import { z } from "zod";
import type { ToolField } from "@/config/types";

export function buildToolSchema(fields: ToolField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    if (field.type === "number") {
      shape[field.name] = z
        .union([z.string(), z.number()])
        .refine(
          (value) => value !== "" && value !== null && value !== undefined,
          `${field.label} is required`,
        )
        .transform((value) => Number(value))
        .refine(
          (value) => Number.isFinite(value),
          `${field.label} must be a number`,
        );
    } else if (field.type === "select") {
      const options = field.options ?? [];
      shape[field.name] = z
        .string()
        .min(1, `${field.label} is required`)
        .refine(
          (value) => options.length === 0 || options.includes(value),
          `Select a valid ${field.label.toLowerCase()}`,
        );
    } else {
      shape[field.name] = z.string().min(1, `${field.label} is required`);
    }
  }

  return z.object(shape);
}
