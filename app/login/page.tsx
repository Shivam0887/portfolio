"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 size-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-secondary/5 blur-[100px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl font-medium font-sans">Admin Access</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-black/5 rounded-[32px] p-8 md:p-10 shadow-xl shadow-black/2">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1"
              >
                Email
              </Label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground ml-1"
              >
                Password
              </Label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-black text-white hover:bg-black/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-black/10 group"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/60">
            Encrypted Session
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
