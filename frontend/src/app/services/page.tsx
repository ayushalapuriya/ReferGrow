import { apiUrl } from "@/lib/apiClient";
import ServicesClient from "@/app/services/ServicesClient";
import { headers } from "next/headers";

export const runtime = "nodejs";

type Service = {
  _id: string;
  name: string;
  price: number;
  businessVolume: number;
  status: string;
};

async function getServices() {
  try {
    const url = apiUrl("/api/services");

    // Node.js fetch requires an absolute URL. When apiUrl() returns a same-origin
    // path ("/api/..."), we must build the current request origin.
    let absoluteUrl = url;
    if (url.startsWith("/")) {
      const h = await headers();
      const proto = h.get("x-forwarded-proto") ?? "http";
      const host = h.get("x-forwarded-host") ?? h.get("host");
      const origin = host ? `${proto}://${host}` : (process.env.NEXT_PUBLIC_API_BASE_URL ?? "");
      absoluteUrl = origin ? `${origin}${url}` : url;
    }

    const res = await fetch(absoluteUrl, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services as Service[] || [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <ServicesClient services={services} />
      </div>
    </div>
  );
}
