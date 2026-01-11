"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            router.push("/admin");
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Invalid email or password");
          },
        }
      );
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center p-6 selection:bg-amber-300/20 selection:text-amber-100 relative">
      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-amber-500/[0.03] blur-[150px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute left-0 bottom-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/[0.08] bg-white/[0.02] mb-4"
          >
            <Shield className="size-4 text-amber-300/60" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              Secure Access
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black tracking-[-0.04em] uppercase leading-[0.9]">
            Admin
          </h1>
          <p className="text-white/40 text-sm font-light">
            Enter your credentials to access the management console
          </p>
        </div>

        {/* Login Form Card */}
        <div className="border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 relative overflow-hidden">
          {/* Form hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/[0.02] to-transparent pointer-events-none" />

          <form onSubmit={handleLogin} className="relative space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-white text-black font-bold uppercase text-sm tracking-tight hover:bg-amber-300 transition-all group rounded-none"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center flex items-center justify-center gap-3"
        >
          <div className="size-1 rounded-full bg-amber-400/50" />
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
            Encrypted Session • TLS 1.3
          </p>
          <div className="size-1 rounded-full bg-amber-400/50" />
        </motion.div>
      </motion.div>
    </main>
  );
}
