"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Loader2, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCmsDictionary } from "@/context/cms-dictionary-context";
import type { Locale } from "@/lib/i18n";

function recoveryHashPresent() {
  return typeof window !== "undefined" && window.location.hash.includes("type=recovery");
}

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const cmsLocale = (typeof params.locale === "string" ? params.locale : "vi") as Locale;
  const cmsBase = `/${cmsLocale}/cms`;
  const t = useCmsDictionary().reset;

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
      setMessage(t.minPassword);
      return;
    }
    if (password !== confirm) {
      setMessage(t.passwordMismatch);
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
    router.push(`${cmsBase}/dashboard`);
    router.refresh();
  }

  if (phase === "loading") {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-8">
        <div className="flex items-center gap-2 text-sm text-[var(--body-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t.validating}
        </div>
      </section>
    );
  }

  if (phase === "invalid") {
    return (
      <section className="rounded-xl bg-[var(--surface-nested)] p-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">{t.invalidTitle}</h1>
        <p className="mt-2 text-sm text-[var(--body-muted)]">{t.invalidHint}</p>
        <p className="mt-4 text-sm">
          <Link href={`${cmsBase}/forgot-password`} className="font-medium text-primary underline-offset-4 hover:underline">
            {t.requestNew}
          </Link>
          {" · "}
          <Link href={`${cmsBase}/dashboard`} className="font-medium text-primary underline-offset-4 hover:underline">
            {t.adminLogin}
          </Link>
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl bg-[var(--surface-nested)] p-6">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">{t.setTitle}</h1>
      <p className="mt-2 text-sm text-[var(--body-muted)]">{t.setHint}</p>

      <form onSubmit={onSubmit} className="mt-4 grid max-w-md gap-4">
        <div className="space-y-2">
          <Label htmlFor="np-password">{t.newPassword}</Label>
          <Input id="np-password" name="password" type="password" autoComplete="new-password" required minLength={8} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="np-confirm">{t.confirmPassword}</Label>
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
              {t.saving}
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              {t.updatePassword}
            </>
          )}
        </Button>
        {message && <p className="text-sm text-[#E41E3F] dark:text-[#ff7b91]">{message}</p>}
      </form>
    </section>
  );
}
