import Link from "next/link";
import { ForgotPasswordForm } from "@/components/admin/forgot-password-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminForgotPasswordPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <p className="mb-6 text-sm text-[var(--body-muted)]">
        <Link href={`/${locale}/admin`} className="font-medium text-primary underline-offset-4 hover:underline">
          ← Admin
        </Link>
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
