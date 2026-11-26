/** @typedef {import("./index.js").ChapterGuide} ChapterGuide */

/** @type {ChapterGuide} */
export const BAB5_GUIDE = Object.freeze({
  chapter: "bab5",
  badge: "Bab 5",
  title: "Persamaan Kuadrat",
  tagline:
    "Intinya tiga hal: cari akar, cek jenis akar lewat diskriminan, dan olah hubungan akar pakai Vieta.",
  formulas: [
    {
      label: "Bentuk umum",
      lines: ["$ax^2 + bx + c = 0 \\quad (a \\neq 0)$"],
    },
    {
      label: "Rumus kuadratik (ABC)",
      lines: ["$x_{1,2} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$"],
    },
    {
      label: "Diskriminan & jenis akar",
      lines: ["$D = b^2 - 4ac$", "$D > 0$: 2 beda · $D = 0$: kembar · $D < 0$: tak real"],
    },
    {
      label: "Teorema Vieta (jumlah & kali)",
      lines: ["$x_1 + x_2 = -\\dfrac{b}{a}, \\qquad x_1 x_2 = \\dfrac{c}{a}$"],
    },
    {
      label: "Identitas jumlah kuadrat",
      lines: ["$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$"],
    },
    {
      label: "Identitas selisih akar",
      lines: [
        "$(x_1 - x_2)^2 = (x_1 + x_2)^2 - 4x_1 x_2$",
        "$|x_1 - x_2| = \\dfrac{\\sqrt{D}}{|a|}$",
      ],
    },
    {
      label: "Bentuk pecahan simetris",
      lines: [
        "$\\dfrac{x_1}{x_2} + \\dfrac{x_2}{x_1} = \\dfrac{x_1^2 + x_2^2}{x_1 x_2}$",
        "$\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{x_1 + x_2}{x_1 x_2}$",
      ],
    },
    {
      label: "Menyusun PK baru (akar $\\alpha, \\beta$)",
      lines: ["$x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$"],
    },
  ],
  keyPoints: [
    "Pilih cara mencari akar tercepat: pemfaktoran jika bulat, kuadrat sempurna atau rumus ABC jika bentuk akar.",
    "Kalau soal menyebut 'dua akar real kembar' atau 'menyinggung', langsung pasang $D = 0$.",
    "Untuk soal $x_1^2 + x_2^2$ atau $\\frac{x_1}{x_2} + \\frac{x_2}{x_1}$, cukup pakai Vieta — tak perlu mencari $x_1$ dan $x_2$ satu per satu.",
  ],
  quickFlow: [
    "**Diketahui satu akar** ($x_1$): substitusi $x_1$ untuk cari koefisien $b$, atau langsung pakai $x_1 x_2 = \\frac{c}{a}$ buat cari akar kedua $x_2$.",
    "**PK baru akar** $(x_1 + k)$: hitung jumlah baru $(x_1 + x_2) + 2k$ dan kali baru $x_1 x_2 + k(x_1 + x_2) + k^2$.",
    "**Soal cerita luas atau Pythagoras:** nyatakan sisi dalam satu variabel ($x$), selesaikan kuadratnya, lalu pilih akar positif.",
    "**Pecahan simetris akar:** samakan penyebutnya dulu, baru ubah pembilang memakai identitas jumlah dan hasil kali.",
  ],
  examples: [
    {
      title: "Contoh 1 · Diskriminan Akar Kembar",
      problem:
        "Tentukan nilai $k > 0$ agar $x^2 - kx + (k + 8) = 0$ memiliki dua akar real kembar.",
      steps:
        "Pasang syarat diskriminan $D = 0$ ($a = 1, b = -k, c = k + 8$):\n$$\\begin{aligned}\nb^2 - 4ac &= 0 \\\\\n(-k)^2 - 4(1)(k + 8) &= 0 \\\\\nk^2 - 4k - 32 &= 0 \\\\\n(k - 8)(k + 4) &= 0\n\\end{aligned}$$\nDiperoleh $k = 8$ atau $k = -4$. Karena $k > 0$, maka $k = \\boxed{8}$.",
    },
    {
      title: "Contoh 2 · Pecahan Simetris Vieta",
      problem:
        "Jika $x_1, x_2$ akar dari $x^2 - 4x + 2 = 0$, hitung $\\dfrac{x_1}{x_2} + \\dfrac{x_2}{x_1}$.",
      steps:
        "Ambil $x_1 + x_2 = 4$ dan $x_1 x_2 = 2$, lalu samakan penyebut:\n$$\\begin{aligned}\n\\frac{x_1}{x_2} + \\frac{x_2}{x_1} &= \\frac{x_1^2 + x_2^2}{x_1 x_2} \\\\\n&= \\frac{(x_1 + x_2)^2 - 2x_1 x_2}{x_1 x_2} \\\\\n&= \\frac{4^2 - 2(2)}{2} \\\\\n&= \\frac{12}{2} = \\boxed{6}\n\\end{aligned}$$",
    },
  ],
  pitfalls: [
    "Lupa tanda minus pada $x_1 + x_2 = -\\frac{b}{a}$ dan pada suku tengah PK baru $x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$.",
    "Lupa membagi dengan $a$ jika koefisien $x^2$ bukan $1$ (misal pada $2x^2 - 12x + 7 = 0$).",
    "Keliru menjabarkan $(x_1 + x_2)^2 = x_1^2 + x_2^2$; ingat masih ada suku tengah $+2x_1 x_2$.",
    "Soal ukuran panjang, lebar, atau waktu tidak boleh mengambil akar yang bernilai negatif.",
  ],
});
