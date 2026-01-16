export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Contact
        </h1>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Questions about services or referrals? Reach us at
          <span className="font-semibold"> support@refergrow.com</span>.
        </p>
        <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Hours</div>
          <div className="mt-1 font-semibold text-zinc-900 dark:text-zinc-100">
            Mon–Sat, 10:00–18:00 IST
          </div>
        </div>
      </div>
    </div>
  );
}
