import { EXAM_DURATION_SECONDS } from "../core/types.js";
import { qs, qsDialog } from "./dom.js";

/** @typedef {import("../core/types.js").AppState} AppState */
/** @typedef {import("../core/types.js").StudentAnswer} StudentAnswer */
/** @typedef {{ getState: () => AppState, setState: (u: (s: AppState) => AppState) => void }} AppStore */

/**
 * Memperbarui jawaban pilihan ganda atau PG kompleks pada peta jawaban sesuai mode aktif.
 * @param {AppState} state
 * @param {string} questionId
 * @param {string} optionKey
 * @param {string} optionType
 * @returns {AppState}
 */
function updateChoiceState(state, questionId, optionKey, optionType) {
  const isSim = state.mode === "sim";
  const targetMap = isSim ? state.simAnswers : state.learnAnswers;
  const current = targetMap[questionId] ?? {};
  /** @type {StudentAnswer} */
  let nextAns;

  if (optionType === "pgk") {
    const prevSet = new Set(current.pgk ?? []);
    if (prevSet.has(optionKey)) prevSet.delete(optionKey);
    else prevSet.add(optionKey);
    nextAns = { ...current, pgk: [...prevSet].sort() };
  } else {
    nextAns = { ...current, pg: optionKey };
  }

  const nextMap = { ...targetMap, [questionId]: nextAns };
  return isSim ? { ...state, simAnswers: nextMap } : { ...state, learnAnswers: nextMap };
}

/**
 * Memperbarui jawaban baris MTF (Benar/Salah) secara immutable.
 * @param {AppState} state
 * @param {string} questionId
 * @param {number} rowIndex
 * @param {boolean} boolVal
 * @returns {AppState}
 */
function updateMtfState(state, questionId, rowIndex, boolVal) {
  const isSim = state.mode === "sim";
  const targetMap = isSim ? state.simAnswers : state.learnAnswers;
  const current = targetMap[questionId] ?? {};
  const nextArr = [...(current.mtf ?? [null, null, null])];
  nextArr[rowIndex] = boolVal;
  const nextMap = { ...targetMap, [questionId]: { ...current, mtf: nextArr } };
  return isSim ? { ...state, simAnswers: nextMap } : { ...state, learnAnswers: nextMap };
}

/**
 * Membangun peta aksi pengerjaan soal dan kendali simulasi 120 menit.
 * @param {HTMLElement} appRoot
 * @param {AppStore} store
 * @returns {Record<string, (triggerEl: HTMLElement, event: Event) => void>}
 */
export function createExamActions(appRoot, store) {
  return {
    "pick-option": (el) => {
      const { questionId, optionKey, optionType } = el.dataset;
      if (!questionId || !optionKey || !optionType) return;
      store.setState((prev) => updateChoiceState(prev, questionId, optionKey, optionType));
    },
    "pick-mtf": (el) => {
      const { questionId, rowIndex, bool } = el.dataset;
      if (!questionId || rowIndex === undefined || (bool !== "true" && bool !== "false")) return;
      store.setState((prev) => updateMtfState(prev, questionId, Number(rowIndex), bool === "true"));
    },
    "input-short": (el) => {
      if (!(el instanceof HTMLInputElement) || !el.dataset.questionId) return;
      const qid = el.dataset.questionId;
      const val = el.value;
      store.setState((prev) => {
        const isSim = prev.mode === "sim";
        const target = isSim ? prev.simAnswers : prev.learnAnswers;
        const nextMap = { ...target, [qid]: { ...target[qid], short: val } };
        return isSim ? { ...prev, simAnswers: nextMap } : { ...prev, learnAnswers: nextMap };
      });
    },
    "toggle-hint": (el) => {
      const qid = el.dataset.questionId;
      if (!qid) return;
      store.setState((prev) => ({
        ...prev,
        revealedHints: { ...prev.revealedHints, [qid]: !prev.revealedHints[qid] },
      }));
    },
    "check-question": (el) => {
      const qid = el.dataset.questionId;
      if (!qid) return;
      store.setState((prev) => {
        const nextChecked = { ...prev.checkedLearn };
        if (nextChecked[qid]) delete nextChecked[qid];
        else nextChecked[qid] = true;
        return { ...prev, checkedLearn: nextChecked };
      });
    },
    "start-sim": () => {
      store.setState((prev) => ({
        ...prev,
        simStarted: true,
        simSubmitted: false,
        simSecondsLeft: EXAM_DURATION_SECONDS,
        banner: { kind: "success", text: "Timer simulasi 120 menit dimulai. Selamat mengerjakan!" },
      }));
    },
    "ask-submit-sim": () => qsDialog(appRoot, '[data-ref="confirm-dialog"]').showModal(),
    "reset-sim": () => {
      store.setState((prev) => ({
        ...prev,
        simStarted: false,
        simSubmitted: false,
        simAnswers: {},
        simSecondsLeft: EXAM_DURATION_SECONDS,
        banner: { kind: "warning", text: "Simulasi direset ke kondisi awal." },
      }));
    },
    "jump-question": (el) => {
      const qnum = el.dataset.qnum;
      if (!qnum) return;
      for (const node of appRoot.querySelectorAll('[data-ui="question-card"]')) {
        if (qs(node, '[data-ref="q-num"]').textContent === `Soal #${qnum}`) {
          node.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        }
      }
    },
  };
}
