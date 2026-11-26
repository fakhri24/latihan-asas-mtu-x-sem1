import { computeSummary, isQuestionAnswered } from "../core/grader.js";
import { CHAPTER_META } from "../core/types.js";
import { cloneTemplateElement, formatClock, qs, qsTemplate } from "./dom.js";

/** @typedef {import("../core/types.js").QuestionItem} QuestionItem */
/** @typedef {import("../core/types.js").AppState} AppState */

/**
 * Menyelaraskan status aktif sekumpulan tombol berdasarkan atribut data tertentu.
 * @param {ParentNode} root
 * @param {string} selector
 * @param {string} dataKey
 * @param {string} activeValue
 */
export function syncToggleButtons(root, selector, dataKey, activeValue) {
  for (const btn of root.querySelectorAll(selector)) {
    if (!(btn instanceof HTMLElement)) continue;
    const isActive = btn.dataset[dataKey] === activeValue;
    btn.dataset.state = isActive ? "active" : "inactive";
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  }
}

/**
 * Menyelaraskan teks dan status tombol mode gelap/terang pada header.
 * @param {AppState["theme"]} theme
 */
function syncThemeButton(theme) {
  const themeBtn = document.querySelector('[data-ref="theme-toggle"]');
  if (!(themeBtn instanceof HTMLElement)) return;
  const isDark = theme === "dark";
  themeBtn.textContent = isDark ? "Mode Terang" : "Mode Gelap";
  themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
}

/**
 * Mengatur visibilitas panel pendidik/siswa dan menyinkronkan atribut global dokumen.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 * @param {boolean} hasAsas
 */
export function renderHeaderAndStudio(appRoot, state, hasAsas) {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.dataset.printSolutions = state.printWithSolutions ? "open" : "closed";
  syncThemeButton(state.theme);

  const studentGuide = appRoot.querySelector('[data-ref="student-guide-bar"]');
  if (studentGuide instanceof HTMLElement) {
    studentGuide.dataset.state = hasAsas ? "closed" : "open";
  }

  const studioBar = appRoot.querySelector('[data-ref="studio-bar"]');
  if (!(studioBar instanceof HTMLElement)) return;
  studioBar.dataset.state = hasAsas ? "open" : "closed";
  if (!hasAsas) return;

  syncToggleButtons(studioBar, '[data-action="set-dataset"]', "dataset", state.dataset);
  const keyBtn = qs(studioBar, '[data-action="toggle-all-solutions"]');
  keyBtn.textContent = state.showAllSolutions
    ? "Tutup Kunci Guru"
    : "Buka Semua Kunci & Pembahasan";
  keyBtn.setAttribute("aria-pressed", state.showAllSolutions ? "true" : "false");
}

/**
 * Memperbarui tab mode Belajar vs Simulasi dan tombol filter bab/tier/status.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 * @param {boolean} hasAsas
 */
export function renderControls(appRoot, state, hasAsas) {
  const isMirror = hasAsas && state.dataset === "mirror";
  qs(appRoot, '[data-ref="mode-bar"]').dataset.state = isMirror ? "closed" : "open";
  syncToggleButtons(appRoot, '[data-action="set-mode"]', "mode", state.mode);

  const filterPanel = qs(appRoot, '[data-ref="learn-filters"]');
  filterPanel.dataset.state = state.mode === "learn" || isMirror ? "open" : "closed";
  syncToggleButtons(filterPanel, '[data-action="set-chapter"]', "chapter", state.chapterFilter);

  const tierGroup = filterPanel.querySelector('[data-ref="tier-filter-group"]');
  if (tierGroup instanceof HTMLElement) {
    tierGroup.dataset.state = hasAsas && state.dataset !== "latihan" ? "open" : "closed";
    syncToggleButtons(tierGroup, '[data-action="set-tier"]', "tier", state.tierFilter);
  }
  syncToggleButtons(filterPanel, '[data-action="set-status"]', "status", state.statusFilter);
}

/**
 * Memperbarui 4 kartu metrik ringkasan serta judul KOP cetak PDF A4.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 * @param {readonly QuestionItem[]} activeQuestions
 */
