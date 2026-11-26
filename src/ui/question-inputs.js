import { cloneTemplateElement, qs, qsTemplate } from "./dom.js";
import { buildMtfList, buildShortBox } from "./question-inputs-alt.js";
import { resolveOptionState } from "./sync-card.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").StudentAnswer} StudentAnswer */

/**
 * Merakit satu tombol opsi PG atau PG Kompleks dari template.
 * @param {HTMLTemplateElement} tplItem
 * @param {QuestionItem} q
 * @param {string} key
 * @param {boolean} isSelected
 * @param {boolean} isCorrect
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 * @returns {HTMLElement}
 */
function buildSingleChoiceItem(tplItem, q, key, isSelected, isCorrect, isChecked, isReadOnly) {
  const item = cloneTemplateElement(tplItem);
  const btn = qs(item, '[data-action="pick-option"]');
  btn.dataset.questionId = q.id;
  btn.dataset.optionKey = key;
  btn.dataset.optionType = q.type;
  btn.dataset.state = resolveOptionState(isSelected, isChecked, isCorrect);
  btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
  if (isReadOnly) btn.setAttribute("disabled", "true");

  qs(item, '[data-ref="opt-key"]').textContent = key;
  qs(item, '[data-ref="opt-text"]').textContent = q.options?.[key] ?? "";
  return item;
}

/**
 * Membangun tombol opsi untuk soal Pilihan Ganda atau PG Kompleks.
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 * @returns {HTMLElement}
 */
function buildChoiceList(appRoot, q, ans, isChecked, isReadOnly) {
  const listEl = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-choice-list"]'));
  const tplItem = qsTemplate(appRoot, '[data-ref="tpl-choice-item"]');
  const keys = q.type === "pgk" ? ["A", "B", "C", "D"] : ["A", "B", "C", "D", "E"];
  const selectedPgk = new Set(ans?.pgk ?? []);
  /** @type {Set<string>} */
  const expectedPgk = new Set(q.correctKeys ?? []);

  for (const key of keys) {
    const isSelected = q.type === "pgk" ? selectedPgk.has(key) : ans?.pg === key;
    const isCorrect = q.type === "pgk" ? expectedPgk.has(key) : q.correctKey === key;
    const item = buildSingleChoiceItem(
      tplItem,
      q,
      key,
      isSelected,
      isCorrect,
      isChecked,
      isReadOnly,
    );
    listEl.appendChild(item);
  }
  return listEl;
}

/**
 * Merakit widget jawaban yang sesuai tipe soal ke dalam slot kartu.
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 * @returns {HTMLElement}
 */
export function buildQuestionInputArea(appRoot, q, ans, isChecked, isReadOnly) {
  if (q.type === "pg" || q.type === "pgk") {
    return buildChoiceList(appRoot, q, ans, isChecked, isReadOnly);
  }
  if (q.type === "mtf") {
    return buildMtfList(appRoot, q, ans, isChecked, isReadOnly);
  }
  return buildShortBox(appRoot, q, ans, isChecked, isReadOnly);
}
