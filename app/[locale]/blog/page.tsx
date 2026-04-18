import Link from "next/link";
import { notFound } from "next/navigation";
import { blogIndexCopy, formatBlogDate, getBlogPosts } from "@/lib/blog-data";
import { dictionaries, isSupportedLocale, type Locale } from "@/lib/i18n";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: BlogPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) return { title: "Blog" };
  const locale = loc as Locale;
  const idx = blogIndexCopy[locale];
  const brand = dictionaries[locale].brand;
  return { title: `${idx.title} | ${brand}` };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: loc } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = dictionaries[locale];
  const idx = blogIndexCopy[locale];
  const posts = getBlogPosts(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-[var(--body-muted)]">
        <Link href={`/${locale}`} className="text-primary hover:underline">
          {dict.nav.home}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <span className="text-[var(--foreground)]">{dict.nav.blog}</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">{idx.title}</h1>
        <p className="mt-3 leading-relaxed text-[var(--body-muted)]">{idx.intro}</p>
      </header>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition hover:border-primary/25 dark:shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
              <time className="text-xs font-medium text-[var(--secondary-text)]" dateTime={post.date}>
                {idx.published} {formatBlogDate(post.date, locale)} · {post.readMinutes} {idx.minRead}
              </time>
              <h2 className="mt-3 text-lg font-semibold leading-snug text-[var(--foreground)]">
                <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--body-muted)]">{post.excerpt}</p>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
              >
                {idx.readMore} →
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
