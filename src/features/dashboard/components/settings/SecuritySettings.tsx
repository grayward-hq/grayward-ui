"use client";

import { useState, type ChangeEvent } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { privateApi } from "@/lib/axios";
import { SecuritySettingsSchema } from "@/schemas";

type ChangePasswordFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

const ChangePasswordForm = ({ onSuccess, onCancel }: ChangePasswordFormProps) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const toggleShow = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const resetForm = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswords({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const result = SecuritySettingsSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await privateApi.post("/api/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmPassword,
      });
      toast.success("Password updated successfully.");
      resetForm();
      onSuccess();
    } catch (err: unknown) {
      const message =
        isAxiosError(err) ? err.response?.data?.error?.message ?? err.response?.data?.message : undefined;
      toast.error(message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (loading) return;
    resetForm();
    onCancel();
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-[#2B2B2B]">Update Password</h3>
      <p className="mt-1 text-sm text-[#666666]">
        Please enter your current password to authorize this change.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            Current Password
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showPasswords.currentPassword ? "text" : "password"}
              name="currentPassword"
              autoComplete="current-password"
              placeholder="Current password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 pr-10 text-sm text-[#2B2B2B] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => toggleShow("currentPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              aria-label={showPasswords.currentPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.currentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            New Password
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showPasswords.newPassword ? "text" : "password"}
              name="newPassword"
              autoComplete="new-password"
              placeholder="New password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 pr-10 text-sm text-[#2B2B2B] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => toggleShow("newPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              aria-label={showPasswords.newPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.newPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#2B2B2B]">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showPasswords.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-3 pr-10 text-sm text-[#2B2B2B] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => toggleShow("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280]"
              aria-label={showPasswords.confirmPassword ? "Hide password" : "Show password"}
            >
              {showPasswords.confirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-end gap-3">
        <button
          onClick={handleCancel}
          disabled={loading}
          className="min-w-[120px] rounded-lg border border-[#EDEDED] bg-white px-5 py-2.5 text-sm font-semibold text-[#666666] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex min-w-[160px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {loading ? "Updating..." : "Update password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
