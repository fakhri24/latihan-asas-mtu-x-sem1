/**
 * Merender teks biasa (di luar blok $...$) dengan dukungan **bold** dan *italic* aman via DOM.
 * @param {HTMLElement} parent
 * @param {string} plainPart
 */
function appendPlainRichSegment(parent, plainPart) {
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match = tokenRegex.exec(plainPart);

  while (match !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(plainPart.slice(lastIndex, match.index)));
    }
    const token = match[0];
    const tag = token.startsWith("**") && token.endsWith("**") ? "strong" : "em";
    const el = document.createElement(tag);
    el.textContent = tag === "strong" ? token.slice(2, -2) : token.slice(1, -1);
    parent.appendChild(el);
    lastIndex = tokenRegex.lastIndex;
    match = tokenRegex.exec(plainPart);
  }

  if (lastIndex < plainPart.length) {
    parent.appendChild(document.createTextNode(plainPart.slice(lastIndex)));
  }
}

/**
 * Menyisipkan satu baris teks ber-KaTeX sambil menjaga ekspresi $...$ dan $$...$$ tetap utuh.
 * @param {HTMLElement} parent
 * @param {string} line
 */
function appendInlineRichText(parent, line) {
  const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+\$)/g;
  let lastIndex = 0;
  let match = mathRegex.exec(line);

  while (match !== null) {
    if (match.index > lastIndex) {
      appendPlainRichSegment(parent, line.slice(lastIndex, match.index));
    }
    parent.appendChild(document.createTextNode(match[0]));
    lastIndex = mathRegex.lastIndex;
    match = mathRegex.exec(line);
  }

  if (lastIndex < line.length) {
    appendPlainRichSegment(parent, line.slice(lastIndex));
  }
}

/**
 * Mengubah daftar baris "- item" menjadi elemen <ul> ber-data-ui agar patuh Kontrak 5-Data.
 * @param {string} block
 * @param {string[]} [mathBlocks]
 * @returns {HTMLElement[]}
 */
function buildBulletNodes(block, mathBlocks = []) {
  /** @type {HTMLElement[]} */
  const nodes = [];
  /** @type {HTMLLIElement[]} */
  let listBuffer = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const ul = document.createElement("ul");
    ul.dataset.ui = "bullet-list";
    ul.replaceChildren(...listBuffer);
    nodes.push(ul);
    listBuffer = [];
  };

  for (const rawLine of block.split("\n")) {
    const trimmed = rawLine.trim();
    const blockMatch = /^@@MATHBLOCK_(\d+)@@$/.exec(trimmed);
    if (blockMatch) {
      flushList();
      const p = document.createElement("p");
      p.appendChild(document.createTextNode(mathBlocks[Number(blockMatch[1])] ?? ""));
      nodes.push(p);
    } else if (trimmed.startsWith("- ")) {
      const li = document.createElement("li");
      appendInlineRichText(li, trimmed.slice(2).trim());
      listBuffer.push(li);
    } else if (trimmed.length > 0) {
      flushList();
      const p = document.createElement("p");
      appendInlineRichText(p, trimmed);
      nodes.push(p);
    }
  }
  flushList();
  return nodes;
}

/**
 * Mengisi kontainer teks aman dari string multi-blok ber-Markdown ringan dan KaTeX.
 * @param {HTMLElement} container
 * @param {string} rawText
 */
export function renderFormattedBlocks(container, rawText) {
  const blocks = rawText
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  /** @type {HTMLElement[]} */
  const out = [];
  for (const block of blocks) {
    const hasBullets = block.split("\n").some((l) => l.trim().startsWith("- "));
    if (!hasBullets) {
      const p = document.createElement("p");
      appendInlineRichText(p, block);
      out.push(p);
      continue;
    }
    /** @type {string[]} */
    const mathBlocks = [];
    const tokenized = block.replace(/\$\$[\s\S]+?\$\$/g, (match) => {
      const idx = mathBlocks.length;
      mathBlocks.push(match);
      return `\n@@MATHBLOCK_${idx}@@\n`;
    });
    out.push(...buildBulletNodes(tokenized, mathBlocks));
  }
  container.replaceChildren(...out);
}
