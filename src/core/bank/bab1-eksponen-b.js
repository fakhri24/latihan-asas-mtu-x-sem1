/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB1_EKSPONEN_LATIHAN_B = [
  {
    number: 6,
    id: "lat-06",
    chapter: "bab1",
    topic: "Perkalian Distributif Akar",
    tier: "inti",
    type: "pg",
    prompt: "Hasil dari $$\\sqrt{3} \\cdot (\\sqrt{8} + \\sqrt{18} - \\sqrt{32})$$ adalah $\\dots$",
    options: {
      A: "$0$",
      B: "$\\sqrt{6}$",
      C: "$2\\sqrt{6}$",
      D: "$-\\sqrt{6}$",
      E: "$3\\sqrt{6}$",
    },
    correctKey: "B",
    hint: "Sederhanakan dulu akar di dalam kurung menjadi kelipatan $\\sqrt{2}$.",
    solution:
      "Sederhanakan suku-suku di dalam tanda kurung terlebih dahulu:\n$$\\begin{aligned}\n\\sqrt{8} &= 2\\sqrt{2} \\\\\n\\sqrt{18} &= 3\\sqrt{2} \\\\\n\\sqrt{32} &= 4\\sqrt{2} \\\\\n\\sqrt{8} + \\sqrt{18} - \\sqrt{32} &= (2 + 3 - 4)\\sqrt{2} = \\sqrt{2}\n\\end{aligned}$$\nKalikan hasilnya dengan $\\sqrt{3}$:\n$$\\begin{aligned}\n\\sqrt{3} \\cdot \\sqrt{2} &= \\boxed{\\sqrt{6}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 7,
    id: "lat-07",
    chapter: "bab1",
    topic: "Eksponen Pangkat Rasional",
    tier: "inti",
    type: "short",
    prompt:
      "Jika $a = 9$ dan $b = 12$, hitunglah nilai dari $$\\left(\\dfrac{a^{\\frac{1}{2}} b^{-1}}{a^{-\\frac{1}{2}} b^1}\\right)^{-\\frac{1}{2}}$$",
    correctInteger: "4",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$2$",
        B: "$3$",
        C: "$4$",
        D: "$6$",
        E: "$8$",
      },
      correctKey: "C",
    },
    hint: "Sederhanakan pecahan di dalam kurung lebih dulu sebelum mengalikan pangkat $-\\frac{1}{2}$.",
    solution:
      "Sederhanakan pangkat $a$ dan $b$ di dalam kurung:\n$$\\begin{aligned}\n\\frac{a^{\\frac{1}{2}} b^{-1}}{a^{-\\frac{1}{2}} b^1} &= a^{\\frac{1}{2} - (-\\frac{1}{2})} \\cdot b^{-1 - 1} \\\\\n&= a^1 \\cdot b^{-2}\n\\end{aligned}$$\nPangkatkan dengan $-\\frac{1}{2}$ lalu substitusikan $a = 9$ dan $b = 12$:\n$$\\begin{aligned}\n(a^1 b^{-2})^{-\\frac{1}{2}} &= a^{-\\frac{1}{2}} b^1 \\\\\n&= \\frac{b}{\\sqrt{a}} \\\\\n&= \\frac{12}{\\sqrt{9}} \\\\\n&= \\frac{12}{3} \\\\\n&= \\boxed{4}\n\\end{aligned}$$",
  },
  {
    number: 8,
    id: "lat-08",
    chapter: "bab1",
    topic: "Sifat Eksponen dan Basis",
    tier: "inti",
    type: "mtf",
    prompt:
      "Tentukan apakah setiap pernyataan eksponen berikut bernilai Benar atau Salah untuk bilangan real $a \\neq 0$!",
    statements: [
      "$5^0 + 2^{-1} = \\dfrac{3}{2}$",
      "Bentuk $\\dfrac{2^{-1}}{4^{1-x}}$ ekuivalen dengan $2^{2x-3}$",
      "$(3a^2)^3 = 9a^6$",
    ],
    correctBooleans: [true, true, false],
    fallbackPg: {
      options: {
        A: "Pernyataan (1) saja",
        B: "Pernyataan (2) saja",
        C: "Pernyataan (1) dan (2)",
        D: "Pernyataan (2) dan (3)",
        E: "Pernyataan (1), (2), dan (3)",
      },
      correctKey: "C",
    },
    hint: "Ingat $a^0 = 1$, $4 = 2^2$, dan koefisien di dalam kurung ikut dipangkatkan 3.",
    solution:
      "Periksa tiap pernyataan satu per satu:\n$$\\begin{aligned}\n(1)\\; 5^0 + 2^{-1} &= 1 + \\frac{1}{2} = \\frac{3}{2} \\text{ (Benar)} \\\\\n(2)\\; \\frac{2^{-1}}{4^{1-x}} &= \\frac{2^{-1}}{2^{2-2x}} \\\\\n&= 2^{-1 - (2 - 2x)} = 2^{2x - 3} \\text{ (Benar)} \\\\\n(3)\\; (3a^2)^3 &= 27a^6 \\neq 9a^6 \\text{ (Salah)}\n\\end{aligned}$$\nSusunan kunci: $\\boxed{\\text{(1) Benar, (2) Benar, (3) Salah}}$.",
  },
  {
    number: 9,
    id: "lat-09",
    chapter: "bab1",
    topic: "Persamaan Eksponen Basis Sama",
    tier: "inti",
    type: "pg",
    prompt: "Nilai $x$ yang memenuhi persamaan $$4^{x+1} = 8^{x-1}$$ adalah $\\dots$",
    options: {
      A: "$2$",
      B: "$3$",
      C: "$4$",
      D: "$5$",
      E: "$6$",
    },
    correctKey: "D",
    hint: "Ubah $4 = 2^2$ dan $8 = 2^3$ agar kedua ruas memiliki basis $2$.",
    solution:
      "Samakan kedua ruas menjadi basis $2$ lalu samakan pangkatnya:\n$$\\begin{aligned}\n(2^2)^{x+1} &= (2^3)^{x-1} \\\\\n2^{2x + 2} &= 2^{3x - 3} \\\\\n2x + 2 &= 3x - 3 \\\\\n2 + 3 &= 3x - 2x \\\\\nx &= \\boxed{5}\n\\end{aligned}$$\nJawaban yang benar adalah D.",
  },
  {
    number: 10,
    id: "lat-10",
    chapter: "bab1",
    topic: "Aplikasi Luas Bentuk Akar",
    tier: "inti",
    type: "pg",
    prompt:
      "Sebuah taman berbentuk persegi panjang memiliki panjang $(5 + \\sqrt{3})\\text{ m}$ dan lebar $(5 - \\sqrt{3})\\text{ m}$. Luas taman tersebut adalah $\\dots$",
    options: {
      A: "$16\\text{ m}^2$",
      B: "$22\\text{ m}^2$",
      C: "$25\\text{ m}^2$",
      D: "$28\\text{ m}^2$",
      E: "$(25 - 2\\sqrt{3})\\text{ m}^2$",
    },
    correctKey: "B",
    hint: "Gunakan identitas selisih kuadrat $(a + b)(a - b) = a^2 - b^2$.",
    solution:
      "Hitung luas persegi panjang menggunakan perkalian sekawan:\n$$\\begin{aligned}\nL &= p \\times l \\\\\n&= (5 + \\sqrt{3})(5 - \\sqrt{3}) \\\\\n&= 5^2 - (\\sqrt{3})^2 \\\\\n&= 25 - 3 \\\\\n&= \\boxed{22\\text{ m}^2}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
];
