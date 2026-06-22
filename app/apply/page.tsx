import { getDomainConfig } from "@/config";
import LeadForm from "@/components/sections/LeadForm";

export default async function ApplyPage() {
  const config = await getDomainConfig();

  return (
    <main>
      <LeadForm config={config} />
    </main>
  );
}
