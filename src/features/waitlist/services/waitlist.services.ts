export interface ApiResponse<T> {
  isSuccess: boolean;
  value: T | null;
  error: {
    code: string;
    message: string;
  } | null;
}

export interface JoinWaitlistRequest {
  email: string;
  companyName?: string;
  comments?: string;
}

export interface WaitlistResponse {
  email: string;
  position: number;
  status: string;
  createdAt: string;
  emailConfirmed: boolean;
}

export interface WaitlistStatusResponse {
  email: string;
  position: number;
  status: string;
  createdAt: string;
}

export interface CancelWaitlistRequest {
  email: string;
  token?: string;
}

export const waitlistService = {
  async join(
    data: JoinWaitlistRequest,
  ): Promise<ApiResponse<WaitlistResponse>> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(`${API_BASE}/api/waitlist/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async verify(
    email: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(
      `${API_BASE}/api/waitlist/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  },

  async status(email: string): Promise<ApiResponse<WaitlistStatusResponse>> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(
      `${API_BASE}/api/waitlist/status?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  },

  async cancel(
    data: CancelWaitlistRequest,
  ): Promise<ApiResponse<{ message: string }>> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(`${API_BASE}/api/waitlist/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
