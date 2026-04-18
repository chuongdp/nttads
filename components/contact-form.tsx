"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service_interested: String(formData.get("service_interested") ?? ""),
      status: "new",
    };

    const { error } = await supabase.from("leads").insert(payload);
    if (error) {
      setMessage("Submit failed. Please try again.");
    } else {
      setMessage("Lead submitted successfully.");
      event.currentTarget.reset();
    }
    setLoading(false);
  }

  const selectClass = cn(
    "flex h-11 w-full rounded-lg border border-[var(--input-border)] bg-[var(--surface-card)] px-3 py-2 text-base text-[var(--foreground)] outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/25",
  );

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
    >
      <h3 className="text-lg font-semibold text-[var(--foreground)]">Contact Us</h3>
      <Input name="name" required placeholder="Name" />
      <Input name="email" required type="email" placeholder="Email" />
      <Input name="phone" placeholder="Phone" />
      <select
        name="service_interested"
        required
        className={selectClass}
        defaultValue="google-ads"
      >
        <option value="google-ads">Google Ads</option>
        <option value="facebook-ads">Facebook Ads</option>
        <option value="tiktok-ads">TikTok Ads</option>
        <option value="seo">SEO</option>
      </select>
      <Button disabled={loading} type="submit">
        {loading ? "Submitting..." : "Submit Lead"}
      </Button>
      {message && (
        <p className="text-sm text-[var(--body-muted)]">{message}</p>
      )}
    </form>
  );
}
