import { gradeQuestion, isQuestionAnswered } from "../core/grader.js";
import { qs, qsControl } from "./dom.js";
import { syncCardTools } from "./question-card.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").StudentAnswer} StudentAnswer */
/** @typedef {import("../core/types.js").AppState} AppState */

/**
 * Menentukan atribut data-state opsi agar CSS menyorot jawaban benar/salah secara deklaratif.
 * @param {boolean} isSelected
 * @param {boolean} isChecked
 * @param {boolean} isCorrect
 * @returns {string}
 */
export function resolveOptionState(isSelected, isChecked, isCorrect) {
  if (!isChecked) return isSelected ? "selected" : "idle";
  if (isCorrect) return isSelected ? "correct" : "missed";
  return isSelected ? "wrong" : "idle";
}

/**
 * Menentukan status visual satu baris MTF setelah kunci dibuka atau dicek.
 * @param {boolean | null} val
 * @param {boolean} isChecked
 * @param {boolean} rowCorrect
 * @returns {string}
 */
export function resolveMtfRowState(val, isChecked, rowCorrect) {
  if (!isChecked) return "idle";
  if (val === rowCorrect) return "correct";
  return val === null ? "missed" : "wrong";
}

/**
 * Menentukan status koreksi satu kartu soal untuk ditampilkan lewat atribut data-state.
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} revealSolution
 * @returns {"idle" | "correct" | "wrong" | "unanswered"}
 */
function resolveCardCheckState(q, ans, revealSolution) {
  if (!revealSolution) return "idle";
  if (!isQuestionAnswered(q, ans)) return "unanswered";
  return gradeQuestion(q, ans) ? "correct" : "wrong";
}

/**
 * Menyelaraskan status tombol pilihan PG/PGK di dalam kartu yang sudah terpasang.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 */
function syncChoiceButtons(card, q, ans, isChecked, isReadOnly) {
  const selectedPgk = new Set(ans?.pgk ?? []);
  /** @type {Set<string>} */
  const expectedPgk = new Set(q.correctKeys ?? []);

  for (const btn of card.querySelectorAll('[data-action="pick-option"]')) {
    if (!(btn instanceof HTMLButtonElement)) continue;
    const key = btn.dataset.optionKey ?? "";
    const isSelected = q.type === "pgk" ? selectedPgk.has(key) : ans?.pg === key;
    const isCorrect = q.type === "pgk" ? expectedPgk.has(key) : q.correctKey === key;
    btn.dataset.state = resolveOptionState(isSelected, isChecked, isCorrect);
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    btn.disabled = isReadOnly;
  }
}

/**
 * Menyelaraskan satu baris MTF (Benar/Salah) secara inkremental.
 * @param {HTMLElement} row
 * @param {boolean | null} val
 * @param {boolean} isChecked
 * @param {boolean} rowCorrect
 * @param {boolean} isReadOnly
 */
function syncSingleMtfRow(row, val, isChecked, rowCorrect, isReadOnly) {
  row.dataset.state = resolveMtfRowState(val, isChecked, rowCorrect);
  for (const btn of row.querySelectorAll('[data-action="pick-mtf"]')) {
    if (!(btn instanceof HTMLButtonElement)) continue;
    const btnBool = btn.dataset.bool === "true";
    const isSelected = val === btnBool;
    btn.dataset.state = resolveOptionState(isSelected, isChecked, btnBool === rowCorrect);
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
    btn.disabled = isReadOnly;
  }
}

/**
 * Menyelaraskan kotak isian singkat secara aman tanpa pernah menghapus fokus pengetikan aktif.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} isChecked
 * @param {boolean} isReadOnly
 */
function syncShortInput(card, q, ans, isChecked, isReadOnly) {
  const input = qsControl(card, '[data-action="input-short"]');
  const keyBadge = qs(card, '[data-ref="short-expected"]');
  const desired = ans?.short ?? "";

  input.disabled = isReadOnly;
  if (document.activeElement !== input && input.value !== desired) {
    input.value = desired;
  }
  const unitText = q.unitLabel ? ` ${q.unitLabel}` : "";
  keyBadge.textContent = isChecked ? `Kunci benar: ${q.correctInteger ?? ""}${unitText}` : "";
  keyBadge.dataset.state = isChecked ? "open" : "closed";
}

/**
 * Menyelaraskan widget input jawaban sesuai tipe soal pada kartu yang ada.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 * @param {StudentAnswer | undefined} ans
 * @param {boolean} revealSolution
 * @param {boolean} isReadOnly
 */
function syncInputMount(card, q, ans, revealSolution, isReadOnly) {
  if (q.type === "pg" || q.type === "pgk") {
    syncChoiceButtons(card, q, ans, revealSolution, isReadOnly);
    return;
  }
  if (q.type !== "mtf") {
    syncShortInput(card, q, ans, revealSolution, isReadOnly);
    return;
  }
  const current = ans?.mtf ?? [null, null, null];
  const expected = q.correctBooleans ?? [false, false, false];
  card.querySelectorAll('[data-ui="mtf-row"]').forEach((row, idx) => {
    if (row instanceof HTMLElement) {
      syncSingleMtfRow(
        row,
        current[idx] ?? null,
        revealSolution,
        Boolean(expected[idx]),
        isReadOnly,
      );
    }
  });
}

/**
 * Memperbarui seluruh atribut dinamis kartu soal di tempat tanpa menyentuh KaTeX atau fokus input.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 * @param {AppState} state
 * @param {{ isMirrorPanel?: boolean, datasetTag?: string }} [opts]
 */
export function syncQuestionCard(card, q, state, opts = {}) {
  const isSim = state.mode === "sim" && !opts.isMirrorPanel;
  const ans = (isSim ? state.simAnswers : state.learnAnswers)[q.id];
  const isChecked = isSim ? state.simSubmitted : Boolean(state.checkedLearn[q.id]);
  const revealSolution = state.showAllSolutions || isChecked;
  const checkState = resolveCardCheckState(q, ans, revealSolution);
  const isReadOnly = (isSim && state.simSubmitted) || opts.datasetTag === "ASAS";

  card.dataset.state = checkState;
  const showTier = state.studioAvailable && (state.dataset !== "latihan" || opts.isMirrorPanel);
  qs(card, '[data-ref="q-tier"]').dataset.state = showTier ? "open" : "closed";

  syncInputMount(card, q, ans, revealSolution, isReadOnly);
  syncCardTools(card, q, state, isSim, isChecked, revealSolution, checkState);
}
