"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import { AlertCircle, Network, Lightbulb, Star } from "lucide-react";

type TreeNode = {
  id: string;
  email: string;
  referralCode: string;
  children: TreeNode[];
};

function NodeView({ node, depth }: { node: TreeNode; depth: number }) {
  const colors = [
    "from-purple-500 to-blue-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-purple-500",
  ];
  const colorClass = colors[depth % colors.length];

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
        <span className="rounded-md bg-blue-600 text-white px-3 py-1 text-xs font-bold">
          Level {depth}
        </span>
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{node.email}</span>
        <span className="text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-mono">
          {node.referralCode}
        </span>
        {node.children.length > 0 && (
          <span className="ml-auto text-xs px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold">
            {node.children.length} {node.children.length === 1 ? 'referral' : 'referrals'}
          </span>
        )}
      </div>
      {node.children.length > 0 ? (
        <div className="ml-6 mt-2 border-l-2 border-gray-300 dark:border-gray-700 pl-6">
          {node.children.map((c) => (
            <NodeView key={c.id} node={c} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ReferralsPage() {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/api/referrals?depth=5")
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json?.error ?? "Failed to load");
        setTree(json.tree);
      })
      .catch((e) => setError(String(e?.message ?? e)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Referral Network
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Visualize your binary tree structure and network growth
            </p>
          </div>
          <Link 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:shadow-md transition-shadow" 
            prefetch={false}
            href="/dashboard"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-sm text-red-700 dark:text-red-300 mb-6">
            ⚠️ {error}
          </div>
        ) : null}

        {tree ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Your Network Tree</h2>
            </div>
            
            <NodeView node={tree} depth={0} />
            
            <div className="mt-8 pt-6 border-t border-purple-200 dark:border-purple-500/30 flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                <strong>Note:</strong> This view shows up to 5 levels of your referral network for optimal performance. 
                Each level represents a generation in your binary tree structure.
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-purple-200 dark:border-purple-500/30 p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-4xl mb-4 animate-pulse">
              🌟
            </div>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">Loading your network...</p>
          </div>
        )}
      </div>
    </div>
  );
}
