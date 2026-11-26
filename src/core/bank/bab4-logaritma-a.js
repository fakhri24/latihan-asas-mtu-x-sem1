/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB4_LOGARITMA_LATIHAN_A = [
  {
    number: 11,
    id: "lat-11",
    chapter: "bab4",
    topic: "Definisi Pangkat Basis-Numerus",
    tier: "inti",
    type: "pg",
    prompt: "Nilai dari $${}^8\\log 32$$ adalah $\\dots$",
    options: {
      A: "$\\dfrac{3}{5}$",
      B: "$\\dfrac{4}{3}$",
      C: "$\\dfrac{5}{3}$",
      D: "$2$",
      E: "$4$",
    },
    correctKey: "C",
    hint: "Ubah $8 = 2^3$ dan $32 = 2^5$, lalu gunakan sifat ${}^{a^m}\\log b^n = \\frac{n}{m}\\,{}^{a}\\log b$.",
    solution:
      "Nyatakan basis dan numerus dalam basis prima $2$:\n$$\\begin{aligned}\n{}^8\\log 32 &= {}^{2^3}\\log 2^5 \\\\\n&= \\frac{5}{3} \\cdot {}^2\\log 2 \\\\\n&= \\frac{5}{3} \\cdot 1 \\\\\n&= \\boxed{\\frac{5}{3}}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 12,
    id: "lat-12",
    chapter: "bab4",
    topic: "Sifat Eksponen Logaritma",
    tier: "inti",
    type: "short",
    prompt: "Tentukan nilai bilangan bulat dari $$9^{{}^3\\log 2} + 25^{{}^5\\log 3}$$",
    correctInteger: "13",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$9$",
        B: "$11$",
        C: "$12$",
        D: "$13$",
        E: "$15$",
      },
      correctKey: "D",
    },
    hint: "Ubah $9 = 3^2$ dan $25 = 5^2$, lalu pindahkan koefisien ke pangkat numerus.",
    solution:
      "Samakan basis pangkat dengan basis logaritma dan pakai $a^{{}^a\\log b} = b$:\n$$\\begin{aligned}\n9^{{}^3\\log 2} &= (3^2)^{{}^3\\log 2} \\\\\n&= 3^{{}^3\\log 2^2} \\\\\n&= 2^2 = 4 \\\\\n25^{{}^5\\log 3} &= (5^2)^{{}^5\\log 3} \\\\\n&= 5^{{}^5\\log 3^2} \\\\\n&= 3^2 = 9\n\\end{aligned}$$\nJumlahkan kedua hasil:\n$$\\begin{aligned}\n4 + 9 &= \\boxed{13}\n\\end{aligned}$$",
  },
  {
    number: 13,
    id: "lat-13",
    chapter: "bab4",
    topic: "Perkalian Berantai Logaritma",
    tier: "inti",
    type: "short",
    prompt:
      "Tentukan nilai bilangan bulat dari $${}^2\\log 25 \\cdot {}^5\\log 9 \\cdot {}^3\\log 16$$",
    correctInteger: "16",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$8$",
        B: "$12$",
        C: "$16$",
        D: "$24$",
        E: "$32$",
      },
      correctKey: "C",
    },
    hint: "Tarik semua pangkat numerus ke depan, lalu pakai sifat rantai ${}^a\\log b \\cdot {}^b\\log c = {}^a\\log c$.",
    solution:
      "Tulis setiap numerus dalam bentuk pangkat prima:\n$$\\begin{aligned}\n{}^2\\log 25 \\cdot {}^5\\log 9 \\cdot {}^3\\log 16 &= {}^2\\log 5^2 \\cdot {}^5\\log 3^2 \\cdot {}^3\\log 2^4 \\\\\n&= (2 \\cdot 2 \\cdot 4) \\cdot ({}^2\\log 5 \\cdot {}^5\\log 3 \\cdot {}^3\\log 2) \\\\\n&= 16 \\cdot {}^2\\log 2 \\\\\n&= 16 \\cdot 1 \\\\\n&= \\boxed{16}\n\\end{aligned}$$",
  },
  {
    number: 14,
    id: "lat-14",
    chapter: "bab4",
    topic: "Evaluasi Sifat Operasi Logaritma",
    tier: "inti",
    type: "pgk",
    prompt: "Pilihlah dua pernyataan logaritma di bawah ini yang bernilai **BENAR**!",
    options: {
      A: "${}^3\\log 81 - {}^3\\log 3 = 3$",
      B: "${}^2\\log 12 + {}^2\\log 4 - {}^2\\log 3 = 4$",
      C: "${}^5\\log 10 + {}^5\\log 15 = 2$",
      D: "${}^4\\log 1 = 4$",
    },
    correctKeys: ["A", "B"],
    fallbackPg: {
      options: {
        A: "Pernyataan A dan B",
        B: "Pernyataan A dan C",
        C: "Pernyataan B dan C",
        D: "Pernyataan B dan D",
        E: "Pernyataan C dan D",
      },
      correctKey: "A",
    },
    hint: "Jumlah basis sama menjadi kali numerus, kurang menjadi bagi numerus, dan ${}^a\\log 1 = 0$.",
    solution:
      "Uji masing-masing pilihan:\n$$\\begin{aligned}\n\\text{A. } {}^3\\log 81 - {}^3\\log 3 &= {}^3\\log \\frac{81}{3} \\\\\n&= {}^3\\log 27 = 3 \\text{ (Benar)} \\\\\n\\text{B. } {}^2\\log 12 + {}^2\\log 4 - {}^2\\log 3 &= {}^2\\log \\frac{12 \\cdot 4}{3} \\\\\n&= {}^2\\log 16 = 4 \\text{ (Benar)} \\\\\n\\text{C. } {}^5\\log 10 + {}^5\\log 15 &= {}^5\\log 150 \\neq 2 \\text{ (Salah)} \\\\\n\\text{D. } {}^4\\log 1 &= 0 \\neq 4 \\text{ (Salah)}\n\\end{aligned}$$\nPilihan benar adalah $\\boxed{\\text{A dan B}}$.",
  },
  {
    number: 15,
    id: "lat-15",
    chapter: "bab4",
    topic: "Substitusi Variabel Basis Sama",
    tier: "inti",
    type: "pg",
    prompt:
      "Diketahui ${}^5\\log 2 = p$ dan ${}^5\\log 3 = q$. Nilai dari $${}^5\\log 36$$ dalam $p$ dan $q$ adalah $\\dots$",
    options: {
      A: "$p + q$",
      B: "$2p + q$",
      C: "$p + 2q$",
      D: "$2p + 2q$",
      E: "$4pq$",
    },
    correctKey: "D",
    hint: "Faktorkan $36 = 2^2 \\cdot 3^2$, lalu pecah perkalian menjadi penjumlahan logaritma.",
    solution:
      "Ubah $36$ menjadi faktor prima $2^2 \\cdot 3^2$:\n$$\\begin{aligned}\n{}^5\\log 36 &= {}^5\\log(2^2 \\cdot 3^2) \\\\\n&= {}^5\\log 2^2 + {}^5\\log 3^2 \\\\\n&= 2 \\cdot {}^5\\log 2 + 2 \\cdot {}^5\\log 3 \\\\\n&= \\boxed{2p + 2q}\n\\end{aligned}$$\nJawaban yang benar adalah D.",
  },
];
