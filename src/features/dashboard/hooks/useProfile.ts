"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useCallback, useEffect, useState } from "react";
import {
  profileService,
  type ProfileValue,
  type UpdateProfilePayload,
} from "../services/profile.service";
import { useAuthStore } from "@/store/auth.store";

type UseProfileResult = {
  profile: ProfileValue | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  update: (payload: UpdateProfilePayload) => Promise<ProfileValue>;
};

export const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<ProfileValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const nextProfile = await profileService.getProfile();
      setProfile(nextProfile);
      
      // Sync the loaded profile picture with the global auth state for the Header
      if (nextProfile.profilePictureUrl) {
        const { firstName, lastName, updateProfile } = useAuthStore.getState();
        updateProfile(firstName, lastName, nextProfile.profilePictureUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (payload: UpdateProfilePayload) => {
    const updated = await profileService.updateProfile(payload);
    setProfile(updated);
    return updated;
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    profile,
    loading,
    error,
    refetch: load,
    update,
  };
};
