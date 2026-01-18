"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, readApiBody } from "@/lib/apiClient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUserProfile } from "@/store/slices/userSlice";

export function useAuth(options?: { requireAdmin?: boolean }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((s) => s.user.profile);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch("/api/me");
        
        if (!res.ok) {
          // Only redirect if we don't already have a user (from localStorage)
          if (!currentUser) {
            router.push("/login?redirect=" + window.location.pathname);
          }
          return;
        }

        const body = await readApiBody(res);
        
        // Handle both JSON and text responses
        let data: { user?: any; error?: string } | undefined;
        if (body.json) {
          data = body.json as { user?: any; error?: string };
          if (!data || !data.user) {
            // Check if this is an error response
            if (data.error) {
              // Only clear user if we don't already have one
              if (!currentUser) {
                dispatch(setUserProfile(null));
                router.push("/login?redirect=" + window.location.pathname);
              }
              return;
            }
            throw new Error("Invalid response: missing user data");
          }
          // Only update user if we don't already have one or if it's different
          if (!currentUser || JSON.stringify(currentUser) !== JSON.stringify(data.user)) {
            dispatch(setUserProfile(data.user));
          }
        } else {
          throw new Error(body.text ?? "Invalid response: not JSON");
        }
        
        // Check if admin is required
        if (options?.requireAdmin && data.user?.role !== "admin") {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Only clear user if we don't already have one
        if (!currentUser) {
          dispatch(setUserProfile(null));
          router.push("/login?redirect=" + window.location.pathname);
        }
      }
    };

    checkAuth();
  }, [router, options?.requireAdmin, dispatch, currentUser]);
}
