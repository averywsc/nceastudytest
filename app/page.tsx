import { getPages } from "@/lib/content";
export default function Home() {
  const p = getPages()[0];
  return (<><h1 className="text-4xl font-bold">Revise smarter for NCEA</h1>
    <p className="my-4">Original, bite-sized notes with worked examples. No account needed.</p>
    {p && <a className="underline" href={p.href}>Try a sample note: {p.title}</a>}</>);
}
