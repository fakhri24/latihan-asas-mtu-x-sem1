import { PRACTICE_QUESTIONS } from "./core/bank/practice-bank.js";
import { createStore } from "./core/store.js";
import { createEmptyProgress, sanitizeStoredProgress } from "./core/validate.js";
import { createActions } from "./ui/actions.js";
import { renderMathInContainer } from "./ui/dom.js";
import { attachErrorBoundary } from "./ui/error-boundary.js";
import { renderApp } from "./ui/render-app.js";
import { isStudioFlagEnabled, loadTeacherAsasBank } from "./ui/teacher-loader.js";

/** @typedef {import("./core/types.js").AppState} AppState */

const STORAGE_KEY = "asas-mtu-x-sem1-progress-v1";
const THEME_KEY = "asas-mtu-x-sem1-theme-v1";

/**
 * Memuat progres latihan dan simulasi dari localStorage dengan pemulihan aman.
 * @returns {{ progress: import("./core/validate.js").PersistedProgress, recovered: boolean }}
 */
function loadSavedProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return { progress: createEmptyProgress(), recovered: false };
  }
  const result = sanitizeStoredProgress(raw);
  return { progress: result.progress, recovered: result.recoveredFromCorruption };
}

/**
 * Menyimpan snapshot progres siswa tanpa menyimpan data naskah guru.
 * @param {AppState} state
 */
function persistProgress(state) {
  const payload = {
    learnAnswers: state.learnAnswers,
    checkedLearn: state.checkedLearn,
    simAnswers: state.simAnswers,
    simStarted: state.simStarted,
    simSubmitted: state.simSubmitted,
    simSecondsLeft: state.simSecondsLeft,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  localStorage.setItem(THEME_KEY, state.theme);
}

async function bootstrap() {
  const appRoot = document.getElementById("app");
  if (!(appRoot instanceof HTMLElement)) {
    throw new Error("Kontainer akar #app tidak ditemukan.");
  }

  const studioAvailable = isStudioFlagEnabled();
  const asasQuestions = studioAvailable ? await loadTeacherAsasBank() : null;
  const saved = loadSavedProgress();
  const savedTheme = localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";

  /** @type {AppState} */
  const initialState = {
    theme: savedTheme,
    studioAvailable: Boolean(asasQuestions),
    dataset: "latihan",
    mode: "learn",
    chapterFilter: "all",
    tierFilter: "all",
    statusFilter: "all",
    searchQuery: "",
    showAllSolutions: false,
    printWithSolutions: false,
    revealedHints: {},
    checkedLearn: saved.progress.checkedLearn,
    learnAnswers: saved.progress.learnAnswers,
    simAnswers: saved.progress.simAnswers,
    simStarted: saved.progress.simStarted,
    simSubmitted: saved.progress.simSubmitted,
    simSecondsLeft: saved.progress.simSecondsLeft,
    exportTab: "xlsx40",
    guideTab: "rumus",
    banner: saved.recovered
      ? {
          kind: "warning",
          text: "Data progres lokal yang rusak berhasil dipulihkan otomatis.",
        }
      : { kind: "closed", text: "" },
  };

  const lifecycleController = new AbortController();
  const { signal } = lifecycleController;
  const store = createStore(initialState);
  const actions = createActions(appRoot, store, asasQuestions, signal);

  let prevRenderedState = store.getState();

  store.subscribe(
    (nextState) => {
      persistProgress(nextState);
      renderApp(appRoot, nextState, PRACTICE_QUESTIONS, asasQuestions, prevRenderedState);
      prevRenderedState = nextState;
    },
    { signal },
  );

  document.body.addEventListener(
    "click",
    (event) => {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest("[data-action]");
      if (
        !(trigger instanceof HTMLElement) ||
        trigger.tagName === "FORM" ||
        trigger instanceof HTMLInputElement ||
        trigger instanceof HTMLTextAreaElement ||
        trigger instanceof HTMLSelectElement
      ) {
        return;
      }
      const actionName = trigger.dataset.action;
      if (actionName && Object.hasOwn(actions, actionName)) {
        actions[actionName](trigger, event);
      }
    },
    { signal },
  );

  appRoot.addEventListener(
    "input",
    (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      const actionName = event.target.dataset.action;
      if (actionName && Object.hasOwn(actions, actionName)) {
        actions[actionName](event.target, event);
      }
    },
    { signal },
  );

  attachErrorBoundary((message) => {
    store.setState((prev) => ({ ...prev, banner: { kind: "error", text: message } }));
  }, signal);

  renderApp(appRoot, prevRenderedState, PRACTICE_QUESTIONS, asasQuestions, null);
  renderMathInContainer(document.body);
}

void bootstrap();
