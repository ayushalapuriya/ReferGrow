"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiClient";

export function useAuth(options?: { requireAdmin?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiFetch("/api/me");
        
        if (!res.ok) {
          // Unauthorized - redirect to login
          router.push("/login?redirect=" + window.location.pathname);
          return;
        }

        const data = await res.json();
        
        // Check if admin is required
        if (options?.requireAdmin && data.user?.role !== "admin") {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login?redirect=" + window.location.pathname);
      }
    };

    checkAuth();
  }, [router, options?.requireAdmin]);
}
