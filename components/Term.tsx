import glossary from "@/content/glossary.json";
export default function Term({ t, children }: { t: string; children: React.ReactNode }) {
  const def = (glossary as Record<string, string>)[t] ?? "";
  return (<span className="group relative underline decoration-dotted" tabIndex={0}>{children}
    <span role="tooltip" className="hidden group-hover:block group-focus:block absolute z-10 left-0 top-full w-56 p-2 text-sm bg-ink text-white rounded">{def}</span></span>);
}
