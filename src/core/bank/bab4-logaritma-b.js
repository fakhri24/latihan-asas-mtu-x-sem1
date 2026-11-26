/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB4_LOGARITMA_LATIHAN_B = [
  {
    number: 16,
    id: "lat-16",
    chapter: "bab4",
    topic: "Operasi Campuran Tambah-Kurang",
    tier: "inti",
    type: "pg",
    prompt: "Nilai dari $${}^3\\log 18 + {}^3\\log 12 - {}^3\\log 8$$ adalah $\\dots$",
    options: {
      A: "$1$",
      B: "$2$",
      C: "$3$",
      D: "$4$",
      E: "$9$",
    },
    correctKey: "C",
    hint: "Gabungkan ketiga logaritma basis $3$ ke dalam satu pecahan numerus $\\frac{18 \\cdot 12}{8}$.",
    solution:
      "Karena basis semuanya $3$, gabungkan numerusnya:\n$$\\begin{aligned}\n{}^3\\log 18 + {}^3\\log 12 - {}^3\\log 8 &= {}^3\\log\\left(\\frac{18 \\cdot 12}{8}\\right) \\\\\n&= {}^3\\log\\left(\\frac{216}{8}\\right) \\\\\n&= {}^3\\log 27 \\\\\n&= {}^3\\log 3^3 \\\\\n&= \\boxed{3}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 17,
    id: "lat-17",
    chapter: "bab4",
    topic: "Pola Selisih Kuadrat Logaritma",
    tier: "inti",
    type: "pg",
    prompt:
      "Untuk $m, n > 0$ dan $m \\neq n$, bentuk sederhana dari $$\\dfrac{({}^3\\log m)^2 - ({}^3\\log n)^2}{{}^3\\log m - {}^3\\log n}$$ adalah $\\dots$",
    options: {
      A: "${}^3\\log(m + n)$",
      B: "${}^3\\log(mn)$",
      C: "${}^3\\log\\left(\\dfrac{m}{n}\\right)$",
      D: "${}^3\\log(m - n)$",
      E: "$1$",
    },
    correctKey: "B",
    hint: "Faktorkan pembilang memakai pola $A^2 - B^2 = (A - B)(A + B)$.",
    solution:
      "Misalkan $A = {}^3\\log m$ dan $B = {}^3\\log n$:\n$$\\begin{aligned}\n\\frac{A^2 - B^2}{A - B} &= \\frac{(A - B)(A + B)}{A - B} \\\\\n&= A + B \\\\\n&= {}^3\\log m + {}^3\\log n \\\\\n&= \\boxed{{}^3\\log(mn)}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 18,
    id: "lat-18",
    chapter: "bab4",
    topic: "Persamaan Logaritma Basis Tertukar",
    tier: "inti",
    type: "pg",
    prompt:
      "Nilai $x$ yang memenuhi persamaan $${}^p\\log(2x + 3) \\cdot {}^3\\log p = 2$$ dengan $p > 0, p \\neq 1$ adalah $\\dots$",
    options: {
      A: "$2$",
      B: "$3$",
      C: "$4$",
      D: "$6$",
      E: "$9$",
    },
    correctKey: "B",
    hint: "Tukarkan urutan faktor perkalian agar basis $p$ saling menyambung dengan numerus $p$.",
    solution:
      "Gunakan sifat rantai ${}^3\\log p \\cdot {}^p\\log(2x + 3) = {}^3\\log(2x + 3)$:\n$$\\begin{aligned}\n{}^3\\log(2x + 3) &= 2 \\\\\n2x + 3 &= 3^2 \\\\\n2x + 3 &= 9 \\\\\n2x &= 6 \\\\\nx &= \\boxed{3}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 19,
    id: "lat-19",
    chapter: "bab4",
    topic: "Persamaan Logaritma Ekstraksi Basis",
    tier: "inti",
    type: "pg",
    prompt:
      "Nilai $x$ positif yang memenuhi persamaan $${}^5\\log x \\cdot {}^3\\log 125 = 6$$ adalah $\\dots$",
    options: {
      A: "$6$",
      B: "$8$",
      C: "$9$",
      D: "$15$",
      E: "$25$",
    },
    correctKey: "C",
    hint: "Ubah ${}^3\\log 125 = {}^3\\log 5^3 = 3 \\cdot {}^3\\log 5$, lalu sambungkan basis $5$.",
    solution:
      "Sederhanakan ${}^3\\log 125$ terlebih dahulu:\n$$\\begin{aligned}\n{}^5\\log x \\cdot {}^3\\log 5^3 &= 6 \\\\\n3 \\cdot ({}^3\\log 5 \\cdot {}^5\\log x) &= 6 \\\\\n3 \\cdot {}^3\\log x &= 6 \\\\\n{}^3\\log x &= 2 \\\\\nx &= 3^2 \\\\\nx &= \\boxed{9}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 20,
    id: "lat-20",
    chapter: "bab4",
    topic: "Perubahan Basis 2 Variabel",
    tier: "inti",
    type: "pg",
    prompt:
      "Diketahui ${}^2\\log 3 = a$ dan ${}^3\\log 5 = b$. Nilai dari $${}^6\\log 20$$ dalam $a$ dan $b$ adalah $\\dots$",
    options: {
      A: "$\\dfrac{1 + ab}{1 + a}$",
      B: "$\\dfrac{2 + ab}{1 + a}$",
      C: "$\\dfrac{2 + b}{1 + a}$",
      D: "$\\dfrac{1 + 2ab}{1 + a}$",
      E: "$\\dfrac{2 + ab}{a + b}$",
    },
    correctKey: "B",
    hint: "Ubah ${}^6\\log 20$ ke basis $2$ menjadi $\\frac{{}^2\\log 20}{{}^2\\log 6}$, dan ingat ${}^2\\log 5 = {}^2\\log 3 \\cdot {}^3\\log 5$.",
    solution:
      "Tentukan dulu ${}^2\\log 5 = {}^2\\log 3 \\cdot {}^3\\log 5 = ab$, lalu ubah ke basis $2$:\n$$\\begin{aligned}\n{}^6\\log 20 &= \\frac{{}^2\\log(2^2 \\cdot 5)}{{}^2\\log(2 \\cdot 3)} \\\\\n&= \\frac{{}^2\\log 2^2 + {}^2\\log 5}{{}^2\\log 2 + {}^2\\log 3} \\\\\n&= \\boxed{\\frac{2 + ab}{1 + a}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
];
