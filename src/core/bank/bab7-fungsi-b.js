/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB7_FUNGSI_LATIHAN_B = [
  {
    number: 26,
    id: "lat-26",
    chapter: "bab7",
    topic: "Titik Sambungan Fungsi Piecewise",
    tier: "inti",
    type: "mtf",
    prompt:
      "Perhatikan fungsi sepenggal $$g(x) = \\begin{cases} 4, & 0 \\le x \\le 2 \\\\ 2x + 2, & 2 < x \\le 8 \\end{cases}$$ Tentukan Benar atau Salah untuk ketiga pernyataan mengenai grafik $g(x)$!",
    statements: [
      "Nilai fungsi tepat pada $x = 2$ adalah $g(2) = 4$",
      "Ujung kiri grafik cabang kedua di titik $(2, 6)$ digambar dengan bulatan kosong $\\circ$",
      "Jika titik $(2, 4)$ dan $(2, 6)$ keduanya digambar bulatan penuh $\\bullet$, grafik tetap sah sebagai fungsi",
    ],
    correctBooleans: [true, true, false],
    fallbackPg: {
      options: {
        A: "Pernyataan (1) saja",
        B: "Pernyataan (1) dan (2)",
        C: "Pernyataan (2) dan (3)",
        D: "Pernyataan (1) dan (3)",
        E: "Pernyataan (1), (2), dan (3)",
      },
      correctKey: "B",
    },
    hint: "Tanda $\\le$ memakai bulatan penuh $\\bullet$ (ikut), sedangkan tanda $<$ memakai bulatan kosong $\\circ$ (tidak ikut).",
    solution:
      "Evaluasi titik sambungan $x = 2$:\n$$\\begin{aligned}\n(1)\\; x = 2 \\text{ memenuhi } 0 \\le x \\le 2 &\\text{ sehingga } g(2) = 4 \\text{ (Benar)} \\\\\n(2)\\; \\text{Cabang 2 memakai } x > 2 &\\text{ sehingga } (2, 6) \\text{ berlubang } \\circ \\text{ (Benar)} \\\\\n(3)\\; \\text{Dua } \\bullet \\text{ vertikal di } x = 2 &= \\text{mendua / bukan fungsi (Salah)}\n\\end{aligned}$$\nSusunan kunci: $\\boxed{\\text{(1) Benar, (2) Benar, (3) Salah}}$.",
  },
  {
    number: 27,
    id: "lat-27",
    chapter: "bab7",
    topic: "Pemodelan Piecewise Cerita Tarif",
    tier: "inti",
    type: "pg",
    stimulus: {
      title: "Ketentuan Kurir Ekspres KILAT",
      text: "Layanan pengantaran barang KILAT menetapkan tarif minimum $\\text{Rp12.000,00}$ untuk jarak $0 < x \\le 3\\text{ km}$. Setelah melewati $3\\text{ km}$, setiap tambahan $1\\text{ km}$ dikenakan biaya $\\text{Rp3.000,00}$.",
    },
    prompt:
      "Model fungsi sepenggal $f(x)$ yang menyatakan tarif pengiriman (dalam rupiah) terhadap jarak $x\\text{ km}$ adalah $\\dots$",
    options: {
      A: "$f(x) = \\begin{cases} 12.000, & 0 < x \\le 3 \\\\ 12.000 + 3.000x, & x > 3 \\end{cases}$",
      B: "$f(x) = \\begin{cases} 12.000, & 0 < x \\le 3 \\\\ 12.000 + 3.000(x - 3), & x > 3 \\end{cases}$",
      C: "$f(x) = \\begin{cases} 3.000x, & 0 < x \\le 3 \\\\ 12.000 + 3.000(x - 3), & x > 3 \\end{cases}$",
      D: "$f(x) = \\begin{cases} 12.000, & 0 < x < 3 \\\\ 15.000 + 3.000(x - 3), & x \\ge 3 \\end{cases}$",
      E: "$f(x) = \\begin{cases} 12.000, & 0 < x \\le 3 \\\\ 3.000(x - 3), & x > 3 \\end{cases}$",
    },
    correctKey: "B",
    hint: "Jarak $3\\text{ km}$ pertama sudah dibayar $\\text{Rp12.000,00}$, jadi jarak tambahannya adalah $(x - 3)$.",
    solution:
      "Susun kedua cabang tarif sesuai aturan jarak:\n$$\\begin{aligned}\n\\text{Untuk } 0 < x \\le 3 &: f(x) = 12.000 \\\\\n\\text{Untuk } x > 3 &: f(x) = 12.000 + 3.000(x - 3)\n\\end{aligned}$$\nGabungkan ke bentuk fungsi sepenggal:\n$$\\begin{aligned}\nf(x) &= \\boxed{\\begin{cases} 12.000, & 0 < x \\le 3 \\\\ 12.000 + 3.000(x - 3), & x > 3 \\end{cases}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 28,
    id: "lat-28",
    chapter: "bab7",
    topic: "Tarif Bertingkat dan Diskon Nontunai",
    tier: "inti",
    type: "pg",
    stimulus: {
      title: "Aturan Tarif Layanan GO-RIDEKU",
      text: "Tarif layanan GO-RIDEKU untuk $4\\text{ km}$ pertama adalah $\\text{Rp12.000,00}$. Setelah $4\\text{ km}$, dikenakan tambahan $\\text{Rp2.500,00}$ per km. Pembayaran melalui dompet digital mendapat diskon $10\\%$.",
    },
    prompt:
      "Jika Nadia memesan pengantaran sejauh $12\\text{ km}$ dan membayar lewat dompet digital, total tarif yang harus dibayar adalah $\\dots$",
    options: {
      A: "$\\text{Rp28.000,00}$",
      B: "$\\text{Rp28.800,00}$",
      C: "$\\text{Rp30.000,00}$",
      D: "$\\text{Rp32.000,00}$",
      E: "$\\text{Rp36.000,00}$",
    },
    correctKey: "B",
    hint: "Hitung tarif normal untuk $(12 - 4) = 8\\text{ km}$ tambahan terlebih dahulu, lalu kalikan $90\\%$.",
    solution:
      "Hitung tarif normal tunai untuk jarak $x = 12\\text{ km}$:\n$$\\begin{aligned}\n\\text{Tarif normal} &= 12.000 + 2.500(12 - 4) \\\\\n&= 12.000 + 2.500(8) \\\\\n&= 12.000 + 20.000 \\\\\n&= 32.000\n\\end{aligned}$$\nTerapkan diskon $10\\%$ (membayar $90\\%$):\n$$\\begin{aligned}\n\\text{Tarif bayar} &= 0{,}9 \\times 32.000 \\\\\n&= \\boxed{\\text{Rp28.800,00}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
  {
    number: 29,
    id: "lat-29",
    chapter: "bab7",
    topic: "Menentukan Jarak dari Tagihan",
    tier: "inti",
    type: "short",
    prompt:
      "Sebuah jasa ekspedisi menerapkan tarif $\\text{Rp15.000,00}$ untuk $3\\text{ km}$ pertama, lalu $\\text{Rp3.000,00}$ per km untuk jarak selebihnya. Jika total ongkos kirim yang dibayar adalah $\\text{Rp39.000,00}$, berapa km jarak pengantaran tersebut? (Tulis angkanya saja)",
    correctInteger: "11",
    unitLabel: "km",
    fallbackPg: {
      options: {
        A: "$8\\text{ km}$",
        B: "$9\\text{ km}$",
        C: "$11\\text{ km}$",
        D: "$12\\text{ km}$",
        E: "$13\\text{ km}$",
      },
      correctKey: "C",
    },
    hint: "Karena $39.000 > 15.000$, selesaikan persamaan $15.000 + 3.000(x - 3) = 39.000$.",
    solution:
      "Selesaikan persamaan jarak untuk total bayar $\\text{Rp39.000,00}$:\n$$\\begin{aligned}\n15.000 + 3.000(x - 3) &= 39.000 \\\\\n3.000(x - 3) &= 39.000 - 15.000 \\\\\n3.000(x - 3) &= 24.000 \\\\\nx - 3 &= 8 \\\\\nx &= \\boxed{11\\text{ km}}\n\\end{aligned}$$",
  },
  {
    number: 30,
    id: "lat-30",
    chapter: "bab7",
    topic: "Tarif Parkir Plafon Maksimal",
    tier: "inti",
    type: "pg",
    prompt:
      "Area parkir stasiun menetapkan tarif $\\text{Rp5.000,00}$ untuk $1$ jam pertama, ditambah $\\text{Rp3.000,00}$ setiap jam berikutnya, dengan plafon tarif maksimal harian sebesar $\\text{Rp20.000,00}$. Jika sepeda motor diparkir selama $8$ jam, biaya parkir yang wajib dibayar adalah $\\dots$",
    options: {
      A: "$\\text{Rp17.000,00}$",
      B: "$\\text{Rp20.000,00}$",
      C: "$\\text{Rp24.000,00}$",
      D: "$\\text{Rp26.000,00}$",
      E: "$\\text{Rp29.000,00}$",
    },
    correctKey: "B",
    hint: "Hitung tarif progresif $8$ jam lebih dulu, lalu bandingkan dengan batas plafon maksimal $\\text{Rp20.000,00}$.",
    solution:
      "Hitung tarif progresif selama $8$ jam tanpa plafon:\n$$\\begin{aligned}\n\\text{Tarif hitung} &= 5.000 + 3.000(8 - 1) \\\\\n&= 5.000 + 21.000 \\\\\n&= 26.000\n\\end{aligned}$$\nKarena melebihi batas plafon harian $\\text{Rp20.000,00}$, berlaku cabang konstanta maksimal:\n$$\\begin{aligned}\n\\text{Biaya parkir} &= \\boxed{\\text{Rp20.000,00}}\n\\end{aligned}$$\nJawaban yang benar adalah B.",
  },
];
