import fs from "node:fs/promises";
import path from "node:path";

const origin = "https://alumni.dbit.co.in";
const outDir = path.resolve("data");
const imageDir = path.resolve("assets/images/source");
const maxPages = 90;

function decodeEntities(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(html = "") {
  return decodeEntities(html.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim());
}

function absUrl(raw, base) {
  try {
    return new URL(decodeEntities(raw), base).href;
  } catch {
    return null;
  }
}

function localImageName(url, index) {
  const ext = path.extname(new URL(url).pathname).split("?")[0] || ".jpg";
  return `source-${String(index).padStart(3, "0")}${ext.toLowerCase()}`;
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "DBITAA redesign content scraper; permission granted by site owner"
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return await res.text();
}

async function downloadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const arrayBuffer = await res.arrayBuffer();
  await fs.writeFile(path.join(imageDir, filename), Buffer.from(arrayBuffer));
  return true;
}

function parsePage(url, html) {
  const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const headings = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(match => ({ level: Number(match[1]), text: stripTags(match[2]) }))
    .filter(item => item.text);
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map(match => ({ href: absUrl(match[1], url), text: stripTags(match[2]) }))
    .filter(item => item.href && item.text)
    .filter(item => !item.href.includes("javascript:"));
  const images = [
    ...[...html.matchAll(/<img\b[^>]*(?:src|data-src)=["']([^"']+)["'][^>]*>/gi)].map(match => match[1]),
    ...[...html.matchAll(/background(?:-image)?\s*:\s*url\(["']?([^"')]+)["']?\)/gi)].map(match => match[1])
  ]
    .map(src => absUrl(src, url))
    .filter(Boolean)
    .filter(src => /\.(png|jpe?g|webp|gif)(\?|$)/i.test(src));
  const paragraphs = [...html.matchAll(/<(p|li)[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map(match => stripTags(match[2]))
    .filter(text => text && text.length > 18)
    .slice(0, 80);
  return { url, title, headings, links, images: [...new Set(images)], paragraphs };
}

await fs.mkdir(outDir, { recursive: true });
await fs.mkdir(imageDir, { recursive: true });

const queue = [origin + "/"];
const seen = new Set();
const pages = [];

while (queue.length && pages.length < maxPages) {
  const url = queue.shift();
  if (seen.has(url)) continue;
  seen.add(url);
  try {
    const html = await fetchText(url);
    const page = parsePage(url, html);
    pages.push(page);
    for (const link of page.links) {
      const next = new URL(link.href);
      if (next.origin === origin && !seen.has(next.href) && !/login|register|invite|privacy|terms|disclaimer|cookie|feedback/i.test(next.href)) {
        queue.push(next.href);
      }
    }
  } catch (error) {
    pages.push({ url, error: error.message });
  }
}

const allImages = [...new Set(pages.flatMap(page => page.images || []))];
const imageMap = [];
let index = 1;
for (const imageUrl of allImages) {
  const filename = localImageName(imageUrl, index++);
  const ok = await downloadImage(imageUrl, filename);
  if (ok) imageMap.push({ url: imageUrl, file: `assets/images/source/${filename}` });
}

const inventory = {
  scrapedAt: new Date().toISOString(),
  origin,
  pages,
  images: imageMap
};

await fs.writeFile(path.join(outDir, "alumni-source-inventory.json"), JSON.stringify(inventory, null, 2));
console.log(`Scraped ${pages.length} pages and ${imageMap.length} images.`);
