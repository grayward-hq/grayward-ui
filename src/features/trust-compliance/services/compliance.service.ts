import { privateApi } from "@/lib/axios";
import type { 
  OwaspComplianceResponse, 
  MonitoredEmail, 
  ApiResponse 
} from "../types/compliance.types";

function unwrap<T>(res: { data: ApiResponse<T>; status: number }): T {
  if (!res.data.isSuccess || !res.data.value) {
    const msg = res.data.error?.message ?? "Request failed";
    const err = new Error(msg) as Error & { response?: { status: number } };
    err.response = { status: res.status };
    throw err;
  }
  return res.data.value;
}

export const complianceService = {
  async getOwaspCompliance(domainId: string): Promise<OwaspComplianceResponse> {
    const res = await privateApi.get<ApiResponse<OwaspComplianceResponse>>(`/api/compliance/domains/${domainId}/owasp`);
    return unwrap(res);
  },

  async downloadReportPdf(domainId: string): Promise<void> {
    const res = await privateApi.get(`/api/compliance/domains/${domainId}/report/pdf`, {
      responseType: 'blob',
    });
    // Handle the blob download
    const url = window.URL.createObjectURL(new Blob([res.data as BlobPart]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `compliance_report_${domainId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  async getMonitoredEmails(domainId: string): Promise<MonitoredEmail[]> {
    const res = await privateApi.get<ApiResponse<MonitoredEmail[]>>(`/api/compliance/monitored-emails/${domainId}`);
    return unwrap(res);
  },

  async addMonitoredEmail(domainId: string, email: string): Promise<MonitoredEmail> {
    const res = await privateApi.post<ApiResponse<MonitoredEmail>>(`/api/compliance/monitored-emails?domainId=${domainId}`, { email });
    return unwrap(res);
  },

  async deleteMonitoredEmail(domainId: string, emailId: string): Promise<{ message: string }> {
    const res = await privateApi.delete<ApiResponse<{ message: string }>>(`/api/compliance/monitored-emails/${emailId}?domainId=${domainId}`);
    return unwrap(res);
  }
};
