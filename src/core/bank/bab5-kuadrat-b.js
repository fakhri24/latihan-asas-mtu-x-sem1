/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB5_KUADRAT_LATIHAN_B = [
  {
    number: 36,
    id: "lat-36",
    chapter: "bab5",
    topic: "Menyusun Persamaan Kuadrat Baru",
    tier: "inti",
    type: "pg",
    prompt: "Persamaan kuadrat yang mempunyai akar-akar $x_1 = -3$ dan $x_2 = 7$ adalah $\\dots$",
    options: {
      A: "$x^2 + 4x - 21 = 0$",
      B: "$x^2 - 4x - 21 = 0$",
      C: "$x^2 - 10x + 21 = 0$",
      D: "$x^2 + 10x - 21 = 0$",
      E: "$x^2 - 4x + 21 = 0$",
    },
    correctKey: "B",
    hint: "Hitung $x_1 + x_2$ dan $x_1 x_2$, lalu gunakan $x^2 - (x_1 + x_2)x + x_1 x_2 = 0$.",
    solution:
      "Hitung jumlah dan hasil kali kedua akar:\n$$\\begin{aligned}\nx_1 + x_2 &= -3 + 7 = 4 \\\\\nx_1 \\cdot x_2 &= (-3)(7) = -21\n\\end{aligned}$$\nSusun persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - (x_1 + x_2)x + x_1 x_2 &= 0 \\\\\n\\boxed{x^2 - 4x - 21 = 0}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 37,
    id: "lat-37",
    chapter: "bab5",
    topic: "Menyusun PK Akar Berelasi",
    tier: "inti",
    type: "pg",
    prompt:
      "Akar-akar persamaan kuadrat $$x^2 - 6x + 2 = 0$$ adalah $x_1$ dan $x_2$. Persamaan kuadrat baru yang akar-akarnya $(x_1 + 2)$ dan $(x_2 + 2)$ adalah $\\dots$",
    options: {
      A: "$x^2 + 10x + 18 = 0$",
      B: "$x^2 - 10x + 14 = 0$",
      C: "$x^2 - 10x + 18 = 0$",
      D: "$x^2 - 8x + 14 = 0$",
      E: "$x^2 - 10x - 18 = 0$",
    },
    correctKey: "C",
    hint: "Jumlah akar baru $= (x_1 + x_2) + 4$ dan hasil kali akar baru $= x_1 x_2 + 2(x_1 + x_2) + 4$.",
    solution:
      "Dari $x^2 - 6x + 2 = 0$ diperoleh $x_1 + x_2 = 6$ dan $x_1 x_2 = 2$. Misalkan $\\alpha = x_1 + 2$ dan $\\beta = x_2 + 2$:\n$$\\begin{aligned}\n\\alpha + \\beta &= (x_1 + x_2) + 4 \\\\\n&= 6 + 4 = 10 \\\\\n\\alpha \\beta &= x_1 x_2 + 2(x_1 + x_2) + 4 \\\\\n&= 2 + 2(6) + 4 = 18\n\\end{aligned}$$\nSusun persamaan kuadrat baru:\n$$\\begin{aligned}\nx^2 - 10x + 18 &= 0\n\\end{aligned}$$\nHasil akhirnya adalah $\\boxed{x^2 - 10x + 18 = 0}$. Jawaban yang benar adalah C.",
  },
  {
    number: 38,
    id: "lat-38",
    chapter: "bab5",
    topic: "Aplikasi Geometri Pythagoras",
    tier: "inti",
    type: "pg",
    stimulus: {
      title: "Pemasangan Tangga Perawatan Gedung",
      text: "Teknisi menyandarkan tangga sepanjang $13\\text{ m}$ pada dinding tegak. Tinggi ujung atas tangga di dinding ($t$) dirancang $7\\text{ m}$ lebih panjang daripada jarak horizontal kaki tangga ke pangkal dinding ($x$).",
    },
    prompt:
      "Berdasarkan ketentuan tersebut, tinggi tembok ($t$) yang dicapai ujung tangga adalah $\\dots$",
    options: {
      A: "$5\\text{ m}$",
      B: "$8\\text{ m}$",
      C: "$10\\text{ m}$",
      D: "$12\\text{ m}$",
      E: "$13\\text{ m}$",
    },
    correctKey: "D",
    hint: "Substitusikan $t = x + 7$ ke Teorema Pythagoras $x^2 + t^2 = 13^2$ untuk mencari $x$ positif.",
    solution:
      "Terapkan Teorema Pythagoras dengan $t = x + 7$:\n$$\\begin{aligned}\nx^2 + (x + 7)^2 &= 13^2 \\\\\n2x^2 + 14x + 49 &= 169 \\\\\n2x^2 + 14x - 120 &= 0 \\\\\nx^2 + 7x - 60 &= 0 \\\\\n(x + 12)(x - 5) &= 0\n\\end{aligned}$$\nAmbil nilai jarak positif $x = 5\\text{ m}$, sehingga tinggi tembok:\n$$\\begin{aligned}\nt &= 5 + 7 \\\\\n&= \\boxed{12\\text{ m}}\n\\end{aligned}$$\nJawaban yang benar adalah D.",
  },
  {
    number: 39,
    id: "lat-39",
    chapter: "bab5",
    topic: "Substitusi Solusi Akar",
    tier: "inti",
    type: "pg",
    prompt:
      "Diketahui salah satu akar dari persamaan kuadrat $$2x^2 + bx - 14 = 0$$ adalah $x = -2$. Nilai koefisien $b$ adalah $\\dots$",
    options: {
      A: "$-6$",
      B: "$-3$",
      C: "$3$",
      D: "$6$",
      E: "$11$",
    },
    correctKey: "B",
    hint: "Masukkan langsung $x = -2$ menggantikan variabel $x$ pada persamaan.",
    solution:
      "Substitusikan $x = -2$ ke dalam persamaan:\n$$\\begin{aligned}\n2(-2)^2 + b(-2) - 14 &= 0 \\\\\n2(4) - 2b - 14 &= 0 \\\\\n8 - 2b - 14 &= 0 \\\\\n-2b - 6 &= 0 \\\\\n-2b &= 6 \\\\\nb &= \\boxed{-3}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 40,
    id: "lat-40",
    chapter: "bab5",
    topic: "Bentuk Aljabar Simetris Kuadrat",
    tier: "inti",
    type: "pg",
    prompt:
      "Persamaan kuadrat $$x^2 - 5x - 4 = 0$$ memiliki akar-akar $\\alpha$ dan $\\beta$. Nilai dari $$\\alpha^2 + \\beta^2$$ adalah $\\dots$",
    options: {
      A: "$17$",
      B: "$21$",
      C: "$25$",
      D: "$29$",
      E: "$33$",
    },
    correctKey: "E",
    hint: "Gunakan identitas $\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$.",
    solution:
      "Tentukan $\\alpha + \\beta = 5$ dan $\\alpha\\beta = -4$, lalu masukkan ke identitas kuadrat:\n$$\\begin{aligned}\n\\alpha^2 + \\beta^2 &= (\\alpha + \\beta)^2 - 2\\alpha\\beta \\\\\n&= 5^2 - 2(-4) \\\\\n&= 25 + 8 \\\\\n&= \\boxed{33}\n\\end{aligned}$$\nJawaban yang benar adalah E.",
  },
];
