/** @typedef {import("./index.js").ChapterGuide} ChapterGuide */

/** @type {ChapterGuide} */
export const BAB1_GUIDE = Object.freeze({
  chapter: "bab1",
  badge: "Bab 1",
  title: "Eksponen & Bentuk Akar",
  tagline:
    "Eksponen itu perkalian berulang. Kuncinya cuma dua: samakan basisnya, lalu operasikan pangkatnya.",
  formulas: [
    {
      label: "Kali & bagi basis sama",
      lines: ["$a^m \\cdot a^n = a^{m+n}$", "$\\dfrac{a^m}{a^n} = a^{m-n}$"],
    },
    {
      label: "Pangkat berlipat & kurung",
      lines: ["$(a^m)^n = a^{mn}$", "$(ab)^n = a^n b^n$"],
    },
    {
      label: "Pangkat nol & negatif",
      lines: ["$a^0 = 1 \\quad (a \\neq 0)$", "$a^{-n} = \\dfrac{1}{a^n}$"],
    },
    {
      label: "Basis negatif",
      lines: [
        "$(-a)^{\\text{genap}} = +a^{\\text{genap}}$",
        "$(-a)^{\\text{ganjil}} = -a^{\\text{ganjil}}$",
      ],
    },
    {
      label: "Pangkat pecahan & akar",
      lines: ["$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$", "$\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$"],
    },
    {
      label: "Tambah & kurang akar sejenis",
      lines: ["$p\\sqrt{c} \\pm q\\sqrt{c} = (p \\pm q)\\sqrt{c}$"],
    },
    {
      label: "Rasionalkan penyebut sekawan",
      lines: ["$\\dfrac{k}{a \\pm \\sqrt{b}} = \\dfrac{k(a \\mp \\sqrt{b})}{a^2 - b}$"],
    },
    {
      label: "Persamaan eksponen",
      lines: ["$a^{f(x)} = a^{g(x)} \\iff f(x) = g(x)$"],
    },
  ],
  keyPoints: [
    "Kalau basis sudah sama: dikali berarti pangkat ditambah, dibagi berarti pangkat dikurang.",
    "Pecah bentuk akar pakai faktor kuadrat ($4, 9, 16, 25, 36$) supaya bisa dijumlah atau dikurang.",
    "Penyebut berakar dirasionalkan dengan mengali sekawannya karena $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$.",
  ],
  quickFlow: [
    "**Pecahan pangkat rasional:** rapikan pangkat tiap huruf di dalam kurung dulu sebelum dikalikan pangkat luar.",
    "**Angka berpangkat pecahan:** ubah angka ke pangkat prima sesuai penyebut pangkatnya (misal $64^{\\frac{1}{3}} = (4^3)^{\\frac{1}{3}}$).",
    "**Persamaan ada akar:** ubah $\\sqrt{a^m} = a^{\\frac{m}{2}}$, lalu samakan kedua ruas ke basis prima terkecil ($2, 3, 5$).",
    "**Luas/lebar berbentuk akar:** tinggal bagi atau kali sekawan $(a + \\sqrt{b})(a - \\sqrt{b})$.",
  ],
  examples: [
    {
      title: "Contoh 1 · Persamaan Eksponen Akar",
      problem: "Tentukan nilai $x$ yang memenuhi $4^{x - 2} = \\sqrt{8^x}$.",
      steps:
        "Ubah kedua ruas ke basis $2$:\n$$\\begin{aligned}\n(2^2)^{x - 2} &= (2^3)^{\\frac{x}{2}} \\\\\n2^{2x - 4} &= 2^{\\frac{3x}{2}} \\\\\n2x - 4 &= \\frac{3x}{2} \\\\\n4x - 8 &= 3x \\\\\nx &= \\boxed{8}\n\\end{aligned}$$",
    },
    {
      title: "Contoh 2 · Rasionalkan Penyebut",
      problem: "Bentuk rasional sederhana dari $\\dfrac{12}{3 - \\sqrt{3}}$ adalah $\\dots$",
      steps:
        "Kalikan sekawan $(3 + \\sqrt{3})$:\n$$\\begin{aligned}\n\\frac{12}{3 - \\sqrt{3}} \\cdot \\frac{3 + \\sqrt{3}}{3 + \\sqrt{3}} &= \\frac{12(3 + \\sqrt{3})}{3^2 - (\\sqrt{3})^2} \\\\\n&= \\frac{12(3 + \\sqrt{3})}{9 - 3} \\\\\n&= \\frac{12(3 + \\sqrt{3})}{6} \\\\\n&= \\boxed{6 + 2\\sqrt{3}}\n\\end{aligned}$$",
    },
  ],
  pitfalls: [
    "Bedakan $(-2)^4 = 16$ dengan $-2^4 = -16$ (tanpa kurung, minusnya tidak ikut dipangkatkan).",
    "Pada $(3a^2)^3$, angka $3$ ikut dipangkatkan: hasilnya $27a^6$, bukan $9a^6$.",
    "Akar tidak bisa dipisah di tambah/kurang: $\\sqrt{9 + 16} = \\sqrt{25} = 5$, bukan $3 + 4$.",
    "Bilangan tak nol pangkat $0$ nilainya $1$, bukan $0$ (jadi $5^0 + 2^{-1} = 1 + \\frac{1}{2}$).",
  ],
});
