/** @typedef {import("./types.js").QuestionItem} QuestionItem */

const FORBIDDEN_ARROW_UNICODE = String.fromCodePoint(0x21d2);
const FORBIDDEN_LATEX_BS = String.fromCharCode(92);

/**
 * Memeriksa apakah teks mengandung tag HTML atau simbol/delimiter LaTeX terlarang.
 * @param {string} combined
 * @returns {boolean}
 */
function hasForbiddenMarkupOrLatex(combined) {
  if (/<[a-z][\s\S]*>/i.test(combined)) return true;
  if (combined.includes(FORBIDDEN_ARROW_UNICODE)) return true;
  if (combined.includes(`${FORBIDDEN_LATEX_BS}Rightarrow`)) return true;
  if (combined.includes(`${FORBIDDEN_LATEX_BS}implies`)) return true;
  if (combined.includes(`${FORBIDDEN_LATEX_BS}(`)) return true;
  return combined.includes(`${FORBIDDEN_LATEX_BS}[`);
}

/**
 * Memeriksa kelayakan isi satu paket 40 soal terhadap kuota, ID, dan aturan LaTeX.
 * @param {readonly QuestionItem[]} questions
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateBankIntegrity(questions) {
  /** @type {string[]} */
  const errors = [];
  if (questions.length !== 40) {
    errors.push(`Jumlah soal harus 40, ditemukan ${questions.length}.`);
  }
  const seenIds = new Set();
  const seenNumbers = new Set();

  for (const q of questions) {
    if (seenIds.has(q.id)) errors.push(`ID duplikat: ${q.id}`);
    seenIds.add(q.id);
    if (seenNumbers.has(q.number)) errors.push(`Nomor duplikat: ${q.number}`);
    seenNumbers.add(q.number);

    const combined = `${q.prompt} ${q.hint} ${q.solution}`;
    if (hasForbiddenMarkupOrLatex(combined)) {
      errors.push(`Markup atau delimiter terlarang pada soal #${q.number}`);
    }
  }
  return { ok: errors.length === 0, errors };
}
