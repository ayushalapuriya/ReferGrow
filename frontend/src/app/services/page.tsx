import { apiUrl } from "@/lib/apiClient";

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
    const res = await fetch(apiUrl("/api/services"), {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services as Service[];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="animate-fade-in text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Each service generates Business Volume (BV) that powers your income stream. Choose the right service to grow your network.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <div 
              key={s._id} 
              className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 transition-all hover:scale-105 hover:shadow-2xl"
              style={{animationDelay: `${idx * 0.1}s`}}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl">
                  ⭐
                </div>
                <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">{s.name}</h3>
              </div>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200 dark:border-green-500/30">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Price</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${s.price}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-500/30">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Business Volume</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {s.businessVolume} BV
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-500/30">
                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span>Active & Available</span>
                </div>
              </div>
            </div>
          ))}
          
          {services.length === 0 ? (
            <div className="col-span-full glass-panel rounded-2xl border border-purple-200 dark:border-purple-500/30 p-12 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-4xl mb-4">
                📦
              </div>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                No services available at the moment. Check back soon!
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-12 glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-8 text-center" style={{animationDelay: '0.3s'}}>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Purchase services from your dashboard to start generating Business Volume and earning income!
          </p>
          <a 
            href="/dashboard"
            className="inline-block rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
