import { describe, it, expect } from "vitest";
import { extractTocItems } from "./toc";

describe("extractTocItems", () => {
  it("returns empty when container has no headings", () => {
    const container = document.createElement("div");
    expect(extractTocItems(container)).toEqual([]);
  });

  it("collects h2 and h3 with id + textContent + level", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <h2 id="intro">Intro</h2>
      <p>body</p>
      <h3 id="detail">Detail</h3>
      <h2 id="end">End</h2>
    `;
    expect(extractTocItems(container)).toEqual([
      { id: "intro", title: "Intro", level: 2 },
      { id: "detail", title: "Detail", level: 3 },
      { id: "end", title: "End", level: 2 },
    ]);
  });

  it("skips headings with no id", () => {
    const container = document.createElement("div");
    container.innerHTML = `<h2>NoId</h2><h2 id="ok">Ok</h2>`;
    expect(extractTocItems(container)).toEqual([
      { id: "ok", title: "Ok", level: 2 },
    ]);
  });

  it("trims whitespace in titles", () => {
    const container = document.createElement("div");
    container.innerHTML = `<h2 id="x">  Spaced  </h2>`;
    expect(extractTocItems(container)).toEqual([
      { id: "x", title: "Spaced", level: 2 },
    ]);
  });
});
