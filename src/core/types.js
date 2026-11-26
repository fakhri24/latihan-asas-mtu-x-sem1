/**
 * @typedef {"bab1" | "bab4" | "bab7" | "bab5"} ChapterCode
 * @typedef {"inti" | "pembeda"} QuestionTier
 * @typedef {"pg" | "pgk" | "mtf" | "short"} QuestionType
 * @typedef {"A" | "B" | "C" | "D" | "E"} OptionKey
 * @typedef {"A" | "B" | "C" | "D"} PgkOptionKey
 * @typedef {"all" | ChapterCode} ChapterFilter
 * @typedef {"all" | "inti" | "pembeda"} TierFilter
 * @typedef {"all" | "unanswered" | "wrong" | "correct"} StatusFilter
 * @typedef {"learn" | "sim"} ExamMode
 * @typedef {"latihan" | "asas" | "mirror"} DatasetKind
 *
 * @typedef {{
 *   title: string,
 *   text: string
 * }} StimulusBlock
 *
 * @typedef {{
 *   options: Record<OptionKey, string>,
 *   correctKey: OptionKey
 * }} FallbackPg
 *
 * @typedef {{
 *   number: number,
 *   id: string,
 *   chapter: ChapterCode,
 *   topic: string,
 *   tier: QuestionTier,
 *   type: QuestionType,
 *   stimulus?: StimulusBlock,
 *   prompt: string,
 *   options?: Record<string, string>,
 *   correctKey?: OptionKey,
 *   correctKeys?: PgkOptionKey[],
 *   statements?: [string, string, string],
 *   correctBooleans?: [boolean, boolean, boolean],
 *   correctInteger?: string,
 *   unitLabel?: string,
 *   fallbackPg?: FallbackPg,
 *   hint: string,
 *   solution: string
 * }} QuestionItem
 *
 * @typedef {{
 *   pg?: string,
 *   pgk?: string[],
 *   mtf?: (boolean | null)[],
 *   short?: string
 * }} StudentAnswer
 *
 * @typedef {{
 *   theme: "light" | "dark",
 *   studioAvailable: boolean,
 *   dataset: DatasetKind,
 *   mode: ExamMode,
 *   chapterFilter: ChapterFilter,
 *   tierFilter: TierFilter,
 *   statusFilter: StatusFilter,
 *   searchQuery: string,
 *   showAllSolutions: boolean,
 *   printWithSolutions: boolean,
 *   revealedHints: Record<string, boolean>,
 *   checkedLearn: Record<string, boolean>,
 *   learnAnswers: Record<string, StudentAnswer>,
 *   simAnswers: Record<string, StudentAnswer>,
 *   simStarted: boolean,
 *   simSubmitted: boolean,
 *   simSecondsLeft: number,
 *   exportTab: "xlsx40" | "pg28" | "manual12" | "pg40",
 *   guideTab: "rumus" | "materi",
 *   banner: { kind: "closed" | "error" | "warning" | "success", text: string }
 * }} AppState
 */

export const EXAM_DURATION_SECONDS = 7200;

/** @type {Record<ChapterCode, { code: ChapterCode, badge: string, title: string }>} */
export const CHAPTER_META = Object.freeze({
  bab1: { code: "bab1", badge: "Bab 1", title: "Eksponen & Bentuk Akar" },
  bab4: { code: "bab4", badge: "Bab 4", title: "Logaritma" },
  bab7: { code: "bab7", badge: "Bab 7", title: "Relasi & Fungsi" },
  bab5: { code: "bab5", badge: "Bab 5", title: "Persamaan Kuadrat" },
});

/** @type {Record<QuestionType, string>} */
export const TYPE_LABELS = Object.freeze({
  pg: "Pilihan Ganda",
  pgk: "PG Kompleks",
  mtf: "Benar / Salah",
  short: "Jawaban Singkat",
});
