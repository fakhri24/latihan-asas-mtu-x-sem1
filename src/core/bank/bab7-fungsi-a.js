/** @typedef {import("../types.js").QuestionItem} QuestionItem */

/** @type {QuestionItem[]} */
export const BAB7_FUNGSI_LATIHAN_A = [
  {
    number: 21,
    id: "lat-21",
    chapter: "bab7",
    topic: "Syarat Fungsi Pasangan Berurutan",
    tier: "inti",
    type: "pg",
    prompt:
      "Diketahui himpunan daerah asal $A = \\{1, 2, 3\\}$ dan daerah kawan $B = \\{p, q, r\\}$. Himpunan pasangan berurutan dari $A$ ke $B$ yang merupakan **fungsi** adalah $\\dots$",
    options: {
      A: "$\\{(1, p), (1, q), (2, r), (3, p)\\}$",
      B: "$\\{(1, p), (3, q)\\}$",
      C: "$\\{(1, q), (2, q), (3, r)\\}$",
      D: "$\\{(1, p), (2, q), (2, r), (3, r)\\}$",
      E: "$\\{(2, p), (3, q), (3, r)\\}$",
    },
    correctKey: "C",
    hint: "Setiap anggota domain $A$ harus punya pasangan dan tidak boleh bercabang (anti-jomblo dan anti-mendua).",
    solution:
      "Periksa setiap himpunan pasangan berurutan terhadap anggota domain $A = \\{1, 2, 3\\}$:\n- Opsi A mendua di angka $1$.\n- Opsi B tidak memasangkan angka $2$ (jomblo).\n- Opsi D mendua di angka $2$.\n- Opsi E jomblo di $1$ dan mendua di $3$.\n- Opsi C memasangkan tepat satu keluaran untuk $1, 2, 3$:\n$$\\begin{aligned}\n\\text{Fungsi sah} &= \\boxed{\\{(1, q), (2, q), (3, r)\\}}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 22,
    id: "lat-22",
    chapter: "bab7",
    topic: "Uji Garis Vertikal (VLT)",
    tier: "inti",
    type: "pg",
    prompt:
      "Berdasarkan Uji Garis Vertikal (*Vertical Line Test*), persamaan grafik di bidang Kartesius berikut yang **BUKAN** merupakan fungsi $y = f(x)$ adalah $\\dots$",
    options: {
      A: "Garis miring $y = 2x + 1$",
      B: "Garis mendatar $y = 5$",
      C: "Parabola $y = x^2 - 4$",
      D: "Garis tegak $x = 3$",
      E: "Fungsi mutlak $y = |x|$",
    },
    correctKey: "D",
    hint: "Suatu kurva bukan fungsi jika sebuah garis vertikal memotongnya di lebih dari satu titik.",
    solution:
      "Uji garis vertikal pada masing-masing grafik:\n- $y = 2x + 1$, $y = 5$, $y = x^2 - 4$, dan $y = |x|$ masing-masing dipotong tepat 1 titik oleh setiap garis vertikal $x = k$.\n- Grafik $x = 3$ berbentuk garis vertikal itu sendiri, sehingga berimpit di tak hingga titik pada $x = 3$ (satu nilai $x$ memiliki banyak $y$):\n$$\\begin{aligned}\n\\text{Bukan fungsi} &= \\boxed{\\text{Garis tegak } x = 3}\n\\end{aligned}$$\nJawaban yang benar adalah D.",
  },
  {
    number: 23,
    id: "lat-23",
    chapter: "bab7",
    topic: "Batasan Domain & Notasi Selang",
    tier: "inti",
    type: "pg",
    prompt:
      "Persentase daya baterai ponsel yang sedang menyala tidak boleh mencapai $0\\%$ (karena langsung mati) dan paling penuh bernilai $100\\%$. Penulisan domain nyata $x$ dalam notasi selang adalah $\\dots$",
    options: {
      A: "$(0, 100)$",
      B: "$[0, 100)$",
      C: "$(0, 100]$",
      D: "$[0, 100]$",
      E: "$[10, 100]$",
    },
    correctKey: "C",
    hint: "Kurung biasa $($ atau $)$ untuk batas yang tidak ikut ($<$), sedangkan kurung siku $[$ atau $]$ untuk batas yang ikut ($\\le$).",
    solution:
      "Terjemahkan syarat $0 < x \\le 100$ ke notasi selang:\n- Batas kiri $0$ tidak ikut karena ponsel menyala ($>$) sehingga memakai kurung biasa $($.\n- Batas kanan $100$ ikut karena boleh penuh ($\\le$) sehingga memakai kurung siku $]$.\n$$\\begin{aligned}\nD_f &= \\boxed{(0, 100]}\n\\end{aligned}$$\nJawaban yang benar adalah C.",
  },
  {
    number: 24,
    id: "lat-24",
    chapter: "bab7",
    topic: "Pemodelan Fungsi Linear",
    tier: "inti",
    type: "pg",
    prompt:
      "Rental kamera mengenakan biaya administrasi awal $\\text{Rp25.000,00}$ ditambah biaya sewa $\\text{Rp15.000,00}$ setiap jam pemakaian selama durasi $x$ jam. Rumus fungsi total biaya $f(x)$ dan arti nilai $\\text{Rp25.000,00}$ adalah $\\dots$",
    options: {
      A: "$f(x) = 25.000x + 15.000$; tarif per jam sewa",
      B: "$f(x) = 15.000x + 25.000$; biaya tetap awal saat $x = 0$",
      C: "$f(x) = 40.000x$; total biaya untuk $1$ jam pertama",
      D: "$f(x) = 15.000x - 25.000$; potongan harga member",
      E: "$f(x) = 15.000(x + 25.000)$; biaya sewa harian",
    },
    correctKey: "B",
    hint: "Biaya yang berubah per jam dikalikan dengan $x$ (gradien), sedangkan biaya awal menjadi konstanta tetap (intersep).",
    solution:
      "Susun model linear $f(x) = ax + b$ dengan tarif per jam $a = 15.000$ dan biaya dasar tetap $b = 25.000$:\n$$\\begin{aligned}\nf(x) &= \\text{Tarif per jam} \\cdot x + \\text{Biaya awal} \\\\\n&= \\boxed{15.000x + 25.000}\n\\end{aligned}$$\nSaat $x = 0$, nilai $f(0) = 25.000$ menyatakan biaya tetap awal.\nJawaban yang benar adalah B.",
  },
  {
    number: 25,
    id: "lat-25",
    chapter: "bab7",
    topic: "Evaluasi Fungsi Piecewise",
    tier: "inti",
    type: "short",
    prompt:
      "Diketahui fungsi sepenggal berikut: $$f(x) = \\begin{cases} 5, & 0 \\le x \\le 2 \\\\ 3x - 1, & x > 2 \\end{cases}$$ Hitunglah nilai bilangan bulat dari $f(1) + f(4)$!",
    correctInteger: "16",
    unitLabel: "",
    fallbackPg: {
      options: {
        A: "$11$",
        B: "$14$",
        C: "$16$",
        D: "$17$",
        E: "$20$",
      },
      correctKey: "C",
    },
    hint: "Periksa syarat interval masing-masing: $x = 1$ masuk cabang pertama dan $x = 4$ masuk cabang kedua.",
    solution:
      "Hitung tiap nilai berdasarkan interval domainnya:\n$$\\begin{aligned}\nf(1) &= 5 \\quad (\\text{karena } 0 \\le 1 \\le 2) \\\\\nf(4) &= 3(4) - 1 \\\\\n&= 12 - 1 = 11 \\quad (\\text{karena } 4 > 2)\n\\end{aligned}$$\nJumlahkan keduanya:\n$$\\begin{aligned}\nf(1) + f(4) &= 5 + 11 \\\\\n&= \\boxed{16}\n\\end{aligned}$$",
  },
];
