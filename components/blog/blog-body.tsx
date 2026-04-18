import type { BlogBlock } from "@/lib/blog-data";

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-5 text-[var(--body-muted)]">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2
              key={i}
              className={`text-xl font-semibold tracking-tight text-[var(--foreground)] ${i > 0 ? "mt-10 border-t border-[var(--border)] pt-10" : "mt-2"}`}
            >
              {b.text}
            </h2>
          );
        }
        if (b.type === "p") {
          return (
            <p key={i} className="leading-relaxed">
              {b.text}
            </p>
          );
        }
        return (
          <ul key={i} className="list-inside list-disc space-y-2 pl-1 leading-relaxed">
            {b.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
