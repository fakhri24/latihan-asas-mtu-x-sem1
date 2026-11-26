import { BAB1_GUIDE } from "./bab1-guide.js";
import { BAB4_GUIDE } from "./bab4-guide.js";
import { BAB5_GUIDE } from "./bab5-guide.js";
import { BAB7_GUIDE } from "./bab7-guide.js";

/**
 * @typedef {{
 *   label: string,
 *   lines: readonly string[]
 * }} FormulaEntry
 *
 * @typedef {{
 *   title: string,
 *   problem: string,
 *   steps: string
 * }} WorkedExample
 *
 * @typedef {{
 *   chapter: import("../types.js").ChapterCode,
 *   badge: string,
 *   title: string,
 *   tagline: string,
 *   formulas: readonly FormulaEntry[],
 *   keyPoints: readonly string[],
 *   quickFlow: readonly string[],
 *   examples: readonly WorkedExample[],
 *   pitfalls: readonly string[]
 * }} ChapterGuide
 */

/** @type {readonly ChapterGuide[]} */
export const STUDY_GUIDE_CHAPTERS = Object.freeze([BAB1_GUIDE, BAB4_GUIDE, BAB7_GUIDE, BAB5_GUIDE]);
