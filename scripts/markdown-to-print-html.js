const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(process.cwd(), process.argv[2] ?? "PRD.md");
const outputPath = path.resolve(process.cwd(), process.argv[3] ?? "PRD_print.html");
const documentTitle = process.argv[4] ?? "Pet Snack Tracker";
const documentKicker = process.argv[5] ?? "Product Requirements Document";

const source = fs.readFileSync(inputPath, "utf8");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => inlineMarkdown(cell.trim()));
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listOpen = false;

  function flushParagraph() {
    if (paragraph.length > 0) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listOpen) {
      html.push("</ul>");
      listOpen = false;
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith("|") && lines[i + 1] && isTableSeparator(lines[i + 1])) {
      flushParagraph();
      closeList();
      const headers = tableCells(trimmed);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(tableCells(lines[i]));
        i += 1;
      }
      i -= 1;
      html.push("<table>");
      html.push(`<thead><tr>${headers.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`);
      html.push("<tbody>");
      for (const row of rows) {
        html.push(`<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);
      }
      html.push("</tbody></table>");
      continue;
    }

    const bullet = /^-\s+(.+)$/.exec(trimmed);
    if (bullet) {
      flushParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      flushParagraph();
      closeList();
      html.push(`<p class="step">${inlineMarkdown(trimmed)}</p>`);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();
  return html.join("\n");
}

const body = renderMarkdown(source);
const today = new Date().toISOString().slice(0, 10);

const document = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(documentTitle)}</title>
  <style>
    @font-face {
      font-family: "PRD Noto Sans CJK SC";
      src: url("file:///Users/pennyzhang/Library/Fonts/NotoSansCJKsc-Regular.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "PRD Noto Sans CJK SC";
      src: url("file:///Users/pennyzhang/Library/Fonts/NotoSansCJKsc-Bold.otf") format("opentype");
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }

    @page {
      size: A4;
      margin: 18mm 16mm 20mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #f3f5f7;
      color: #1f2933;
      font-family: "PRD Noto Sans CJK SC", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      font-size: 11pt;
      line-height: 1.58;
    }

    main {
      width: 210mm;
      min-height: 297mm;
      margin: 18px auto;
      padding: 15mm 16mm;
      background: #fff;
      box-shadow: 0 12px 36px rgba(15, 23, 42, 0.12);
    }

    .cover {
      border-bottom: 2px solid #1f2933;
      margin-bottom: 18px;
      padding-bottom: 14px;
    }

    .eyebrow {
      margin: 0 0 8px;
      color: #687385;
      font-size: 9pt;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    h1 {
      margin: 0 0 10px;
      color: #111827;
      font-size: 23pt;
      line-height: 1.15;
      page-break-after: avoid;
    }

    h2 {
      margin: 18px 0 7px;
      padding-top: 8px;
      border-top: 1px solid #d9dee7;
      color: #111827;
      font-size: 14.5pt;
      line-height: 1.3;
      page-break-after: avoid;
    }

    h3 {
      margin: 13px 0 5px;
      color: #263445;
      font-size: 12.5pt;
      line-height: 1.35;
      page-break-after: avoid;
    }

    p {
      margin: 4px 0 7px;
    }

    ul {
      margin: 5px 0 9px 18px;
      padding: 0;
    }

    li {
      margin: 3px 0;
    }

    .step {
      margin-left: 2px;
    }

    table {
      width: 100%;
      margin: 8px 0 13px;
      border-collapse: collapse;
      font-size: 9.5pt;
    }

    th,
    td {
      border: 1px solid #cfd6e1;
      padding: 6px 8px;
      vertical-align: top;
    }

    th {
      background: #edf2f7;
      color: #172033;
      font-weight: 700;
      text-align: left;
    }

    code {
      border-radius: 3px;
      background: #eef2f7;
      padding: 1px 4px;
      font-family: "SFMono-Regular", Consolas, monospace;
      font-size: 0.92em;
    }

    .meta {
      color: #687385;
      font-size: 9.5pt;
    }

    @media print {
      body {
        background: #fff;
      }

      main {
        width: auto;
        min-height: 0;
        margin: 0;
        padding: 0;
        box-shadow: none;
      }

      h2 {
        page-break-after: avoid;
      }

      h3,
      table {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <main>
    <section class="cover">
      <p class="eyebrow">${inlineMarkdown(documentKicker)}</p>
      <h1>${inlineMarkdown(documentTitle)}</h1>
      <p class="meta">Printable document generated from ${escapeHtml(path.basename(inputPath))} on ${today}</p>
    </section>
${body.replace(/^<h1>.*?<\/h1>\n?/, "")}
  </main>
</body>
</html>
`;

fs.writeFileSync(outputPath, document, "utf8");
console.log(outputPath);
