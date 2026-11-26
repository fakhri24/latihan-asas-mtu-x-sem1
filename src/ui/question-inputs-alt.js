import { cloneTemplateElement, qs, qsControl, qsTemplate } from "./dom.js";
import { resolveMtfRowState, resolveOptionState } from "./sync-card.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").StudentAnswer} StudentAnswer */

/**
 * Mengatur atribut tombol Benar/Salah dalam satu baris MTF.
 * @param {HTMLElement} btn
 * @param {string} questionId
 * @param {number} rowIndex
 * @param {string} btnState
 * @param {boolean} isSelected
 * @param {boolean} isReadOnly
 */
function configureMtfButton(btn, questionId, rowIndex, btnState, isSelected, isReadOnly) {
  btn.dataset.questionId = questionId;
  btn.dataset.rowIndex = String(rowIndex);
  btn.dataset.state = btnState;
  btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
  if (isReadOnly) btn.setAttribute("disabled", "true");
}

/**
 * Membangun tabel pernyataan Benar / Salah untuk soal Multiple True False.
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 * @returns {HTMLElement}
 */
export function buildMtfList(appRoot, q, ans, isChecked, isReadOnly) {
  const listEl = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-mtf-list"]'));
  const tplRow = qsTemplate(appRoot, '[data-ref="tpl-mtf-row"]');
  const current = ans?.mtf ?? [null, null, null];
  const expected = q.correctBooleans ?? [false, false, false];

  (q.statements ?? []).forEach((stmtText, idx) => {
    const row = cloneTemplateElement(tplRow);
    const val = current[idx];
    row.dataset.state = resolveMtfRowState(val, isChecked, expected[idx]);

    qs(row, '[data-ref="mtf-num"]').textContent = `(${idx + 1})`;
    qs(row, '[data-ref="mtf-text"]').textContent = stmtText;
    configureMtfButton(
      qs(row, '[data-action="pick-mtf"][data-bool="true"]'),
      q.id,
      idx,
      resolveOptionState(val === true, isChecked, expected[idx] === true),
      val === true,
      isReadOnly,
    );
    configureMtfButton(
      qs(row, '[data-action="pick-mtf"][data-bool="false"]'),
      q.id,
      idx,
      resolveOptionState(val === false, isChecked, expected[idx] === false),
      val === false,
      isReadOnly,
    );
    listEl.appendChild(row);
  });

  return listEl;
}

/**
 * Membangun kontrol input isian bilangan bulat untuk soal Jawaban Singkat.
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 * @returns {HTMLElement}
 */
export function buildShortBox(appRoot, q, ans, isChecked, isReadOnly) {
  const box = cloneTemplateElement(qsTemplate(appRoot, '[data-ref="tpl-short-input"]'));
  const input = qsControl(box, '[data-action="input-short"]');
  const labelEl = qs(box, '[data-ref="short-label"]');
  const unitEl = qs(box, '[data-ref="short-unit"]');
  const keyBadge = qs(box, '[data-ref="short-expected"]');
  const inputId = `short-${q.id}`;

  labelEl.setAttribute("for", inputId);
  input.id = inputId;
  input.dataset.questionId = q.id;
  input.value = ans?.short ?? "";
  if (isReadOnly) input.setAttribute("disabled", "true");

  unitEl.textContent = q.unitLabel ?? "";
  unitEl.dataset.state = q.unitLabel ? "open" : "closed";
  keyBadge.textContent = isChecked
    ? `Kunci benar: ${q.correctInteger ?? ""}${q.unitLabel ? ` ${q.unitLabel}` : ""}`
    : "";
  keyBadge.dataset.state = isChecked ? "open" : "closed";
  return box;
}
