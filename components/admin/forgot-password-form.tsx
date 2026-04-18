"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "vi";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    const origin = window.location.origin;
    const redirectTo = `${origin}/${locale}/admin/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    setSent(true);
    setMessage(
      "If an account exists for this email, you will receive a reset link shortly. Check spam folder.",
    );
    form.reset();
  }

  return (
    <section className="rounded-xl bg-[var(--surface-nested)] p-6">
      <h1 className="text-xl font-semibold text-[var(--foreground)]">Forgot password</h1>
      <p className="mt-2 text-sm text-[var(--body-muted)]">
        Enter your admin email. Supabase will send a recovery link. In the Supabase Dashboard, add this exact URL pattern
        to <strong className="text-[var(--foreground)]">Authentication → URL Configuration → Redirect URLs</strong> (e.g.{" "}
        <code className="rounded bg-[var(--surface-nested)] px-1.5 py-0.5 text-xs">
          http://localhost:3000/{locale}/admin/reset-password
        </code>{" "}
        for local dev, plus your production URL) or the email link will not work.
      </p>

      {sent ? (
        <p className="mt-4 text-sm text-[var(--body-muted)]">{message}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 grid max-w-md gap-4">
          <div className="space-y-2">
            <Label htmlFor="fp-email">Email</Label>
            <Input id="fp-email" name="email" type="email" autoComplete="email" required placeholder="admin@company.com" />
          </div>
          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send reset link
              </>
            )}
          </Button>
          {message && !sent && <p className="text-sm text-[#E41E3F] dark:text-[#ff7b91]">{message}</p>}
        </form>
      )}

      <p className="mt-6 text-sm">
        <Link href={`/${locale}/admin`} className="font-medium text-primary underline-offset-4 hover:underline">
          ← Back to admin login
        </Link>
      </p>
    </section>
  );
}
