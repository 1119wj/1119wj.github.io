import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = new URL(process.argv[2] ?? "http://localhost:3002");
const streamingPost = "/posts/2026-08-05-streaming-locks-status-code";
const nextPost = "/posts/2026-08-06-isr-ssr-split-bloom-filter";
const barrelPost = "/posts/2026-05-11-barrel-import-self-cycle";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];

page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error" && message.text().includes("[mermaid]")) {
    errors.push(message.text());
  }
});

const expectDiagrams = async (count, label) => {
  await page.waitForFunction(
    (expected) => {
      const blocks = [...document.querySelectorAll("#post-body pre.mermaid")];
      return blocks.length === expected &&
        blocks.every((block) => block.querySelector("svg.flowchart"));
    },
    count,
    { timeout: 20_000 },
  );
  assert.equal(await page.locator("#post-body pre.mermaid").count(), count);
  assert.deepEqual(errors, [], "Mermaid and page errors must be absent");
  console.log("PASS " + label + ": " + count + " diagrams");
};

const followLink = async (path) => {
  await page.locator('a[href="' + path + '"]').first().click();
  await page.waitForURL(new URL(path, baseUrl).href);
};

try {
  await page.goto(baseUrl.href, { waitUntil: "networkidle" });
  await followLink(streamingPost);
  await expectDiagrams(3, "home to streaming post");

  await followLink(nextPost);
  await page.locator("#post-body").waitFor();
  await followLink(streamingPost);
  await expectDiagrams(3, "return from another post");

  await followLink("/");
  await followLink(barrelPost);
  await expectDiagrams(2, "home to another Mermaid post");

  await page.goBack();
  await page.goBack();
  await expectDiagrams(3, "browser back to streaming post");
  await page.goForward();
  await page.goForward();
  await expectDiagrams(2, "browser forward to barrel post");

  await page.reload({ waitUntil: "networkidle" });
  await expectDiagrams(2, "reload");

  await page.goto(new URL(streamingPost, baseUrl).href, { waitUntil: "networkidle" });
  await expectDiagrams(3, "direct entry");
} finally {
  await browser.close();
}
