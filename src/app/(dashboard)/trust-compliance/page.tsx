import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import TrustCompliancePage from "@/features/trust-compliance/components/TrustCompliancePage";

export default function TrustComplianceRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
        </div>
      }
    >
      <TrustCompliancePage />
    </Suspense>
  );
}
