import { qsDialog, renderMathInContainer } from "./dom.js";
import { createExamActions } from "./exam-actions.js";
import { createStudioActions } from "./studio-actions.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").AppState} AppState */
/** @typedef {{ getState: () => AppState, setState: (u: (s: AppState) => AppState) => void }} AppStore */

/**
 * Membangun handler aksi terpusat untuk navigasi, filter, simulasi 120 menit, dan panel guru.
 * @param {HTMLElement} appRoot
 * @param {AppStore} store
 * @param {readonly QuestionItem[] | null} asasQuestions
 * @param {AbortSignal} signal
 * @returns {Record<string, (triggerEl: HTMLElement, event: Event) => void>}
 */
export function createActions(appRoot, store, asasQuestions, signal) {
  const timerId = globalThis.setInterval(() => {
    const cur = store.getState();
    if (cur.mode !== "sim" || !cur.simStarted || cur.simSubmitted) return;
    if (cur.simSecondsLeft <= 1) {
      store.setState((prev) => ({
        ...prev,
        simSecondsLeft: 0,
        simSubmitted: true,
        banner: {
          kind: "warning",
          text: "Waktu simulasi 120 menit habis. Nilai akhir ditampilkan.",
        },
      }));
      return;
    }
    store.setState((prev) => ({ ...prev, simSecondsLeft: prev.simSecondsLeft - 1 }));
  }, 1000);

  signal.addEventListener("abort", () => globalThis.clearInterval(timerId), { once: true });

  qsDialog(appRoot, '[data-ref="confirm-dialog"]').addEventListener(
    "close",
    (event) => {
      const dialog = event.currentTarget;
      if (!(dialog instanceof HTMLDialogElement)) return;
      if (dialog.returnValue === "confirm") {
        store.setState((prev) => ({
          ...prev,
          simSubmitted: true,
          banner: {
            kind: "success",
            text: "Simulasi selesai dikumpulkan. Silakan tinjau hasilnya.",
          },
        }));
      }
    },
    { signal },
  );

  return {
    ...createStudioActions(appRoot, store, asasQuestions),
    ...createExamActions(appRoot, store),
    "toggle-theme": () => {
      store.setState((prev) => ({ ...prev, theme: prev.theme === "light" ? "dark" : "light" }));
    },
    "open-guide-modal": () => {
      const dialog = qsDialog(appRoot, '[data-ref="guide-dialog"]');
      renderMathInContainer(dialog);
      dialog.showModal();
    },
    "switch-guide-tab": (el) => {
      const tab = el.dataset.tab;
      if (tab !== "rumus" && tab !== "materi") return;
      store.setState((prev) => ({ ...prev, guideTab: tab }));
      renderMathInContainer(qsDialog(appRoot, '[data-ref="guide-dialog"]'));
    },
    "set-mode": (el) => {
      const mode = el.dataset.mode;
      if (mode !== "learn" && mode !== "sim") return;
      store.setState((prev) => ({ ...prev, mode, banner: { kind: "closed", text: "" } }));
    },
    "set-chapter": (el) => {
      const ch = el.dataset.chapter;
      if (ch !== "all" && ch !== "bab1" && ch !== "bab4" && ch !== "bab7" && ch !== "bab5") return;
      store.setState((prev) => ({ ...prev, chapterFilter: ch }));
    },
    "set-tier": (el) => {
      const tier = el.dataset.tier;
      if (tier !== "all" && tier !== "inti" && tier !== "pembeda") return;
      store.setState((prev) => ({ ...prev, tierFilter: tier }));
    },
    "set-status": (el) => {
      const st = el.dataset.status;
      if (st !== "all" && st !== "unanswered" && st !== "wrong" && st !== "correct") return;
      store.setState((prev) => ({ ...prev, statusFilter: st }));
    },
    "search-input": (el) => {
      if (el instanceof HTMLInputElement) {
        store.setState((prev) => ({ ...prev, searchQuery: el.value }));
      }
    },
    "print-pdf": (el) => {
      const withSolutions = el.dataset.solutions === "true";
      document.documentElement.dataset.printSolutions = withSolutions ? "open" : "closed";
      store.setState((prev) => ({ ...prev, printWithSolutions: withSolutions }));
      globalThis.setTimeout(() => globalThis.print(), 60);
    },
  };
}
