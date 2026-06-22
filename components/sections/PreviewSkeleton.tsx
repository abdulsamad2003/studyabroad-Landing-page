import Spinner from "@/components/ui/Spinner";

type PreviewSkeletonProps = {
  label: string;
};

export default function PreviewSkeleton({ label }: PreviewSkeletonProps) {
  return (
    <div
      className="flex items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12 text-sm text-slate-600"
      aria-busy="true"
      aria-label={label}
    >
      <Spinner size="sm" />
      <span>{label}</span>
    </div>
  );
}
