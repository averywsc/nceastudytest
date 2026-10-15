import { describe, it, expect } from "vitest";
import { parsePage, neighbours } from "./content";
import { toggle, percent, merge } from "./progress";
const mk = (slug: string, order: number) => parsePage(`---\nsubject: physics\nlevel: 3\nas: AS91523\nstandardSlug: mechanics\nstandardTitle: Mechanics\ngroupSlug: osc\ngroup: Oscillations\nslug: ${slug}\ntitle: ${slug}\ndescription: d\norder: ${order}\n---\nbody`);
describe("content", () => {
  it("builds hrefs and neighbours", () => {
    const a = mk("a", 1), b = mk("b", 2);
    expect(a.href).toBe("/subjects/physics/3/mechanics/osc/a/");
    expect(neighbours([a, b], a).next?.slug).toBe("b");
    expect(neighbours([a, b], a).prev).toBeNull();
  });
});
describe("progress", () => {
  it("toggles, merges, computes percent", () => {
    expect(toggle(toggle([], "x"), "x")).toEqual([]);
    expect(merge(["a"], ["a", "b"])).toEqual(["a", "b"]);
    expect(percent(1, 4)).toBe(25);
    expect(percent(0, 0)).toBe(0);
  });
});
