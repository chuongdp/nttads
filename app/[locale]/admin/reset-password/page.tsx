import Link from "next/link";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminResetPasswordPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <p className="mb-6 text-sm text-[var(--body-muted)]">
        <Link href={`/${locale}/admin`} className="font-medium text-primary underline-offset-4 hover:underline">
          ← Admin
        </Link>
      </p>
      <ResetPasswordForm />
    </div>
  );
}
