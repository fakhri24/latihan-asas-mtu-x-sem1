import { renderFormattedBlocks } from "./format-text.js";

/**
 * @typedef {{
 *   left: string,
 *   right: string,
 *   display: boolean
 * }} KatexDelimiter
 * @typedef {(
 *   element: HTMLElement,
 *   options: { delimiters: KatexDelimiter[], throwOnError: boolean }
 * ) => void} RenderMathFn
 */

/**
 * Mengambil elemen HTMLElement dari root tertentu secara aman.
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
export function qs(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLElement)) {
    throw new Error(`Elemen wajib tidak ditemukan: ${selector}`);
  }
  return found;
}

/**
 * Mengambil elemen input atau select dari root tertentu.
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLInputElement | HTMLSelectElement}
 */
export function qsControl(root, selector) {
  const found = root.querySelector(selector);
  if (found instanceof HTMLInputElement || found instanceof HTMLSelectElement) {
    return found;
  }
  throw new Error(`Kontrol formulir tidak ditemukan: ${selector}`);
}

/**
 * Mengambil elemen dialog native dari root tertentu.
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLDialogElement}
 */
export function qsDialog(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLDialogElement)) {
    throw new Error(`Elemen dialog tidak ditemukan: ${selector}`);
  }
  return found;
}

/**
 * Mengambil elemen template HTML dari root tertentu.
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLTemplateElement}
 */
export function qsTemplate(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLTemplateElement)) {
    throw new Error(`Elemen template tidak ditemukan: ${selector}`);
  }
  return found;
}

/**
 * Menduplikasi node akar dari template HTML5 tanpa memakai innerHTML.
 * @param {HTMLTemplateElement} templateEl
 * @returns {HTMLElement}
 */
export function cloneTemplateElement(templateEl) {
  const fragment = templateEl.content.cloneNode(true);
  if (
    !(fragment instanceof DocumentFragment) ||
    !(fragment.firstElementChild instanceof HTMLElement)
  ) {
    throw new Error("Isi template harus memiliki satu elemen akar yang valid.");
  }
  return fragment.firstElementChild;
}

/**
 * Mengisi kontainer paragraf aman dari teks multi-baris tanpa innerHTML.
 * @param {HTMLElement} container
 * @param {string} rawText
 */
export function setFormattedLines(container, rawText) {
  renderFormattedBlocks(container, rawText);
}

/**
 * Merender ekspresi KaTeX hanya dengan delimiter standar $...$ dan $$...$$ jika skrip tersedia.
 * @param {HTMLElement} container
 */
export function renderMathInContainer(container) {
  const host = /** @type {typeof globalThis & { renderMathInElement?: RenderMathFn }} */ (
    globalThis
  );
  if (typeof host.renderMathInElement !== "function") return;

  host.renderMathInElement(container, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
}

/**
 * Memformat detik tersisa menjadi tampilan jam:menit:detik (JJ:MM:DD).
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, "0")).join(":");
}
