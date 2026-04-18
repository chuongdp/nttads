"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Loader2, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function recoveryHashPresent() {
  return typeof window !== "undefined" && window.location.hash.includes("type=recovery");
}

export function ResetPasswordForm() {
  const params = useParams();
  const router = useRouter();
  const locale = typeof params?.locale === "string" ? params.locale : "vi";
  const hadRecoveryHashRef = useRef(false);
  const resolvedRef = useRef(false);

  const [phase, setPhase] = useState<"loading" | "ready" | "invalid">("loading");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    hadRecoveryHashRef.current = recoveryHashPresent();
    let cancelled = false;

    function markReady() {
      if (resolvedRef.current) return;
      resolvedRef.current = true;
      setPhase("ready");
    }

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      if (event === "PASSWORD_RECOVERY") {
        markReady();
        return;
      }
      if (event === "SIGNED_IN" && session && hadRecoveryHashRef.current) {
        markReady();
      }
    });

    void (async () => {
      for (let i = 0; i < 12; i++) {
        if (cancelled || resolvedRef.current) return;
        const { data: s } = await supabase.auth.getSession();
        if (s.session && recoveryHashPresent()) {
          markReady();
          return;
        }
        await new Promise((r) => setTimeout(r, 350));
      }
      if (!cancelled && !resolvedRef.current) setPhase("invalid");
    })();

    return () => {
      cancelled = true;
      data.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    await supabase.auth.signOut();
    router.push(`/${locale}/admin`);
    router.refresh();
  }

  if (phase === "loading") {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-8">
        <div className="flex items-center gap-2 text-sm text-[var(--body-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          Validating recovery link…
        </div>
      </section>
    );
  }

  if (phase === "invalid") {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">Invalid or expired link</h1>
        <p className="mt-2 text-sm text-[var(--body-muted)]">
          Open the latest link from your email, or request a new reset from the forgot password page.
        </p>
        <p className="mt-4 text-sm">
          <Link href={`/${locale}/admin/forgot-password`} className="font-medium text-primary underline-offset-4 hover:underline">
            Request new link
          </Link>
          {" · "}
          <Link href={`/${locale}/admin`} className="font-medium text-primary underline-offset-4 hover:underline">
            Admin login
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-[var(--surface-nested)] p-6">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">Set new password</h1>
      <p className="mt-2 text-sm text-[var(--body-muted)]">Choose a strong password for your admin account.</p>

      <form onSubmit={onSubmit} className="mt-4 grid max-w-md gap-4">
        <div className="space-y-2">
          <Label htmlFor="np-password">New password</Label>
          <Input id="np-password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="np-confirm">Confirm password</Label>
          <Input
            id="np-confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>
        <Button disabled={loading} type="submit">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              Update password
            </>
          )}
        </Button>
        {message && <p className="text-sm text-[#E41E3F] dark:text-[#ff7b91]">{message}</p>}
      </form>
    </section>
  );
}
