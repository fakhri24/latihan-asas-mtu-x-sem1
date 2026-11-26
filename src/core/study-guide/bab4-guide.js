/** @typedef {import("./index.js").ChapterGuide} ChapterGuide */

/** @type {ChapterGuide} */
export const BAB4_GUIDE = Object.freeze({
  chapter: "bab4",
  badge: "Bab 4",
  title: "Logaritma",
  tagline:
    "Logaritma itu kebalikan pangkat: ${}^a\\log b$ artinya “$a$ pangkat berapa supaya hasilnya $b$?”.",
  formulas: [
    {
      label: "Definisi & nilai dasar",
      lines: ["${}^a\\log b = c \\iff a^c = b$", "${}^a\\log 1 = 0, \\quad {}^a\\log a = 1$"],
    },
    {
      label: "Syarat wajib (domain)",
      lines: ["Basis: $a > 0$ dan $a \\neq 1$", "Numerus: $b > 0$"],
    },
    {
      label: "Tambah & kurang sebasis",
      lines: [
        "${}^a\\log b + {}^a\\log c = {}^a\\log(bc)$",
        "${}^a\\log b - {}^a\\log c = {}^a\\log\\!\\left(\\dfrac{b}{c}\\right)$",
      ],
    },
    {
      label: "Pangkat basis & numerus",
      lines: ["${}^{a^m}\\log b^n = \\dfrac{n}{m} \\cdot {}^a\\log b$"],
    },
    {
      label: "Identitas eksponen–logaritma",
      lines: ["$a^{{}^a\\log b} = b$"],
    },
    {
      label: "Perkalian berantai",
      lines: ["${}^a\\log b \\cdot {}^b\\log c = {}^a\\log c$"],
    },
    {
      label: "Ubah basis & kebalikan",
      lines: ["${}^a\\log b = \\dfrac{{}^p\\log b}{{}^p\\log a} = \\dfrac{1}{{}^b\\log a}$"],
    },
    {
      label: "Persamaan & cek balik",
      lines: [
        "${}^a\\log f(x) = {}^a\\log g(x) \\iff f(x) = g(x)$",
        "Wajib cek balik: numerus $> 0$",
      ],
    },
  ],
  keyPoints: [
    "Tambah menjadi kali, kurang menjadi bagi — syarat mutlaknya basis kedua suku harus sama.",
    "Pangkat numerus turun jadi pembilang ($n$), sedangkan pangkat basis turun jadi penyebut ($m$).",
    "Untuk soal substitusi variabel (misal diketahui ${}^2\\log 3 = a$), pecah numerus ke faktor prima ($2, 3, 5, 7$).",
  ],
  quickFlow: [
    "**Perkalian berantai:** tarik semua pangkat ke depan dulu, lalu tukar urutan faktor supaya numerus bertemu basis yang sama.",
    "**Bentuk eksponen logaritma** $k^{{}^a\\log b}$: ubah $k$ jadi $a^m$, lalu naikkan $m$ ke pangkat numerus supaya jadi $a^{{}^a\\log b^m} = b^m$.",
    "**Pecahan kuadrat logaritma:** ingat pola selisih kuadrat $A^2 - B^2 = (A - B)(A + B)$ sebelum dihitung.",
    "**Ubah basis 2 variabel:** pilih basis $p$ yang paling sering muncul di informasi yang diketahui.",
  ],
  examples: [
    {
      title: "Contoh 1 · Persamaan Gabungan Sifat",
      problem: "Cari nilai $x$ yang memenuhi ${}^3\\log(x + 1) + {}^3\\log 3 = 3$.",
      steps:
        "Gabungkan ruas kiri, lalu ubah ke pangkat:\n$$\\begin{aligned}\n{}^3\\log(3(x + 1)) &= 3 \\\\\n3(x + 1) &= 3^3 \\\\\n3(x + 1) &= 27 \\\\\nx + 1 &= 9 \\\\\nx &= \\boxed{8}\n\\end{aligned}$$\nCek numerus: $8 + 1 = 9 > 0$ (sah).",
    },
    {
      title: "Contoh 2 · Ubah Basis 2 Variabel",
      problem:
        "Diketahui ${}^2\\log 3 = a$ dan ${}^3\\log 7 = b$. Nyatakan ${}^6\\log 14$ dalam $a$ dan $b$.",
      steps:
        "Cari ${}^2\\log 7 = {}^2\\log 3 \\cdot {}^3\\log 7 = ab$, lalu ubah ke basis $2$:\n$$\\begin{aligned}\n{}^6\\log 14 &= \\frac{{}^2\\log(2 \\cdot 7)}{{}^2\\log(2 \\cdot 3)} \\\\\n&= \\frac{{}^2\\log 2 + {}^2\\log 7}{{}^2\\log 2 + {}^2\\log 3} \\\\\n&= \\boxed{\\frac{1 + ab}{1 + a}}\n\\end{aligned}$$",
    },
  ],
  pitfalls: [
    "Tambah ada di luar, bukan di dalam: ${}^a\\log(b + c) \\neq {}^a\\log b + {}^a\\log c$.",
    "Nilai ${}^a\\log 1 = 0$ (bukan $1$ atau $a$), karena $a^0 = 1$.",
    "Hasil $x$ dari persamaan belum tentu sah — wajib cek ulang semua numerus harus $> 0$.",
    "Posisi pecahan pangkat sering terbalik: ingat $n$ (numerus) di atas, $m$ (basis) di bawah.",
  ],
});
