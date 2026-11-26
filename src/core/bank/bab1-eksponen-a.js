/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB1_EKSPONEN_LATIHAN_A = [
  {
    number: 1,
    id: "lat-01",
    chapter: "bab1",
    topic: "Monomial Eksponen Bulat",
    tier: "inti",
    type: "pg",
    prompt:
      "Hasil penyederhanaan dari $$(20a^5 b^4)\\left(\\dfrac{1}{2^2} a^{-3} b^{-1}\\right)$$ adalah $\\dots$",
    options: {
      A: "$5a^8 b^5$",
      B: "$5a^2 b^3$",
      C: "$10a^2 b^3$",
      D: "$5a^2 b^5$",
      E: "$4a^2 b^3$",
    },
    correctKey: "B",
    hint: "Ubah $\\frac{1}{2^2} = \\frac{1}{4}$, lalu jumlahkan pangkat pada variabel sejenis.",
    solution:
      "Hitung koefisien dan gabungkan pangkat variabel sejenis:\n$$\\begin{aligned}\n(20a^5 b^4)\\left(\\frac{1}{2^2} a^{-3} b^{-1}\\right) &= \\left(20 \\cdot \\frac{1}{4}\\right) \\cdot a^{5 + (-3)} \\cdot b^{4 + (-1)} \\\\\n&= 5 \\cdot a^2 \\cdot b^3 \\\\\n&= \\boxed{5a^2 b^3}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 2,
    id: "lat-02",
    chapter: "bab1",
    topic: "Tambah-Kurang Bentuk Akar",
    tier: "inti",
    type: "pg",
    prompt:
      "Hasil penyederhanaan dari $$\\sqrt{3} + \\sqrt{12} + \\sqrt{75} - \\sqrt{27}$$ adalah $\\dots$",
    options: {
      A: "$3\\sqrt{3}$",
      B: "$4\\sqrt{3}$",
      C: "$5\\sqrt{3}$",
      D: "$6\\sqrt{3}$",
      E: "$8\\sqrt{3}$",
    },
    correctKey: "C",
    hint: "Ubah setiap akar ke bentuk perkalian dengan bilangan kuadrat dan faktor $3$.",
    solution:
      "Sederhanakan tiap suku akar ke kelipatan $\\sqrt{3}$ terlebih dahulu:\n$$\\begin{aligned}\n\\sqrt{12} &= \\sqrt{4 \\cdot 3} = 2\\sqrt{3} \\\\\n\\sqrt{75} &= \\sqrt{25 \\cdot 3} = 5\\sqrt{3} \\\\\n\\sqrt{27} &= \\sqrt{9 \\cdot 3} = 3\\sqrt{3}\n\\end{aligned}$$\nOperasikan koefisien suku sejenis:\n$$\\begin{aligned}\n\\sqrt{3} + 2\\sqrt{3} + 5\\sqrt{3} - 3\\sqrt{3} &= (1 + 2 + 5 - 3)\\sqrt{3} \\\\\n&= \\boxed{5\\sqrt{3}}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 3,
    id: "lat-03",
    chapter: "bab1",
    topic: "Evaluasi Pangkat Pecahan",
    tier: "inti",
    type: "short",
    prompt:
      "Hitunglah nilai bilangan bulat dari $$\\dfrac{64^{\\frac{1}{3}} + 81^{\\frac{1}{4}}}{25^{\\frac{1}{2}} - 16^{\\frac{1}{2}}}$$",
    correctInteger: "7",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$3$",
        B: "$5$",
        C: "$7$",
        D: "$9$",
        E: "$11$",
      },
      correctKey: "C",
    },
    hint: "Nyatakan $64 = 4^3$, $81 = 3^4$, $25 = 5^2$, dan $16 = 4^2$.",
    solution:
      "Ubah setiap bilangan pokok menjadi bentuk perpangkatan sesuai penyebut pangkatnya:\n$$\\begin{aligned}\n64^{\\frac{1}{3}} &= (4^3)^{\\frac{1}{3}} = 4 \\\\\n81^{\\frac{1}{4}} &= (3^4)^{\\frac{1}{4}} = 3 \\\\\n25^{\\frac{1}{2}} &= (5^2)^{\\frac{1}{2}} = 5 \\\\\n16^{\\frac{1}{2}} &= (4^2)^{\\frac{1}{2}} = 4\n\\end{aligned}$$\nSubstitusikan seluruh nilai ke pecahan:\n$$\\begin{aligned}\n\\frac{4 + 3}{5 - 4} &= \\frac{7}{1} \\\\\n&= \\boxed{7}\n\\end{aligned}$$",
  },
  {
    number: 4,
    id: "lat-04",
    chapter: "bab1",
    topic: "Eksponen Basis Negatif",
    tier: "inti",
    type: "pg",
    prompt:
      "Bentuk sederhana dari $$\\dfrac{3^4 \\cdot (-3)^{-3} \\cdot (-3)^5}{3^2 \\cdot 3^{-1}}$$ adalah $\\dots$",
    options: {
      A: "$-3^5$",
      B: "$3^3$",
      C: "$3^4$",
      D: "$3^5$",
      E: "$3^7$",
    },
    correctKey: "D",
    hint: "Selesaikan perkalian basis $(-3)$ dulu; pangkat genap menghasilkan tanda positif.",
    solution:
      "Operasikan faktor berbasis $(-3)$ terlebih dahulu:\n$$\\begin{aligned}\n(-3)^{-3} \\cdot (-3)^5 &= (-3)^{-3 + 5} \\\\\n&= (-3)^2 \\\\\n&= 3^2\n\\end{aligned}$$\nSederhanakan pembilang dan penyebut lalu bagi pangkatnya:\n$$\\begin{aligned}\n\\text{Pembilang} &= 3^4 \\cdot 3^2 = 3^6 \\\\\n\\text{Penyebut} &= 3^2 \\cdot 3^{-1} = 3^1 \\\\\n\\frac{3^6}{3^1} &= 3^{6 - 1} \\\\\n&= \\boxed{3^5}\n\\end{aligned}$$\nJawaban yang benar adalah D.",
  },
  {
    number: 5,
    id: "lat-05",
    chapter: "bab1",
    topic: "Merasionalkan Penyebut",
    tier: "inti",
    type: "pg",
    prompt: "Bentuk rasional paling sederhana dari $$\\dfrac{10}{4 - \\sqrt{11}}$$ adalah $\\dots$",
    options: {
      A: "$4 + \\sqrt{11}$",
      B: "$8 - 2\\sqrt{11}$",
      C: "$8 + 2\\sqrt{11}$",
      D: "$12 + 3\\sqrt{11}$",
      E: "$20 + 5\\sqrt{11}$",
    },
    correctKey: "C",
    hint: "Kalikan pembilang dan penyebut dengan bentuk sekawan $4 + \\sqrt{11}$.",
    solution:
      "Kalikan pecahan dengan sekawan penyebut $(4 + \\sqrt{11})$:\n$$\\begin{aligned}\n\\frac{10}{4 - \\sqrt{11}} \\cdot \\frac{4 + \\sqrt{11}}{4 + \\sqrt{11}} &= \\frac{10(4 + \\sqrt{11})}{4^2 - (\\sqrt{11})^2} \\\\\n&= \\frac{10(4 + \\sqrt{11})}{16 - 11} \\\\\n&= \\frac{10(4 + \\sqrt{11})}{5} \\\\\n&= 2(4 + \\sqrt{11}) \\\\\n&= \\boxed{8 + 2\\sqrt{11}}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
];
