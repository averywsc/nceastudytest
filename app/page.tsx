import { getPages } from "@/lib/content";
import { sitePath } from "@/lib/site-path";

export default function Home() {
  const pages = getPages();
  const courses = [...new Map(pages.map(page => [
    `${page.subject}:${page.level}`,
    { subject: page.subject, level: page.level }
  ] as const)).values()];

  return (
    <div>
      <section className="rounded-2xl bg-leaf px-6 py-10 text-white sm:px-10 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">NCEA revision, made clearer</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">Revise smarter with notes that make sense.</h1>
        <p className="mt-4 max-w-xl text-lg text-white/90">Original, bite-sized explanations, worked examples and interactive diagrams. No account needed.</p>
        <a className="mt-6 inline-block rounded bg-white px-5 py-3 font-semibold text-ink hover:bg-slate-100" href="#notes">Browse revision notes</a>
      </section>

      <section id="notes" className="mt-10 scroll-mt-6">
        <h2 className="text-2xl font-bold">Revision notes</h2>
        <p className="mt-2 text-slate-700">Choose a subject and level to explore the available standards and topics.</p>
        {courses.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {courses.map(course => {
              const coursePages = pages.filter(page => page.subject === course.subject && page.level === course.level);
              const standards = [...new Map(coursePages.map(page => [
                page.standardSlug,
                { slug: page.standardSlug, title: page.standardTitle }
              ] as const)).values()];

              return (
                <section key={`${course.subject}:${course.level}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold capitalize">{course.subject} | Level {course.level}</h3>
                  <div className="mt-4 space-y-5">
                    {standards.map(standard => {
                      const standardPages = coursePages.filter(page => page.standardSlug === standard.slug);
                      const groups = [...new Set(standardPages.map(page => page.group))];

                      return (
                        <div key={standard.slug}>
                          <h4 className="font-semibold">{standard.title}</h4>
                          {groups.map(group => (
                            <div key={group} className="mt-3">
                              <h5 className="text-sm font-medium text-slate-600">{group}</h5>
                              <ul className="mt-1 space-y-2">
                                {standardPages.filter(page => page.group === group).map(page => (
                                  <li key={page.href}>
                                    <a className="font-medium text-leaf underline decoration-transparent underline-offset-4 hover:decoration-current" href={sitePath(page.href)}>{page.title}</a>
                                    <p className="text-sm text-slate-600">{page.description}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-slate-300 p-6 text-slate-600">Revision notes are being added. Please check back soon.</p>
        )}
      </section>
    </div>
  );
}
