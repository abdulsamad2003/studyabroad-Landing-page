import Spinner from "@/components/ui/Spinner";

export default function ExploreProviderLoading() {
  return (
    <main className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-24 text-sm text-slate-600">
      <Spinner size="sm" />
      <span>Loading provider details...</span>
    </main>
  );
}
