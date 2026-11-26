import { gradeQuestion, isQuestionAnswered } from "./grader.js";

/** @typedef {import("./types.js").QuestionItem} QuestionItem */
/** @typedef {import("./types.js").StudentAnswer} StudentAnswer */

/**
 * Memeriksa kecocokan pencarian pada nomor, topik, stimulus, dan teks soal.
 * @param {QuestionItem} q
 * @param {string} query
 * @returns {boolean}
 */
function matchesSearch(q, query) {
  if (query.length === 0) return true;
  const hay = `${q.number} ${q.topic} ${q.stimulus?.text ?? ""} ${q.prompt}`.toLowerCase();
  return hay.includes(query);
}

/**
 * Memeriksa kecocokan filter status pengerjaan soal.
 * @param {QuestionItem} q
 * @param {{
 *   statusFilter: import("./types.js").StatusFilter,
 *   answers: Record<string, StudentAnswer>,
 *   checkedMap: Record<string, boolean>,
 *   showAllStatus: boolean
 * }} criteria
 * @returns {boolean}
 */
function matchesStatus(q, criteria) {
  if (criteria.statusFilter === "all") return true;
  const ans = criteria.answers[q.id];
  const answered = isQuestionAnswered(q, ans);
  if (criteria.statusFilter === "unanswered") return !answered;
  const canEvaluate = criteria.showAllStatus || Boolean(criteria.checkedMap[q.id]);
  if (!canEvaluate) return false;
  const ok = gradeQuestion(q, ans);
  return criteria.statusFilter === "correct" ? ok : !ok;
}

/**
 * Menyaring daftar soal berdasarkan bab, tier, kata kunci, dan status pengerjaan.
 * @param {readonly QuestionItem[]} questions
 * @param {{
 *   chapterFilter: import("./types.js").ChapterFilter,
 *   tierFilter: import("./types.js").TierFilter,
 *   statusFilter: import("./types.js").StatusFilter,
 *   searchQuery: string,
 *   answers: Record<string, StudentAnswer>,
 *   checkedMap: Record<string, boolean>,
 *   showAllStatus: boolean
 * }} criteria
 * @returns {QuestionItem[]}
 */
export function filterQuestions(questions, criteria) {
  const query = criteria.searchQuery.trim().toLowerCase();
  return questions.filter((q) => {
    if (criteria.chapterFilter !== "all" && q.chapter !== criteria.chapterFilter) return false;
    if (criteria.tierFilter !== "all" && q.tier !== criteria.tierFilter) return false;
    if (!matchesSearch(q, query)) return false;
    return matchesStatus(q, criteria);
  });
}
