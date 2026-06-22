import type { ToolResult } from "@/types/tool";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type ToolResultsCardProps = {
  result: ToolResult;
};

const tierVariant = (tier?: string): "default" | "success" | "warning" => {
  if (tier === "safe" || tier === "premium" || tier === "high") return "success";
  if (tier === "reach" || tier === "specialist" || tier === "lower") return "warning";
  return "default";
};

export default function ToolResultsCard({ result }: ToolResultsCardProps) {
  return (
    <Card className="mt-8 border-[var(--color-primary)]/20">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">Your results</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{result.summary}</p>

      {result.items && result.items.length > 0 && (
        <ul className="mt-5 space-y-3">
          {result.items.map((item) => (
            <li
              key={`${item.label}-${item.value}`}
              className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                {item.tier && <Badge variant={tierVariant(item.tier)}>{item.tier}</Badge>}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{item.value}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
