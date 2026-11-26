/** @typedef {import("./index.js").ChapterGuide} ChapterGuide */

/** @type {ChapterGuide} */
export const BAB7_GUIDE = Object.freeze({
  chapter: "bab7",
  badge: "Bab 7",
  title: "Relasi, Fungsi, & Piecewise",
  tagline:
    "Fungsi memasangkan tiap input ($x$) ke tepat satu output ($y$) — prinsipnya anti-jomblo dan anti-mendua.",
  formulas: [
    {
      label: "Syarat fungsi (pemetaan)",
      lines: ["Setiap domain ($x$) punya **tepat satu** pasangan di kodomain"],
    },
    {
      label: "Uji Garis Vertikal (VLT)",
      lines: ["Garis tegak $x = k$ memotong grafik **maksimal 1 titik**"],
    },
    {
      label: "Selang tertutup (batas ikut)",
      lines: ["Tanda $\\le$ atau $\\ge$ pakai kurung siku $[a, b]$ dan noktah penuh $\\bullet$"],
    },
    {
      label: "Selang terbuka (batas tidak ikut)",
      lines: ["Tanda $<$ atau $>$ pakai kurung biasa $(a, b)$ dan noktah kosong $\\circ$"],
    },
    {
      label: "Model fungsi linear",
      lines: ["$f(x) = ax + b$", "$a$: tarif per satuan · $b$: biaya tetap awal ($x = 0$)"],
    },
    {
      label: "Fungsi tarif bertingkat (piecewise)",
      lines: [
        "$f(x) = \\begin{cases} T_0, & 0 < x \\le k \\\\ T_0 + r(x - k), & x > k \\end{cases}$",
      ],
    },
    {
      label: "Diskon nontunai & plafon",
      lines: [
        "Diskon $d\\%$: bayar $(100 - d)\\% \\times T$",
        "Plafon $M$: jika hitung $> M$, tetap bayar $M$",
      ],
    },
  ],
  keyPoints: [
    "Saat cek himpunan pasangan berurutan, fokus pada nilai $x$: tidak boleh ada yang kosong atau muncul dua kali.",
    "Di titik sambungan grafik piecewise, maksimal hanya ada satu noktah penuh $\\bullet$ agar lolos Uji Garis Vertikal.",
    "Pada tarif bertingkat melewati batas $k$, biaya tambahannya dihitung dari selisih $(x - k)$, bukan $x$.",
  ],
  quickFlow: [
    "**Evaluasi fungsi** $f(c)$: cek $c$ masuk cabang interval yang mana dulu, baru masukkan angkanya ke rumus cabang itu.",
    "**Susun model cerita:** biaya $k$ km awal taruh di cabang pertama, lalu cabang kedua tulis $T_0 + \\text{tarif}(x - k)$.",
    "**Invers tagihan berdiskon:** kembalikan harga bayar ke tarif normal dulu lewat $T_{\\text{normal}} = \\dfrac{T_{\\text{bayar}}}{1 - d\\%}$.",
    "**Bandingkan dua skenario:** hitung tiap order secara terpisah (cek mana yang kena tarif minimum), baru cari selisihnya.",
  ],
  examples: [
    {
      title: "Contoh 1 · Evaluasi Fungsi Piecewise",
      problem:
        "Diketahui $f(x) = \\begin{cases} 7, & 0 \\le x \\le 4 \\\\ 3x - 2, & x > 4 \\end{cases}$. Hitung $f(4) + f(6)$.",
      steps:
        "Cek cabang tiap nilai $x$:\n$$\\begin{aligned}\nf(4) &= 7 \\quad (\\text{masuk } 0 \\le x \\le 4) \\\\\nf(6) &= 3(6) - 2 = 16 \\quad (\\text{masuk } x > 4) \\\\\nf(4) + f(6) &= 7 + 16 \\\\\n&= \\boxed{23}\n\\end{aligned}$$",
    },
    {
      title: "Contoh 2 · Invers Tagihan Diskon",
      problem:
        "Tarif kurir Rp10.000 untuk $2\\text{ km}$ awal, lalu Rp2.000/km berikutnya. Nontunai diskon $20\\%$. Jika bayar Rp16.000, berapa km jaraknya?",
      steps:
        "Balikkan diskon dulu ke tarif normal:\n$$\\begin{aligned}\n0{,}8 \\times T &= 16.000 \\\\\nT &= \\frac{16.000}{0{,}8} = 20.000 \\\\\n10.000 + 2.000(x - 2) &= 20.000 \\\\\n2.000(x - 2) &= 10.000 \\\\\nx - 2 &= 5 \\\\\nx &= \\boxed{7\\text{ km}}\n\\end{aligned}$$",
    },
  ],
  pitfalls: [
    "Lupa mengurangi batas awal $k$: memakai $r \\cdot x$ padahal harusnya $r(x - k)$.",
    "Tertukar kurung siku $[a, b]$ / noktah penuh $\\bullet$ (tanda $\\le$) dengan kurung biasa $(a, b)$ / kosong $\\circ$ (tanda $<$).",
    "Mengira garis tegak $x = c$ itu fungsi — padahal satu nilai $x$ punya tak hingga nilai $y$.",
    "Salah membalik diskon $20\\%$: jangan ditambah $20\\%$ dari harga diskon, tetapi dibagi $0{,}8$.",
  ],
});
