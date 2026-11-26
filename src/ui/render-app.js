import { formatClock, qs, renderMathInContainer } from "./dom.js";
import { renderExportDialog } from "./export-modal.js";
import { renderGuideDialog } from "./guide-modal.js";
import {
  renderControls,
  renderHeaderAndStudio,
  renderSimulationBar,
  renderStatsAndKop,
} from "./render-controls.js";
import { syncMirrorList, syncSingleList } from "./render-list.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").AppState} AppState */

/**
 * Memeriksa apakah perubahan state murni berasal dari detik timer simulasi.
 * @param {AppState | null} prevState
 * @param {AppState} nextState
 * @returns {boolean}
 */
function isClockOnlyTick(prevState, nextState) {
  if (!prevState || prevState.simSecondsLeft === nextState.simSecondsLeft) return false;
  return (
    JSON.stringify({ ...prevState, simSecondsLeft: 0 }) ===
    JSON.stringify({ ...nextState, simSecondsLeft: 0 })
  );
}

/**
 * Merender seluruh tampilan aplikasi satu arah dari snapshot state dengan pembaruan inkremental aman.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 * @param {readonly QuestionItem[]} practiceQuestions
 * @param {readonly QuestionItem[] | null} asasQuestions
 * @param {AppState | null} [prevState]
 */
export function renderApp(appRoot, state, practiceQuestions, asasQuestions, prevState = null) {
  if (isClockOnlyTick(prevState, state)) {
    const simClock = appRoot.querySelector('[data-ref="sim-clock"]');
    if (simClock instanceof HTMLElement) simClock.textContent = formatClock(state.simSecondsLeft);
    return;
  }

  const validAsas = state.studioAvailable && Array.isArray(asasQuestions) ? asasQuestions : null;
  const hasAsas = validAsas !== null;
  const useAsas = validAsas !== null && state.dataset === "asas";
  const activeQuestions = useAsas ? validAsas : practiceQuestions;

  renderHeaderAndStudio(appRoot, state, hasAsas);
  const bannerEl = qs(appRoot, '[data-ref="alert-banner"]');
  bannerEl.dataset.state = state.banner.kind;
  bannerEl.textContent = state.banner.text;

  renderControls(appRoot, state, hasAsas);
  renderStatsAndKop(appRoot, state, activeQuestions);
  renderSimulationBar(appRoot, state, activeQuestions);

  const listEl = qs(appRoot, '[data-ref="question-list"]');
  const emptyEl = qs(appRoot, '[data-ref="empty-state"]');
  const result =
    validAsas !== null && state.dataset === "mirror"
      ? syncMirrorList(appRoot, listEl, state, practiceQuestions, validAsas)
      : syncSingleList(appRoot, listEl, state, activeQuestions, useAsas);

  emptyEl.dataset.state = result.count === 0 ? "open" : "closed";
  for (const node of result.added) renderMathInContainer(node);

  renderGuideDialog(appRoot, state);

  if (validAsas !== null) {
    renderExportDialog(appRoot, state, validAsas);
  }
}
