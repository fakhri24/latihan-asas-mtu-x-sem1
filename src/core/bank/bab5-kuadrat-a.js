/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB5_KUADRAT_LATIHAN_A = [
  {
    number: 31,
    id: "lat-31",
    chapter: "bab5",
    topic: "Akar Persamaan Kuadrat (Pemfaktoran)",
    tier: "inti",
    type: "pg",
    prompt: "Akar-akar dari persamaan kuadrat $$x^2 - 3x - 18 = 0$$ adalah $\\dots$",
    options: {
      A: "$3 \\text{ atau } -6$",
      B: "$-3 \\text{ atau } 6$",
      C: "$-3 \\text{ atau } -6$",
      D: "$2 \\text{ atau } -9$",
      E: "$-2 \\text{ atau } 9$",
    },
    correctKey: "B",
    hint: "Cari dua bilangan yang hasil kalinya $-18$ dan jumlahnya $-3$.",
    solution:
      "Faktorkan persamaan kuadrat dengan pasangan bilangan $3$ dan $-6$:\n$$\\begin{aligned}\nx^2 - 3x - 18 &= 0 \\\\\n(x + 3)(x - 6) &= 0 \\\\\nx_1 &= \\boxed{-3} \\\\\nx_2 &= \\boxed{6}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 32,
    id: "lat-32",
    chapter: "bab5",
    topic: "Rumus ABC / Kuadrat Sempurna",
    tier: "inti",
    type: "pg",
    prompt: "Akar-akar dari persamaan kuadrat $$x^2 - 8x + 11 = 0$$ adalah $\\dots$",
    options: {
      A: "$x = -4 \\pm \\sqrt{5}$",
      B: "$x = 4 \\pm \\sqrt{5}$",
      C: "$x = 8 \\pm \\sqrt{20}$",
      D: "$x = 4 \\pm \\sqrt{11}$",
      E: "$x = -4 \\pm \\sqrt{11}$",
    },
    correctKey: "B",
    hint: "Lengkapi kuadrat sempurna menjadi $(x - 4)^2 = 5$ atau gunakan rumus ABC.",
    solution:
      "Gunakan metode melengkapkan kuadrat sempurna:\n$$\\begin{aligned}\nx^2 - 8x + 11 &= 0 \\\\\nx^2 - 8x &= -11 \\\\\nx^2 - 8x + (-4)^2 &= -11 + 16 \\\\\n(x - 4)^2 &= 5 \\\\\nx - 4 &= \\pm\\sqrt{5} \\\\\nx &= \\boxed{4 \\pm \\sqrt{5}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 33,
    id: "lat-33",
    chapter: "bab5",
    topic: "Diskriminan Akar Kembar",
    tier: "inti",
    type: "short",
    prompt:
      "Tentukan nilai bilangan bulat positif $p$ agar persamaan kuadrat $$x^2 - px + (p + 15) = 0$$ mempunyai dua akar real kembar!",
    correctInteger: "10",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$4$",
        B: "$6$",
        C: "$8$",
        D: "$10$",
        E: "$15$",
      },
      correctKey: "D",
    },
    hint: "Syarat akar kembar adalah diskriminan $D = b^2 - 4ac = 0$ dengan $a = 1, b = -p, c = p + 15$.",
    solution:
      "Terapkan syarat diskriminan akar kembar $D = 0$:\n$$\\begin{aligned}\nb^2 - 4ac &= 0 \\\\\n(-p)^2 - 4(1)(p + 15) &= 0 \\\\\np^2 - 4p - 60 &= 0 \\\\\n(p - 10)(p + 6) &= 0\n\\end{aligned}$$\nDiperoleh $p = 10$ atau $p = -6$. Karena disyaratkan $p > 0$:\n$$\\begin{aligned}\np &= \\boxed{10}\n\\end{aligned}$$",
  },
  {
    number: 34,
    id: "lat-34",
    chapter: "bab5",
    topic: "Teorema Vieta Dasar",
    tier: "inti",
    type: "pgk",
    prompt:
      "Diketahui $x_1$ dan $x_2$ adalah akar-akar dari persamaan kuadrat $$2x^2 - 12x + 7 = 0$$ Pilihlah dua pernyataan di bawah ini yang bernilai **BENAR**!",
    options: {
      A: "$x_1 + x_2 = -6$",
      B: "$x_1 + x_2 = 6$",
      C: "$3x_1 + 3x_2 + 2x_1 x_2 = 25$",
      D: "$x_1 \\cdot x_2 = 7$",
    },
    correctKeys: ["B", "C"],
    fallbackPg: {
      options: {
        A: "Pernyataan A dan B",
        B: "Pernyataan A dan D",
        C: "Pernyataan B dan C",
        D: "Pernyataan B dan D",
        E: "Pernyataan C dan D",
      },
      correctKey: "C",
    },
    hint: "Gunakan Teorema Vieta $x_1 + x_2 = -\\frac{b}{a}$ dan $x_1 x_2 = \\frac{c}{a}$ dengan $a = 2$.",
    solution:
      "Hitung nilai dasar Teorema Vieta dengan $a = 2, b = -12, c = 7$:\n$$\\begin{aligned}\nx_1 + x_2 &= -\\frac{-12}{2} = 6 \\text{ (B Benar, A Salah)} \\\\\nx_1 x_2 &= \\frac{7}{2} \\text{ (D Salah)} \\\\\n3(x_1 + x_2) + 2(x_1 x_2) &= 3(6) + 2\\left(\\frac{7}{2}\\right) \\\\\n&= 18 + 7 \\\\\n&= 25 \\text{ (C Benar)}\n\\end{aligned}$$\nPilihan benar adalah $\\boxed{\\text{B dan C}}$.",
  },
  {
    number: 35,
    id: "lat-35",
    chapter: "bab5",
    topic: "Relasi Selisih Akar",
    tier: "inti",
    type: "short",
    stimulus: {
      title: "Uji Lintasan Wahana Roket Air",
      text: "Waktu tempuh $t$ (dalam detik) sebuah wahana roket air melewati batas ketinggian radar memenuhi persamaan kuadrat $t^2 - 10t + c = 0$. Sensor mencatat roket melewati garis ketinggian tersebut pada dua waktu $t_1$ dan $t_2$ dengan selisih $|t_1 - t_2| = 4$ detik.",
    },
    prompt: "Tentukan nilai konstanta bilangan bulat $c$ yang memenuhi persamaan tersebut!",
    correctInteger: "21",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$16$",
        B: "$19$",
        C: "$21$",
        D: "$24$",
        E: "$25$",
      },
      correctKey: "C",
    },
    hint: "Gunakan identitas $(t_1 - t_2)^2 = (t_1 + t_2)^2 - 4t_1 t_2$ dengan $t_1 + t_2 = 10$ dan $t_1 t_2 = c$.",
    solution:
      "Substitusikan $t_1 + t_2 = 10$ dan $t_1 t_2 = c$ ke identitas kuadrat selisih akar:\n$$\\begin{aligned}\n(t_1 - t_2)^2 &= (t_1 + t_2)^2 - 4t_1 t_2 \\\\\n4^2 &= 10^2 - 4c \\\\\n16 &= 100 - 4c \\\\\n4c &= 100 - 16 \\\\\n4c &= 84 \\\\\nc &= \\boxed{21}\n\\end{aligned}$$",
  },
];
