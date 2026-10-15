import "./globals.css";
import "katex/dist/katex.min.css";
import type { ReactNode } from "react";
import { sitePath } from "@/lib/site-path";

export const metadata = {
  title: "Akoha | NCEA revision notes",
  description: "Bite-sized NCEA and Scholarship revision notes.",
  openGraph: { locale: "en_NZ" }
};

export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en-NZ">
      <body className="flex min-h-screen flex-col text-ink">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-20 focus:bg-white focus:p-2">Skip to content</a>
        <header className="bg-leaf px-4 py-4 text-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <a href={sitePath("/")} className="text-xl font-bold">Akoha</a>
            <a href={sitePath("/#notes")} className="font-medium underline underline-offset-4">Browse notes</a>
          </div>
        </header>
        <main id="main" className="mx-auto w-full max-w-5xl flex-1 p-4 py-8 sm:py-10">{children}</main>
        <footer className="border-t bg-white px-4 py-5 text-sm text-slate-700">
          <p className="mx-auto max-w-5xl">Akoha is an independent study resource and is not affiliated with or endorsed by NZQA. Official papers: <a className="font-medium underline" href="https://www.nzqa.govt.nz">nzqa.govt.nz</a>.</p>
        </footer>
      </body>
    </html>
  );
}
