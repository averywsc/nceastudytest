import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getPages, neighbours } from "@/lib/content";
import SHMDiagram from "@/components/SHMDiagram";
import Term from "@/components/Term";
import { sitePath } from "@/lib/site-path";
type P = { subject: string; level: string; standard: string; group: string; page: string };
const href = (q: P) => `/subjects/${q.subject}/${q.level}/${q.standard}/${q.group}/${q.page}/`;
export function generateStaticParams() {
  return getPages().map(p => ({ subject: p.subject, level: String(p.level), standard: p.standardSlug, group: p.groupSlug, page: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<P> }) {
  const route = await params;
  const p = getPages().find(x => x.href === href(route));
  return p ? { title: `${p.title}, ${p.subject} Level ${p.level} | Akoha`, description: p.description, alternates: { canonical: sitePath(p.href) }, openGraph: { type: "article", locale: "en_NZ" } } : {};
}
export default async function Note({ params }: { params: Promise<P> }) {
  const route = await params;
  const all = getPages();
  const p = all.find(x => x.href === href(route));
  if (!p) notFound();
  const { prev, next } = neighbours(all, p);
  return (
    <article className="mx-auto max-w-3xl">
      <a className="text-sm font-medium text-leaf underline" href={sitePath("/")}>All revision notes</a>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-600">{p.subject} · Level {p.level} · {p.group}</p>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{p.title}</h1>
      <p className="mt-3 text-lg text-slate-700">{p.description}</p>
      <div className="prose-content mt-8">
        <MDXRemote source={p.body} components={{ SHMDiagram, Term }} options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }} />
      </div>
      <nav aria-label="Other revision notes" className="mt-10 flex justify-between gap-4 border-t border-slate-200 pt-5">
        {prev ? <a className="font-medium text-leaf underline" href={sitePath(prev.href)}>Previous: {prev.title}</a> : <span />}
        {next ? <a className="text-right font-medium text-leaf underline" href={sitePath(next.href)}>Next: {next.title}</a> : <span />}
      </nav>
    </article>
  );
}
