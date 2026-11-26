import { filterQuestions } from "../core/filter-questions.js";
import { qs } from "./dom.js";
import { buildMirrorRow, buildQuestionCard } from "./question-card.js";
import { syncQuestionCard } from "./sync-card.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").AppState} AppState */

/**
 * Mengambil ID soal milik kotak isian singkat yang sedang difokuskan pengguna.
 * @param {HTMLElement} listEl
 * @returns {string | null}
 */
function getFocusedShortQuestionId(listEl) {
  const active = document.activeElement;
  if (!(active instanceof HTMLInputElement)) return null;
  if (active.dataset.action !== "input-short" || !listEl.contains(active)) return null;
  return active.dataset.questionId ?? null;
}

/**
 * Mengindeks elemen anak daftar soal berdasarkan data-id dan data-ui yang diharapkan.
 * @param {HTMLElement} listEl
 * @param {string} expectedUi
 * @returns {Map<string, HTMLElement>}
 */
function indexExistingRows(listEl, expectedUi) {
  /** @type {Map<string, HTMLElement>} */
  const map = new Map();
  for (const child of listEl.children) {
    if (!(child instanceof HTMLElement)) continue;
    if (child.dataset.ui !== expectedUi || !child.dataset.id) continue;
    map.set(child.dataset.id, child);
  }
  return map;
}

/**
 * Memeriksa apakah urutan elemen anak listEl sudah persis sama dengan nodes tujuan.
 * @param {HTMLElement} listEl
 * @param {HTMLElement[]} nodes
 * @returns {boolean}
 */
function isSameChildSequence(listEl, nodes) {
  if (listEl.children.length !== nodes.length) return false;
  for (let i = 0; i < nodes.length; i += 1) {
    if (listEl.children[i] !== nodes[i]) return false;
  }
  return true;
}

/**
 * Memilih soal yang tampil dengan mempertahankan kartu isian yang sedang diketik aktif.
 * @param {readonly QuestionItem[]} activeQuestions
 * @param {AppState} state
 * @param {boolean} useAsas
 * @param {string | null} focusedQid
 * @returns {readonly QuestionItem[]}
 */
function resolveVisibleSingle(activeQuestions, state, useAsas, focusedQid) {
  if (state.mode === "sim") return activeQuestions;
  const filtered = filterQuestions(activeQuestions, {
    chapterFilter: state.chapterFilter,
    tierFilter: useAsas ? state.tierFilter : "all",
    statusFilter: state.statusFilter,
    searchQuery: state.searchQuery,
    answers: state.learnAnswers,
    checkedMap: state.checkedLearn,
    showAllStatus: state.showAllSolutions,
  });
  if (!focusedQid || filtered.some((q) => q.id === focusedQid)) return filtered;
  const allowedIds = new Set(filtered.map((q) => q.id));
  allowedIds.add(focusedQid);
  return activeQuestions.filter((q) => allowedIds.has(q.id));
}

/**
 * Menyelaraskan kartu soal tunggal secara inkremental tanpa menghilangkan fokus input aktif.
 * @param {HTMLElement} appRoot
 * @param {HTMLElement} listEl
 * @param {AppState} state
 * @param {readonly QuestionItem[]} activeQuestions
 * @param {boolean} useAsas
 * @returns {{ count: number, added: HTMLElement[] }}
 */
export function syncSingleList(appRoot, listEl, state, activeQuestions, useAsas) {
  const focusedQid = getFocusedShortQuestionId(listEl);
  const existingMap = indexExistingRows(listEl, "question-card");
  const keepFocused = focusedQid !== null && existingMap.has(focusedQid) ? focusedQid : null;
  const visible = resolveVisibleSingle(activeQuestions, state, useAsas, keepFocused);

  /** @type {HTMLElement[]} */
  const desired = [];
  /** @type {HTMLElement[]} */
  const added = [];
  for (const q of visible) {
    const existing = existingMap.get(q.id);
    if (existing) {
      syncQuestionCard(existing, q, state);
      desired.push(existing);
    } else {
      const created = buildQuestionCard(appRoot, q, state);
      desired.push(created);
      added.push(created);
    }
  }
  listEl.dataset.layout = "single";
  if (!isSameChildSequence(listEl, desired)) listEl.replaceChildren(...desired);
  return { count: desired.length, added };
}

/**
 * Menyelaraskan baris cermin 1-ke-1 secara inkremental tanpa memutus fokus input aktif.
 * @param {HTMLElement} appRoot
 * @param {HTMLElement} listEl
 * @param {AppState} state
 * @param {readonly QuestionItem[]} practiceQuestions
 * @param {readonly QuestionItem[]} asasQuestions
 * @returns {{ count: number, added: HTMLElement[] }}
 */
export function syncMirrorList(appRoot, listEl, state, practiceQuestions, asasQuestions) {
  const existingMap = indexExistingRows(listEl, "mirror-row");
  const filtered = filterQuestions(asasQuestions, {
    chapterFilter: state.chapterFilter,
    tierFilter: state.tierFilter,
    statusFilter: "all",
    searchQuery: state.searchQuery,
    answers: state.learnAnswers,
    checkedMap: state.checkedLearn,
    showAllStatus: true,
  });

  /** @type {HTMLElement[]} */
  const desired = [];
  /** @type {HTMLElement[]} */
  const added = [];
  for (const asasQ of filtered) {
    const latihanQ = practiceQuestions[asasQ.number - 1];
    const existing = existingMap.get(asasQ.id);
    if (existing) {
      const leftCard = qs(existing, '[data-ref="mirror-left"] > [data-ui="question-card"]');
      const rightCard = qs(existing, '[data-ref="mirror-right"] > [data-ui="question-card"]');
      syncQuestionCard(leftCard, latihanQ, state, { isMirrorPanel: true, datasetTag: "Latihan" });
      syncQuestionCard(rightCard, asasQ, state, { isMirrorPanel: true, datasetTag: "ASAS" });
      desired.push(existing);
    } else {
      const created = buildMirrorRow(appRoot, latihanQ, asasQ, state);
      desired.push(created);
      added.push(created);
    }
  }
  listEl.dataset.layout = "mirror";
  if (!isSameChildSequence(listEl, desired)) listEl.replaceChildren(...desired);
  return { count: desired.length, added };
}
