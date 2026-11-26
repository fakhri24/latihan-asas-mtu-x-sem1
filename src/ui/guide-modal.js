import { STUDY_GUIDE_CHAPTERS } from "../core/study-guide/index.js";
import {
  cloneTemplateElement,
  qs,
  qsTemplate,
  renderMathInContainer,
  setFormattedLines,
} from "./dom.js";

/** @typedef {import("../core/types.js").AppState} AppState */
/** @typedef {import("../core/study-guide/index.js").ChapterGuide} ChapterGuide */
/** @typedef {import("../core/study-guide/index.js").WorkedExample} WorkedExample */

/**
 * Mengubah array poin kalimat menjadi daftar markdown bullet untuk dirender aman via DOM.
 * @param {readonly string[]} items
 * @returns {string}
 */
function toBulletText(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

/**
 * Merakit kartu ringkasan rumus per bab dari templat HTML.
 * @param {HTMLElement} appRoot
 * @param {ChapterGuide} chapter
 * @returns {HTMLElement}
 */
function buildFormulaCard(appRoot, chapter) {
  const card = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-formula-card"]'));
  const tplItem = qsTemplate(appRoot, '[data-ref="tpl-formula-item"]');
  qs(card, '[data-ref="formula-card-title"]').textContent = `${chapter.badge} · ${chapter.title}`;

  const itemNodes = chapter.formulas.map((entry) => {
    const item = cloneTemplateElement(tplItem);
    qs(item, '[data-ref="formula-label"]').textContent = entry.label;
    setFormattedLines(qs(item, '[data-ref="formula-lines"]'), entry.lines.join("\n\n"));
    return item;
  });

  qs(card, '[data-ref="formula-list"]').replaceChildren(...itemNodes);
  return card;
}

/**
 * Merakit satu kartu contoh mini dengan langkah vertikal ber-KaTeX.
 * @param {HTMLElement} appRoot
 * @param {WorkedExample} example
 * @returns {HTMLElement}
 */
function buildExampleNode(appRoot, example) {
  const node = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-materi-example"]'));
  qs(node, '[data-ref="ex-title"]').textContent = example.title;
  setFormattedLines(qs(node, '[data-ref="ex-problem"]'), example.problem);
  setFormattedLines(qs(node, '[data-ref="ex-steps"]'), example.steps);
  return node;
}

/**
 * Merakit kartu rangkuman materi lengkap untuk satu bab (rumus, konsep, alur, contoh, jebakan).
 * @param {HTMLElement} appRoot
 * @param {ChapterGuide} chapter
 * @returns {HTMLElement}
 */
function buildMateriCard(appRoot, chapter) {
  const card = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-materi-card"]'));
  const tplChip = qsTemplate(appRoot, '[data-ref="tpl-rumus-chip"]');

  qs(card, '[data-ref="materi-badge"]').textContent = chapter.badge;
  qs(card, '[data-ref="materi-title"]').textContent = chapter.title;
  setFormattedLines(qs(card, '[data-ref="materi-tagline"]'), chapter.tagline);

  const chipNodes = chapter.formulas.map((entry) => {
    const chip = cloneTemplateElement(tplChip);
    qs(chip, '[data-ref="chip-label"]').textContent = entry.label;
    setFormattedLines(qs(chip, '[data-ref="chip-lines"]'), entry.lines.join("\n\n"));
    return chip;
  });
  qs(card, '[data-ref="materi-chip-grid"]').replaceChildren(...chipNodes);

  setFormattedLines(qs(card, '[data-ref="materi-key-points"]'), toBulletText(chapter.keyPoints));
  setFormattedLines(qs(card, '[data-ref="materi-quick-flow"]'), toBulletText(chapter.quickFlow));

  const exampleNodes = chapter.examples.map((ex) => buildExampleNode(appRoot, ex));
  qs(card, '[data-ref="materi-examples"]').replaceChildren(...exampleNodes);

  setFormattedLines(qs(card, '[data-ref="materi-pitfalls"]'), toBulletText(chapter.pitfalls));
  return card;
}

/**
 * Mengisi kedua panel modal Ringkasan & Materi sekali saja saat render awal.
 * @param {HTMLElement} appRoot
 * @param {HTMLElement} dialog
 */
function mountGuideContent(appRoot, dialog) {
  if (dialog.dataset.mounted === "true") return;

  const rumusMount = qs(dialog, '[data-ref="guide-rumus-mount"]');
  const materiMount = qs(dialog, '[data-ref="guide-materi-mount"]');

  rumusMount.replaceChildren(
    ...STUDY_GUIDE_CHAPTERS.map((chapter) => buildFormulaCard(appRoot, chapter)),
  );
  materiMount.replaceChildren(
    ...STUDY_GUIDE_CHAPTERS.map((chapter) => buildMateriCard(appRoot, chapter)),
  );

  dialog.dataset.mounted = "true";
  renderMathInContainer(dialog);
}

/**
 * Menyelaraskan tab aktif modal Ringkasan & Materi memakai aria-selected (sesuai role="tab").
 * @param {HTMLElement} dialog
 * @param {AppState["guideTab"]} activeTab
 */
function syncGuideTabs(dialog, activeTab) {
  for (const tab of dialog.querySelectorAll('[data-action="switch-guide-tab"]')) {
    if (!(tab instanceof HTMLElement)) continue;
    const isActive = tab.dataset.tab === activeTab;
    tab.dataset.state = isActive ? "active" : "inactive";
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
  }
}

/**
 * Menyinkronkan tab aktif dan panel modal Ringkasan & Materi dari state aplikasi.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 */
export function renderGuideDialog(appRoot, state) {
  const dialog = appRoot.querySelector('[data-ref="guide-dialog"]');
  if (!(dialog instanceof HTMLElement)) return;

  mountGuideContent(appRoot, dialog);
  syncGuideTabs(dialog, state.guideTab);

  const isRumus = state.guideTab === "rumus";
  qs(dialog, '[data-ref="guide-rumus-panel"]').dataset.state = isRumus ? "open" : "closed";
  qs(dialog, '[data-ref="guide-materi-panel"]').dataset.state = isRumus ? "closed" : "open";
}
