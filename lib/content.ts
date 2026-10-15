import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
export type Page = { subject: string; level: number; as: string; standardSlug: string; standardTitle: string; groupSlug: string; group: string; slug: string; title: string; description: string; order: number; href: string; body: string };
const ROOT = path.join(process.cwd(), "content");
function walk(d: string): string[] {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".mdx") ? [path.join(d, e.name)] : []);
}
export function parsePage(src: string): Page {
  const { data: f, content } = matter(src);
  const level = Number(f.level);
  return { subject: f.subject, level, as: f.as, standardSlug: f.standardSlug, standardTitle: f.standardTitle, groupSlug: f.groupSlug, group: f.group, slug: f.slug, title: f.title, description: f.description, order: Number(f.order ?? 0), body: content,
    href: `/subjects/${f.subject}/${level}/${f.standardSlug}/${f.groupSlug}/${f.slug}` };
}
export function getPages(root = ROOT): Page[] {
  if (!fs.existsSync(root)) return [];
  return walk(root).map(f => parsePage(fs.readFileSync(f, "utf8"))).sort((a, b) => a.subject.localeCompare(b.subject) || a.level - b.level || a.standardSlug.localeCompare(b.standardSlug) || a.order - b.order);
}
/** Pages in the same subject and level, in reading order. */
export function neighbours(all: Page[], p: Page) {
  const s = all.filter(x => x.subject === p.subject && x.level === p.level);
  const i = s.findIndex(x => x.href === p.href);
  return { prev: s[i - 1] ?? null, next: s[i + 1] ?? null };
}
export function tree(all: Page[], subject: string, level: number) {
  const out: Record<string, { as: string; title: string; groups: Record<string, Page[]> }> = {};
  for (const p of all.filter(x => x.subject === subject && x.level === level)) {
    const s = (out[p.standardSlug] ??= { as: p.as, title: p.standardTitle, groups: {} });
    (s.groups[p.group] ??= []).push(p);
  }
  return out;
}
