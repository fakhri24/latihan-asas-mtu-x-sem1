import { EXAM_DURATION_SECONDS } from "./types.js";

/** @typedef {import("./types.js").StudentAnswer} StudentAnswer */

/**
 * @typedef {{
 *   learnAnswers: Record<string, StudentAnswer>,
 *   checkedLearn: Record<string, boolean>,
 *   simAnswers: Record<string, StudentAnswer>,
 *   simStarted: boolean,
 *   simSubmitted: boolean,
 *   simSecondsLeft: number
 * }} PersistedProgress
 */

/**
 * Membuat salinan status progres bawaan yang bersih.
 * @returns {PersistedProgress}
 */
export function createEmptyProgress() {
  return {
    learnAnswers: {},
    checkedLearn: {},
    simAnswers: {},
    simStarted: false,
    simSubmitted: false,
    simSecondsLeft: EXAM_DURATION_SECONDS,
  };
}

/**
 * Menormalkan satu objek jawaban siswa agar bertipe aman dan bebas field tak dikenal.
 * @param {unknown} raw
 * @returns {StudentAnswer | null}
 */
function sanitizeAnswerEntry(raw) {
  if (typeof raw !== "object" || raw === null) return null;
  const rec = /** @type {Record<string, unknown>} */ (raw);
  /** @type {StudentAnswer} */
  const clean = {};

  if (typeof rec.pg === "string" && ["A", "B", "C", "D", "E"].includes(rec.pg)) {
    clean.pg = rec.pg;
  }
  if (Array.isArray(rec.pgk)) {
    clean.pgk = rec.pgk.filter((k) => typeof k === "string" && ["A", "B", "C", "D"].includes(k));
  }
  if (Array.isArray(rec.mtf) && rec.mtf.length === 3) {
    clean.mtf = rec.mtf.map((v) => (typeof v === "boolean" ? v : null));
  }
  if (typeof rec.short === "string") {
    clean.short = rec.short.slice(0, 24);
  }

  return Object.keys(clean).length > 0 ? clean : null;
}

/**
 * Menormalkan peta jawaban dari objek mentah JSON.
 * @param {unknown} rawMap
 * @returns {{ map: Record<string, StudentAnswer>, dropped: boolean }}
 */
function sanitizeAnswerMap(rawMap) {
  if (typeof rawMap !== "object" || rawMap === null || Array.isArray(rawMap)) {
    return { map: {}, dropped: rawMap !== undefined };
  }
  /** @type {Record<string, StudentAnswer>} */
  const map = {};
  let dropped = false;

  for (const [key, val] of Object.entries(rawMap)) {
    if (!/^(lat|asas)-(0[1-9]|[1-3]\d|40)$/.test(key)) {
      dropped = true;
      continue;
    }
    const clean = sanitizeAnswerEntry(val);
    if (clean) map[key] = clean;
    else dropped = true;
  }
  return { map, dropped };
}

/**
 * Menormalkan peta boolean soal yang sudah dicek pada Mode Belajar.
 * @param {unknown} rawMap
 * @returns {{ map: Record<string, boolean>, dropped: boolean }}
 */
function sanitizeCheckedMap(rawMap) {
  if (typeof rawMap !== "object" || rawMap === null || Array.isArray(rawMap)) {
    return { map: {}, dropped: rawMap !== undefined };
  }
  /** @type {Record<string, boolean>} */
  const map = {};
  let dropped = false;

  for (const [key, val] of Object.entries(rawMap)) {
    if (typeof val === "boolean" && /^(lat|asas)-(0[1-9]|[1-3]\d|40)$/.test(key)) {
      if (val) map[key] = true;
    } else {
      dropped = true;
    }
  }
  return { map, dropped };
}

/**
 * Memulihkan progres latihan dan simulasi dari JSON tersimpan tanpa pernah melempar error.
 * @param {unknown} rawJson
 * @returns {{ progress: PersistedProgress, recoveredFromCorruption: boolean }}
 */
export function sanitizeStoredProgress(rawJson) {
  if (typeof rawJson !== "string" || rawJson.trim().length === 0) {
    return { progress: createEmptyProgress(), recoveredFromCorruption: false };
  }

  try {
    const parsed = /** @type {unknown} */ (JSON.parse(rawJson));
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return { progress: createEmptyProgress(), recoveredFromCorruption: true };
    }

    const rec = /** @type {Record<string, unknown>} */ (parsed);
    const learnRes = sanitizeAnswerMap(rec.learnAnswers);
    const checkedRes = sanitizeCheckedMap(rec.checkedLearn);
    const simRes = sanitizeAnswerMap(rec.simAnswers);
    const rawSec = rec.simSecondsLeft;
    const validSec =
      typeof rawSec === "number" &&
      Number.isInteger(rawSec) &&
      rawSec >= 0 &&
      rawSec <= EXAM_DURATION_SECONDS;

    const progress = {
      learnAnswers: learnRes.map,
      checkedLearn: checkedRes.map,
      simAnswers: simRes.map,
      simStarted: typeof rec.simStarted === "boolean" ? rec.simStarted : false,
      simSubmitted: typeof rec.simSubmitted === "boolean" ? rec.simSubmitted : false,
      simSecondsLeft: validSec ? rawSec : EXAM_DURATION_SECONDS,
    };

    const recovered =
      learnRes.dropped ||
      checkedRes.dropped ||
      simRes.dropped ||
      typeof rec.simStarted !== "boolean" ||
      typeof rec.simSubmitted !== "boolean" ||
      !validSec;

    return { progress, recoveredFromCorruption: recovered };
  } catch {
    return { progress: createEmptyProgress(), recoveredFromCorruption: true };
  }
}
