export type Done = string[]; // page hrefs
export const toggle = (d: Done, href: string): Done => d.includes(href) ? d.filter(x => x !== href) : [...d, href];
export const percent = (done: number, total: number) => total === 0 ? 0 : Math.round((done / total) * 100);
/** Sign-in sync: union of local and server progress. */
export const merge = (a: Done, b: Done): Done => [...new Set([...a, ...b])];
const KEY = "akoha:done";
export function load(): Done { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; } }
export function save(d: Done) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} }
