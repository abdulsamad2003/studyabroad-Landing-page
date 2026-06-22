type PreviewEmptyStateProps = {
  message: string;
};

export default function PreviewEmptyState({ message }: PreviewEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm leading-relaxed text-slate-600">
      {message}
    </div>
  );
}
