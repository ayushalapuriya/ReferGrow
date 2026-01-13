"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

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
      <div className="flex flex-wrap items-center gap-3 glass-panel rounded-xl border border-purple-200 dark:border-purple-500/30 p-4 transition-all hover:scale-105 hover:shadow-lg">
        <span className={`rounded-lg bg-gradient-to-br ${colorClass} px-3 py-1 text-xs font-bold text-white shadow-md`}>
          Level {depth}
        </span>
        <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{node.email}</span>
        <span className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 font-mono">
          {node.referralCode}
        </span>
        {node.children.length > 0 && (
          <span className="ml-auto text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold">
            {node.children.length} {node.children.length === 1 ? 'referral' : 'referrals'}
          </span>
        )}
      </div>
      {node.children.length > 0 ? (
        <div className="ml-6 mt-2 border-l-2 border-purple-300 dark:border-purple-500/30 pl-6">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Referral Network
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Visualize your binary tree structure and network growth
            </p>
          </div>
          <Link 
            className="glass-panel animate-slide-in rounded-xl px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 hover:shadow-lg border border-purple-200 dark:border-purple-500/30" 
            href="/dashboard"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error ? (
          <div className="glass-panel animate-shake rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300 mb-6">
            ⚠️ {error}
          </div>
        ) : null}

        {tree ? (
          <div className="glass-panel animate-fade-in rounded-2xl border border-purple-200 dark:border-purple-500/30 p-6 shadow-2xl" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl">
                🌳
              </div>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Your Network Tree</h2>
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
