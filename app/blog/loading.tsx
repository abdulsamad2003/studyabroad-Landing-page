import Spinner from "@/components/ui/Spinner";

export default function BlogLoading() {
  return (
    <main className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-4 py-24 text-sm text-slate-600">
      <Spinner size="sm" />
      <span>Loading blog...</span>
    </main>
  );
}
