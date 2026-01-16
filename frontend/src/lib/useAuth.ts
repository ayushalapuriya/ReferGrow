"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, readApiBody } from "@/lib/apiClient";
import { useAppDispatch } from "@/store/hooks";
import { setUserProfile } from "@/store/slices/userSlice";

export function useAuth(options?: { requireAdmin?: boolean }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch("/api/me");
        
        if (!res.ok) {
          // Unauthorized - redirect to login
          router.push("/login?redirect=" + window.location.pathname);
          return;
        }

        const body = await readApiBody(res);
        
        // Handle both JSON and text responses
        let data: any;
        if (body.json) {
          data = body.json as any;
          if (!data || !data.user) {
            // Check if this is an error response
            if (data.error) {
              // This is expected for unauthenticated users
              dispatch(setUserProfile(null));
              router.push("/login?redirect=" + window.location.pathname);
              return;
            }
            throw new Error("Invalid response: missing user data");
          }
          dispatch(setUserProfile(data.user));
        } else {
          throw new Error(body.text ?? "Invalid response: not JSON");
        }
        
        // Check if admin is required
        if (options?.requireAdmin && data.user?.role !== "admin") {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(setUserProfile(null));
        router.push("/login?redirect=" + window.location.pathname);
      }
    };

    checkAuth();
  }, [router, options?.requireAdmin, dispatch]);
}
