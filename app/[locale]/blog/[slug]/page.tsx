import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog/blog-body";
import {
  blogIndexCopy,
  blogSlugs,
  formatBlogDate,
  getBlogPost,
} from "@/lib/blog-data";
import { dictionaries, isSupportedLocale, type Locale } from "@/lib/i18n";

type BlogArticleProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const paths: { locale: Locale; slug: string }[] = [];
  for (const locale of ["vi", "en", "zh"] as const) {
    for (const slug of blogSlugs) {
      paths.push({ locale, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: BlogArticleProps) {
  const { locale: loc, slug } = await params;
  if (!isSupportedLocale(loc)) return { title: "Blog" };
  const locale = loc as Locale;
  const post = getBlogPost(locale, slug);
  if (!post) return { title: "Blog" };
  const brand = dictionaries[locale].brand;
  return { title: `${post.title} | ${brand}` };
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { locale: loc, slug } = await params;
  if (!isSupportedLocale(loc)) notFound();

  const locale = loc as Locale;
  const dict = dictionaries[locale];
  const idx = blogIndexCopy[locale];
  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-[var(--body-muted)]">
        <Link href={`/${locale}`} className="text-primary hover:underline">
          {dict.nav.home}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <Link href={`/${locale}/blog`} className="text-primary hover:underline">
          {dict.nav.blog}
        </Link>
        <span className="mx-2 text-[var(--secondary-text)]">/</span>
        <span className="line-clamp-1 text-[var(--foreground)]">{post.title}</span>
      </nav>

      <header className="mt-8">
        <time className="text-sm font-medium text-[var(--secondary-text)]" dateTime={post.date}>
          {idx.published} {formatBlogDate(post.date, locale)} · {post.readMinutes} {idx.minRead}
        </time>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-[2rem] md:leading-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--body-muted)]">{post.excerpt}</p>
      </header>

      <div className="mt-10">
        <BlogBody blocks={post.blocks} />
      </div>

      <p className="mt-14">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          ← {dict.nav.blog}
        </Link>
      </p>
    </article>
  );
}
