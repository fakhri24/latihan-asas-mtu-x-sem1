/** @typedef {import("./types.js").QuestionItem} QuestionItem */
/** @typedef {import("./types.js").StudentAnswer} StudentAnswer */
/** @typedef {import("./types.js").ChapterCode} ChapterCode */

/**
 * Menormalkan input teks jawaban singkat menjadi string bilangan bulat bersih.
 * @param {unknown} rawValue
 * @returns {string}
 */
export function normalizeShortAnswer(rawValue) {
  if (typeof rawValue !== "string" && typeof rawValue !== "number") return "";
  const cleaned = String(rawValue).trim().replaceAll(/\s+/g, "");
  if (cleaned.length === 0) return "";
  if (!/^-?\d+$/.test(cleaned)) return cleaned;
  const parsed = Number(cleaned);
  return Number.isSafeInteger(parsed) ? String(parsed) : cleaned;
}

/**
 * Memeriksa apakah suatu soal sudah diisi jawabannya oleh peserta.
 * @param {QuestionItem} question
 * @param {StudentAnswer | undefined} answer
 * @returns {boolean}
 */
export function isQuestionAnswered(question, answer) {
  if (!answer) return false;
  if (question.type === "pg") return typeof answer.pg === "string" && answer.pg.length > 0;
  if (question.type === "pgk") return Array.isArray(answer.pgk) && answer.pgk.length > 0;
  if (question.type === "short") return normalizeShortAnswer(answer.short).length > 0;
  if (question.type === "mtf") {
    return (
      Array.isArray(answer.mtf) &&
      answer.mtf.length === 3 &&
      answer.mtf.every((item) => typeof item === "boolean")
    );
  }
  return false;
}

/**
 * Menilai jawaban PG Kompleks dengan urutan kunci terabaikan.
 * @param {readonly string[]} expected
 * @param {readonly string[] | undefined} actual
 * @returns {boolean}
 */
function gradePgk(expected, actual) {
  if (!Array.isArray(actual) || actual.length !== expected.length) return false;
  const expectedSet = new Set(expected);
  const actualSet = new Set(actual);
  if (actualSet.size !== expectedSet.size) return false;
  for (const key of expectedSet) {
    if (!actualSet.has(key)) return false;
  }
  return true;
}

/**
 * Menilai ketepatan satu butir soal secara murni tanpa side effect.
 * @param {QuestionItem} question
 * @param {StudentAnswer | undefined} answer
 * @returns {boolean}
 */
export function gradeQuestion(question, answer) {
  if (!answer || !isQuestionAnswered(question, answer)) return false;
  if (question.type === "pg") {
    return answer.pg === question.correctKey;
  }
  if (question.type === "pgk") {
    return gradePgk(question.correctKeys ?? [], answer.pgk);
  }
  if (question.type === "mtf") {
    const expected = question.correctBooleans ?? [];
    const actual = answer.mtf ?? [];
    return (
      expected.length === 3 &&
      actual.length === 3 &&
      expected.every((val, idx) => actual[idx] === val)
    );
  }
  if (question.type === "short") {
    const target = normalizeShortAnswer(question.correctInteger);
    return target.length > 0 && normalizeShortAnswer(answer.short) === target;
  }
  return false;
}

/**
 * Menghitung ringkasan skor total dan rincian per bab secara deterministik.
 * @param {readonly QuestionItem[]} questions
 * @param {Record<string, StudentAnswer>} answers
 * @returns {{
 *   total: number,
 *   answered: number,
 *   correct: number,
 *   score: number,
 *   byChapter: Record<ChapterCode, { total: number, answered: number, correct: number }>
 * }}
 */
export function computeSummary(questions, answers) {
  /** @type {Record<ChapterCode, { total: number, answered: number, correct: number }>} */
  const byChapter = {
    bab1: { total: 0, answered: 0, correct: 0 },
    bab4: { total: 0, answered: 0, correct: 0 },
    bab7: { total: 0, answered: 0, correct: 0 },
    bab5: { total: 0, answered: 0, correct: 0 },
  };
  let answered = 0;
  let correct = 0;

  for (const q of questions) {
    const bucket = byChapter[q.chapter];
    bucket.total += 1;
    const ans = answers[q.id];
    if (isQuestionAnswered(q, ans)) {
      answered += 1;
      bucket.answered += 1;
    }
    if (gradeQuestion(q, ans)) {
      correct += 1;
      bucket.correct += 1;
    }
  }

  const total = questions.length;
  const score = total === 0 ? 0 : Math.round((correct / total) * 100);
  return { total, answered, correct, score, byChapter };
}
