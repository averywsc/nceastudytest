import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getPages, neighbours } from "@/lib/content";
import SHMDiagram from "@/components/SHMDiagram";
import Term from "@/components/Term";
type P = { subject: string; level: string; standard: string; group: string; page: string };
const href = (q: P) => `/subjects/${q.subject}/${q.level}/${q.standard}/${q.group}/${q.page}`;
export function generateStaticParams() {
  return getPages().map(p => ({ subject: p.subject, level: String(p.level), standard: p.standardSlug, group: p.groupSlug, page: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<P> }) {
  const p = getPages().find(x => x.href === href(await params));
  return p ? { title: `${p.title}, ${p.subject} Level ${p.level} | Akoha`, description: p.description, alternates: { canonical: p.href }, openGraph: { type: "article", locale: "en_NZ" } } : {};
}
export default async function Note({ params }: { params: Promise<P> }) {
  const all = getPages();
  const p = all.find(x => x.href === href(await params));
  if (!p) notFound();
  const { next } = neighbours(all, p);
  return (<article>
    <p className="text-sm uppercase">Revision notes</p><h1 className="text-3xl font-bold">{p.title}</h1>
    <MDXRemote source={p.body} components={{ SHMDiagram, Term }} options={{ mdxOptions: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } }} />
    <nav className="mt-6 flex justify-between">{next ? <a className="underline" href={next.href}>Next page: {next.title}</a> : <span />}</nav>
  </article>);
}
