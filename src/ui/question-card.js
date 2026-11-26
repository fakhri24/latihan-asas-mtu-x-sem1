import { CHAPTER_META, TYPE_LABELS } from "../core/types.js";
import { cloneTemplateElement, qs, qsTemplate, setFormattedLines } from "./dom.js";
import { buildQuestionInputArea } from "./question-inputs.js";
import { syncQuestionCard } from "./sync-card.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").AppState} AppState */

/**
 * Memformat teks badge hasil koreksi di bawah kartu soal.
 * @param {"idle" | "correct" | "wrong" | "unanswered"} checkState
 * @param {boolean} showAllSolutions
 * @returns {string}
 */
function formatCheckLabel(checkState, showAllSolutions) {
  if (checkState === "correct") return "Benar ✓";
  if (checkState === "wrong") return "Belum Tepat ✕";
  if (showAllSolutions) return "Kunci Guru Terbuka";
  return "Belum Diisi";
}

/**
 * Menyelaraskan tombol Petunjuk, Cek Jawaban, badge skor, dan panel pembahasan tanpa merusak KaTeX.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 * @param {AppState} state
 * @param {boolean} isSim
 * @param {boolean} isChecked
 * @param {boolean} revealSolution
 * @param {"idle" | "correct" | "wrong" | "unanswered"} checkState
 */
export function syncCardTools(card, q, state, isSim, isChecked, revealSolution, checkState) {
  const hintOpen = Boolean(state.revealedHints[q.id]) && !isSim;
  const hintBtn = qs(card, '[data-action="toggle-hint"]');
  const checkBtn = qs(card, '[data-action="check-question"]');
  const badgeEl = qs(card, '[data-ref="q-check-badge"]');

  hintBtn.dataset.state = isSim ? "closed" : "open";
  hintBtn.setAttribute("aria-expanded", hintOpen ? "true" : "false");
  checkBtn.dataset.state = isSim ? "closed" : "open";
  checkBtn.textContent = isChecked ? "Sembunyikan Kunci" : "Cek Jawaban";

  qs(card, '[data-ref="q-hint-box"]').dataset.state = hintOpen ? "open" : "closed";
  badgeEl.dataset.state = revealSolution ? checkState : "closed";
  badgeEl.textContent = formatCheckLabel(checkState, state.showAllSolutions);
  qs(card, '[data-ref="q-solution-box"]').dataset.state = revealSolution ? "open" : "closed";
}

/**
 * Mengisi stimulus wacana (jika ada) dan teks pertanyaan utama kartu.
 * @param {HTMLElement} card
 * @param {QuestionItem} q
 */
function renderStimulusAndPrompt(card, q) {
  const stimBox = qs(card, '[data-ref="q-stimulus"]');
  if (q.stimulus) {
    stimBox.dataset.state = "open";
    qs(stimBox, '[data-ref="q-stim-title"]').textContent = q.stimulus.title;
    setFormattedLines(qs(stimBox, '[data-ref="q-stim-text"]'), q.stimulus.text);
  } else {
    stimBox.dataset.state = "closed";
  }
  setFormattedLines(qs(card, '[data-ref="q-prompt"]'), q.prompt);
}

/**
 * Merakit satu kartu soal interaktif lengkap beserta stimulus, hint, ruang jawab cetak, dan pembahasan.
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} q
 * @param {AppState} state
 * @param {{ isMirrorPanel?: boolean, datasetTag?: string }} [opts]
 * @returns {HTMLElement}
 */
export function buildQuestionCard(appRoot, q, state, opts = {}) {
  const tplCard = qsTemplate(appRoot, '[data-ref="tpl-question-card"]');
  const card = cloneTemplateElement(tplCard);
  const isSim = state.mode === "sim" && !opts.isMirrorPanel;
  const answers = isSim ? state.simAnswers : state.learnAnswers;
  const ans = answers[q.id];
  const isChecked = isSim ? state.simSubmitted : Boolean(state.checkedLearn[q.id]);
  const revealSolution = state.showAllSolutions || isChecked;
  const isReadOnly = (isSim && state.simSubmitted) || opts.datasetTag === "ASAS";

  card.dataset.id = q.id;
  card.dataset.tier = q.tier;

  qs(card, '[data-ref="q-num"]').textContent = `Soal #${q.number}`;
  qs(card, '[data-ref="q-chapter"]').textContent = CHAPTER_META[q.chapter].badge;
  qs(card, '[data-ref="q-type"]').textContent = TYPE_LABELS[q.type];
  qs(card, '[data-ref="q-topic"]').textContent = q.topic;

  const tierEl = qs(card, '[data-ref="q-tier"]');
  tierEl.textContent = q.tier === "pembeda" ? "20% Pembeda" : "80% Inti";
  tierEl.dataset.tier = q.tier;

  const tagEl = qs(card, '[data-ref="q-dataset-tag"]');
  tagEl.textContent = opts.datasetTag ?? "";
  tagEl.dataset.state = opts.datasetTag ? "open" : "closed";

  renderStimulusAndPrompt(card, q);
  const inputMount = qs(card, '[data-ref="q-input-mount"]');
  inputMount.replaceChildren(buildQuestionInputArea(appRoot, q, ans, revealSolution, isReadOnly));

  qs(card, '[data-action="toggle-hint"]').dataset.questionId = q.id;
  qs(card, '[data-action="check-question"]').dataset.questionId = q.id;
  setFormattedLines(qs(card, '[data-ref="q-hint-text"]'), q.hint);
  setFormattedLines(qs(card, '[data-ref="q-solution-text"]'), q.solution);

  syncQuestionCard(card, q, state, opts);
  return card;
}

/**
 * Merakit pasangan kartu cermin 1-ke-1 (Latihan di kiri dan ASAS di kanan).
 * @param {HTMLElement} appRoot
 * @param {QuestionItem} latihanQ
 * @param {QuestionItem} asasQ
 * @param {AppState} state
 * @returns {HTMLElement}
 */
export function buildMirrorRow(appRoot, latihanQ, asasQ, state) {
  const tplRow = qsTemplate(appRoot, '[data-ref="tpl-mirror-row"]');
  const row = cloneTemplateElement(tplRow);
  row.dataset.id = asasQ.id;

  const leftCard = buildQuestionCard(appRoot, latihanQ, state, {
    isMirrorPanel: true,
    datasetTag: "Latihan",
  });
  const rightCard = buildQuestionCard(appRoot, asasQ, state, {
    isMirrorPanel: true,
    datasetTag: "ASAS",
  });
  qs(row, '[data-ref="mirror-left"]').replaceChildren(leftCard);
  qs(row, '[data-ref="mirror-right"]').replaceChildren(rightCard);
  return row;
}
