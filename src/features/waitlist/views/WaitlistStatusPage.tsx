"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { waitlistService, WaitlistStatusResponse } from "../services/waitlist.services";
import { Loader2, Search, Trash2 } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export function WaitlistStatusPage() {
  const [statusData, setStatusData] = useState<WaitlistStatusResponse | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onCheckStatus = async (data: EmailFormValues) => {
    setIsChecking(true);
    setErrorMsg("");
    setSuccessMsg("");
    setStatusData(null);
    try {
      const response = await waitlistService.status(data.email);
      if (response.isSuccess && response.value) {
        setStatusData(response.value);
      } else {
        setErrorMsg(response.error?.message || "Email not found on waitlist.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred while checking status.");
    } finally {
      setIsChecking(false);
    }
  };

  const onCancelWaitlist = async () => {
    if (!statusData) return;
    
    if (!window.confirm("Are you sure you want to cancel your waitlist entry? This action cannot be undone.")) {
      return;
    }

    setIsCanceling(true);
    setErrorMsg("");
    setSuccessMsg("");
    
    try {
      const response = await waitlistService.cancel({ email: statusData.email });
      if (response.isSuccess) {
        setSuccessMsg("Your waitlist entry has been cancelled.");
        setStatusData(null);
      } else {
        setErrorMsg(response.error?.message || "Failed to cancel waitlist entry.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred while cancelling.");
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 bg-brand-bg-light">
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Check Waitlist Status</h1>
        <p className="text-lg text-brand-gray">Enter your email address below to see your current place in the queue.</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm w-full max-w-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCheckStatus)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-brand-dark font-semibold text-base">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@company.com" 
                      className="h-14 rounded-xl border-gray-200 text-base placeholder:text-brand-gray px-4" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {errorMsg && (
              <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
            )}
            
            {successMsg && (
              <p className="text-green-600 text-sm font-medium">{successMsg}</p>
            )}

            <Button 
              type="submit" 
              disabled={isChecking}
              className="h-14 w-full rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-semibold"
            >
              {isChecking ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
              {isChecking ? "Checking..." : "Check Status"}
            </Button>
          </form>
        </Form>

        {statusData && (
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="text-sm font-semibold text-brand-gray uppercase tracking-wider">Your Position</span>
              <div className="text-5xl font-bold text-brand-dark my-2">#{statusData.position}</div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                Status: {statusData.status}
              </div>
            </div>
            
            <p className="text-sm text-brand-gray mb-8">
              Registered on: {new Date(statusData.createdAt).toLocaleDateString()}
            </p>

            <Button 
              variant="outline" 
              onClick={onCancelWaitlist}
              disabled={isCanceling}
              className="w-full h-12 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl"
            >
              {isCanceling ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              {isCanceling ? "Canceling..." : "Cancel Waitlist Entry"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
