'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NetworkDetails } from '@/features/dashboard/components/scan/findings/network/NetworkDetails';
import { Loader2 } from 'lucide-react';

function NetworkDetailsContent() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const findingId = searchParams.get('findingId');
  const backHref = scanId
    ? `/scan/report/findings/network?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/network';

  return <NetworkDetails backHref={backHref} scanId={scanId} findingId={findingId} />;
}

export default function NetworkDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <NetworkDetailsContent />
    </Suspense>
  );
}