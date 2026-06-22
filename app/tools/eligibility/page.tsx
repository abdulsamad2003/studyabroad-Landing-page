import { getDomainConfig } from "@/config";
import DomainToolPage from "@/components/tools/DomainToolPage";

export default async function EligibilityPage() {
  const config = await getDomainConfig();

  return (
    <main>
      <DomainToolPage config={config} toolKey="eligibility" />
    </main>
  );
}
