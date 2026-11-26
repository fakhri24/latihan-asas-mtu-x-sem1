import { BAB1_EKSPONEN_LATIHAN_A } from "./bab1-eksponen-a.js";
import { BAB1_EKSPONEN_LATIHAN_B } from "./bab1-eksponen-b.js";
import { BAB4_LOGARITMA_LATIHAN_A } from "./bab4-logaritma-a.js";
import { BAB4_LOGARITMA_LATIHAN_B } from "./bab4-logaritma-b.js";
import { BAB5_KUADRAT_LATIHAN_A } from "./bab5-kuadrat-a.js";
import { BAB5_KUADRAT_LATIHAN_B } from "./bab5-kuadrat-b.js";
import { BAB7_FUNGSI_LATIHAN_A } from "./bab7-fungsi-a.js";
import { BAB7_FUNGSI_LATIHAN_B } from "./bab7-fungsi-b.js";

/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {readonly QuestionItem[]} */
export const PRACTICE_QUESTIONS = Object.freeze([
  ...BAB1_EKSPONEN_LATIHAN_A,
  ...BAB1_EKSPONEN_LATIHAN_B,
  ...BAB4_LOGARITMA_LATIHAN_A,
  ...BAB4_LOGARITMA_LATIHAN_B,
  ...BAB7_FUNGSI_LATIHAN_A,
  ...BAB7_FUNGSI_LATIHAN_B,
  ...BAB5_KUADRAT_LATIHAN_A,
  ...BAB5_KUADRAT_LATIHAN_B,
]);
