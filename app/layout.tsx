import "./globals.css";
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";
export const metadata = { title: "Akoha | NCEA revision notes", description: "Bite-sized NCEA and Scholarship revision notes.", openGraph: { locale: "en_NZ" } };
export default function Root({ children }: { children: ReactNode }) {
  return (<html lang="en-NZ"><body className="text-ink">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:p-2 focus:bg-white">Skip to content</a>
    <header className="p-4 bg-leaf text-white"><a href="/" className="font-bold">Akoha</a></header>
    <main id="main" className="mx-auto max-w-3xl p-4">{children}</main>
    <footer className="p-4 text-sm border-t"><p>Akoha is an independent study resource and is not affiliated with or endorsed by NZQA. Official papers: <a className="underline" href="https://www.nzqa.govt.nz">nzqa.govt.nz</a>.</p></footer>
  </body></html>);
}
