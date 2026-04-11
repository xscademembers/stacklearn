"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid password");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-soft px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Image
            src="https://storage.googleapis.com/new_client_files/stack%20learn/StackLearn%20-%20%E1%8F%9A%E1%B4%80%C9%AA%20%EA%80%A4%E1%B4%84%E1%B4%8F%C9%B4!!.png"
            alt="Stack Learn"
            width={160}
            height={50}
            className="h-12 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-foreground-muted text-sm mt-1">
            Use the value of{" "}
            <code className="text-xs bg-page-soft px-1 rounded">ADMIN_PASSWORD</code> in{" "}
            <code className="text-xs bg-page-soft px-1 rounded">.env.local</code> (must match exactly).
            Forms need{" "}
            <code className="text-xs bg-page-soft px-1 rounded">MONGODB_URI</code> in the same file.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-strong transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