export function renderStatsAndKop(appRoot, state, activeQuestions) {
  const answers = state.mode === "sim" ? state.simAnswers : state.learnAnswers;
  const summary = computeSummary(activeQuestions, answers);
  const learnChecked = Object.keys(state.checkedLearn).length;
  const simChecked = state.simSubmitted ? summary.total : 0;
  const checkedCount = state.mode === "sim" ? simChecked : learnChecked;

  qs(appRoot, '[data-ref="stat-total"]').textContent = String(summary.total);
  qs(appRoot, '[data-ref="stat-answered"]').textContent = `${summary.answered} / ${summary.total}`;
  qs(appRoot, '[data-ref="stat-checked"]').textContent = String(checkedCount);
  qs(appRoot, '[data-ref="stat-score"]').textContent =
    checkedCount > 0 || state.simSubmitted ? `${summary.score}%` : "—";

  const printTitle = document.querySelector('[data-ref="print-doc-title"]');
  if (printTitle instanceof HTMLElement) {
    printTitle.textContent =
      state.studioAvailable && state.dataset === "asas"
        ? "Naskah Asesmen Sumatif Akhir Semester (ASAS) — Matematika Umum Kelas X"
        : "Latihan Pemantapan Pra-ASAS — Matematika Umum Kelas X Semester 1";
  }
}

/**
 * Memperbarui panel simulasi 120 menit, grid nomor 1–40, serta rekap nilai akhir.
 * @param {HTMLElement} appRoot
 * @param {AppState} state
 * @param {readonly QuestionItem[]} activeQuestions
 */
export function renderSimulationBar(appRoot, state, activeQuestions) {
  const simPanel = qs(appRoot, '[data-ref="sim-panel"]');
  const showSim = state.mode === "sim" && !(state.studioAvailable && state.dataset === "mirror");
  simPanel.dataset.state = showSim ? "open" : "closed";
  if (!showSim) return;

  qs(simPanel, '[data-ref="sim-clock"]').textContent = formatClock(state.simSecondsLeft);
  qs(simPanel, '[data-action="start-sim"]').dataset.state = state.simStarted ? "closed" : "open";
  qs(simPanel, '[data-action="ask-submit-sim"]').dataset.state =
    state.simStarted && !state.simSubmitted ? "open" : "closed";
  qs(simPanel, '[data-action="reset-sim"]').dataset.state = state.simStarted ? "open" : "closed";

  const navGrid = qs(simPanel, '[data-ref="sim-nav-grid"]');
  const tplNav = qsTemplate(appRoot, '[data-ref="tpl-sim-nav-btn"]');
  const navNodes = activeQuestions.map((q) => {
    const btn = cloneTemplateElement(tplNav);
    btn.textContent = String(q.number);
    btn.dataset.qnum = String(q.number);
    btn.dataset.state = isQuestionAnswered(q, state.simAnswers[q.id]) ? "answered" : "idle";
    return btn;
  });
  navGrid.replaceChildren(...navNodes);

  const resultBox = qs(simPanel, '[data-ref="sim-result-box"]');
  resultBox.dataset.state = state.simSubmitted ? "open" : "closed";
  if (!state.simSubmitted) return;

  const summary = computeSummary(activeQuestions, state.simAnswers);
  qs(resultBox, '[data-ref="sim-final-score"]').textContent = `${summary.score} / 100`;
  qs(resultBox, '[data-ref="sim-final-detail"]').textContent =
    `Benar ${summary.correct} dari ${summary.total} soal`;

  const tplChip = qsTemplate(appRoot, '[data-ref="tpl-chapter-chip"]');
  const chips = Object.values(CHAPTER_META).map((meta) => {
    const chip = cloneTemplateElement(tplChip);
    const info = summary.byChapter[meta.code];
    chip.textContent = `${meta.badge}: ${info.correct}/${info.total}`;
    return chip;
  });
  qs(resultBox, '[data-ref="sim-chapter-breakdown"]').replaceChildren(...chips);
}
