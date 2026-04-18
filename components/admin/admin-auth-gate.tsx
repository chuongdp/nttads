"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

type AdminAuthGateProps = {
  children: React.ReactNode;
};

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "vi";
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function bootstrapAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data.session);
      }
      setChecking(false);
    }

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

    void bootstrapAuth();

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function onSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
    } else {
      setMessage("Login successful.");
    }

    setLoading(false);
  }

  async function onSignOut() {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`Logout failed: ${error.message}`);
    }
    setLoading(false);
  }

  if (checking) {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking admin session...
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-6">
        <h2 className="text-xl font-semibold">Admin Login</h2>
        <p className="mt-1 text-sm text-slate-500">
          Sign in with your Supabase account to access CMS settings.
        </p>

        <form onSubmit={onSignIn} className="mt-4 grid max-w-md gap-3">
          <input
            name="email"
            type="email"
            placeholder="admin@company.com"
            required
            className="rounded-md border bg-transparent px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="rounded-md border bg-transparent px-3 py-2"
          />
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
          <p className="text-sm">
            <Link
              href={`/${locale}/admin/forgot-password`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
          {message && <p className="text-sm text-slate-500">{message}</p>}
        </form>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl bg-[var(--surface-nested)] p-4">
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">
            Logged in as <span className="font-medium text-foreground">{session.user.email}</span>
          </p>
          <Button variant="outline" onClick={onSignOut} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </section>
      {children}
    </div>
  );
}
