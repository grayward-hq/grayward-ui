import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { complianceService } from "../services/compliance.service";
import { domainService } from "@/features/domain/services/domain.service";

import { useSearchParams } from "next/navigation";

// Internal hook to get the active domain ID for default calls
export function useActiveDomainId() {
  const searchParams = useSearchParams();
  const urlDomainId = searchParams.get("domainId");

  const { data: domainsData, isLoading } = useQuery({
    queryKey: ["domains"],
    queryFn: () => domainService.getDomains(),
  });
  
  const verifiedDomains = domainsData?.data?.filter((d) => d.status === "Verified") || [];
  
  // Use URL param if valid, otherwise fallback to the first verified domain
  const isValidUrlDomain = verifiedDomains.some(d => d.id === urlDomainId);
  const activeDomainId = isValidUrlDomain ? urlDomainId : verifiedDomains[0]?.id;

  return { activeDomainId, isLoading, verifiedDomains };
}

export function useOwaspCompliance(domainId?: string) {
  const { activeDomainId } = useActiveDomainId();
  const effectiveDomainId = domainId || activeDomainId;

  return useQuery({
    queryKey: ["compliance", "owasp", effectiveDomainId],
    queryFn: () => complianceService.getOwaspCompliance(effectiveDomainId as string),
    enabled: !!effectiveDomainId,
  });
}

export function useMonitoredEmails(domainId?: string) {
  const { activeDomainId } = useActiveDomainId();
  const effectiveDomainId = domainId || activeDomainId;

  return useQuery({
    queryKey: ["compliance", "monitored-emails", effectiveDomainId],
    queryFn: () => complianceService.getMonitoredEmails(effectiveDomainId as string),
    enabled: !!effectiveDomainId,
  });
}

export function useBrandThreats(domainId?: string) {
  const { activeDomainId } = useActiveDomainId();
  const effectiveDomainId = domainId || activeDomainId;

  return useQuery({
    queryKey: ["compliance", "brand-threats", effectiveDomainId],
    queryFn: () => complianceService.getBrandThreats(effectiveDomainId as string),
    enabled: !!effectiveDomainId,
  });
}

export function useAddMonitoredEmail() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ domainId, email }: { domainId: string; email: string }) => 
      complianceService.addMonitoredEmail(domainId, email),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["compliance", "monitored-emails", variables.domainId],
      });
    },
  });
}

export function useDeleteMonitoredEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ domainId, emailId }: { domainId: string; emailId: string }) =>
      complianceService.deleteMonitoredEmail(domainId, emailId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["compliance", "monitored-emails", variables.domainId],
      });
    },
  });
}
