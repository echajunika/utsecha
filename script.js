// ===== 1. Jam digital di sidebar =====
function tampilkanJam() {
  const elJam = document.getElementById("jam");
  const elTanggal = document.getElementById("tanggal");
  if (!elJam) return;
  const sekarang = new Date();
  elJam.textContent = sekarang.toLocaleTimeString("id-ID");
  elTanggal.textContent = sekarang.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
}
setInterval(tampilkanJam, 1000);
tampilkanJam();

// ===== 2. Slider otomatis di halaman Home =====
const daftarSlide = document.querySelectorAll(".slide");
let indeksSlide = 0;
if (daftarSlide.length > 0) {
  setInterval(function () {
    daftarSlide[indeksSlide].classList.remove("tampil");
    indeksSlide = (indeksSlide + 1) % daftarSlide.length;
    daftarSlide[indeksSlide].classList.add("tampil");
  }, 3500);
}

// ===== 3. Menu hamburger (mobile) =====
const tombolMenu = document.getElementById("tombolMenu");
if (tombolMenu) {
  tombolMenu.addEventListener("click", function () {
    document.getElementById("menuUtama").classList.toggle("buka");
  });
}

// ===== 4. Penghitung pengunjung (disimpan di localStorage browser) =====
const elPengunjung = document.getElementById("pengunjung");
if (elPengunjung) {
  let jumlah = Number(localStorage.getItem("pengunjungMiiko")) || 0;
  jumlah++;
  localStorage.setItem("pengunjungMiiko", jumlah);
  elPengunjung.textContent = jumlah;
}

// ===== 5. Lightbox galeri =====
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  document.querySelectorAll(".galeri .foto").forEach(function (foto) {
    foto.addEventListener("click", function () {
      const isi = lightbox.querySelector(".isi");
      isi.innerHTML = foto.innerHTML;
      isi.style.background = foto.style.background;
      lightbox.classList.add("buka");
    });
  });
  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("buka");
  });
}

// ===== 5b. Daftar review volume (halaman Review) =====
// Ubah angka ini sesuai volume terbaru yang kamu punya.
const JUMLAH_VOLUME = 37;

// Isi review-mu di sini. Contoh format (hapus tanda // untuk memakai):
// 1: { rating: 5, ringkasan: "Ringkasan singkat (tampil di kartu).", isi: "Review lengkapmu (tampil saat kartu diklik)." },
// 2: { rating: 4, ringkasan: "...", isi: "..." },
const reviewVolume = {
  1: { rating: 5, ringkasan: "Awal yang manis dan lucu.", isi: "..." },
  2: { rating: 4, ringkasan: "...", isi: "..." },
  3: { rating: "...", ringkasan: "...", isi: "..." },
  4: { rating: "...", ringkasan: "...", isi: "..." },
  5: { rating: "...", ringkasan: "...", isi: "..." },
  6: { rating: "...", ringkasan: "...", isi: "..." },
  7: { rating: "...", ringkasan: "...", isi: "..." },
  8: { rating: "...", ringkasan: "...", isi: "..." },
  9: { rating: "...", ringkasan: "...", isi: "..." },
  10: { rating: "...", ringkasan: "...", isi: "..." },
  11: { rating: "...", ringkasan: "...", isi: "..." },
  12: { rating: "...", ringkasan: "...", isi: "..." },
  13: { rating: "...", ringkasan: "...", isi: "..." },
  14: { rating: "...", ringkasan: "...", isi: "..." },
  15: { rating: "...", ringkasan: "...", isi: "..." },
  16: { rating: "...", ringkasan: "...", isi: "..." },
  17: { rating: "...", ringkasan: "...", isi: "..." },
  18: { rating: "...", ringkasan: "...", isi: "..." },
  19: { rating: "...", ringkasan: "...", isi: "..." },
  20: { rating: "...", ringkasan: "...", isi: "..." },
  21: { rating: "5", 
    ringkasan: "Hari Natal. banyak makanan enak! Cake, sup tomat, ayam goreng, salad... Tapi minum susu dingin saja bikin gigi Miiko ngilu tak karuan! kayaknya pesta Natal kali ini bakal berantakan!", 
    isi: "..." },
  22: { rating: "...", ringkasan: "...", isi: "..." },
  23: { rating: "...", ringkasan: "...", isi: "..." },
  24: { rating: "...", ringkasan: "...", isi: "..." },
  25: { rating: "...", ringkasan: "...", isi: "..." },
  26: { rating: "...", ringkasan: "...", isi: "..." },
  27: { rating: "...", ringkasan: "...", isi: "..." },
  28: { rating: "...", ringkasan: "...", isi: "..." },
  29: { rating: "...", ringkasan: "...", isi: "..." },
  30: { rating: "...", ringkasan: "...", isi: "..." },
  31: { rating: "...", ringkasan: "...", isi: "..." },
  32: { rating: "...", ringkasan: "...", isi: "..." },
  33: { rating: "...", ringkasan: "...", isi: "..." },
  34: { rating: "...", ringkasan: "...", isi: "..." },
  35: { rating: "...", ringkasan: "...", isi: "..." },
  36: { rating: "...", ringkasan: "...", isi: "..." },
  37: { rating: "...", ringkasan: "...", isi: "..." },
};

const wadahVolume = document.getElementById("gridVolume");
function tampilkanVolume(kataKunci) {
  if (!wadahVolume) return;
  wadahVolume.innerHTML = "";
  for (let i = 1; i <= JUMLAH_VOLUME; i++) {
    const teksCari = ("volume " + i).toLowerCase();
    if (kataKunci && !teksCari.includes(kataKunci.toLowerCase())) continue;
    const data = reviewVolume[i];
    const kartu = document.createElement("div");
    kartu.className = "vol" + (data ? " sudah" : "");
    kartu.tabIndex = 0;                       // supaya bisa dipilih dengan tombol Tab
    kartu.setAttribute("role", "button");
    const bintang = data ? "&#9733;".repeat(data.rating) + "&#9734;".repeat(5 - data.rating) : "";
    kartu.innerHTML =
      '<span class="status">' + (data ? "Sudah direview" : "Belum direview") + "</span>" +
      "<h3>Hai, Miiko! Vol. " + i + "</h3>" +
      (data ? '<div class="bintang-rating">' + bintang + "</div><p>" + data.ringkasan + "</p>"
            : "<p>Review volume ini sedang disiapkan.</p>") +
      '<span class="klik">Klik untuk baca &raquo;</span>';
    // klik kartu (atau tekan Enter) membuka jendela detail
    kartu.addEventListener("click", function () { bukaDetailVolume(i); });
    kartu.addEventListener("keydown", function (e) { if (e.key === "Enter") bukaDetailVolume(i); });
    wadahVolume.appendChild(kartu);
  }
}
// Jendela detail (pop-up) dibuat lewat JavaScript, tidak perlu mengubah HTML
let jendelaVolume = null;
function bukaDetailVolume(nomor) {
  if (!jendelaVolume) {
    jendelaVolume = document.createElement("div");
    jendelaVolume.id = "jendelaVolume";
    document.body.appendChild(jendelaVolume);
    // klik area gelap di luar kotak = tutup
    jendelaVolume.addEventListener("click", function (e) {
      if (e.target === jendelaVolume) jendelaVolume.classList.remove("buka");
    });
  }
  const data = reviewVolume[nomor];
  let isi = '<div class="kotak-detail"><button class="tutup" aria-label="Tutup">&times;</button>' +
            "<h2>Hai, Miiko! Vol. " + nomor + "</h2>";
  if (data) {
    isi += '<div class="bintang-rating">' + "&#9733;".repeat(data.rating) + "&#9734;".repeat(5 - data.rating) + "</div>" +
           "<p><b>" + data.ringkasan + "</b></p>" +
           (data.isi ? "<p>" + data.isi + "</p>" : "");
  } else {
    isi += "<p>Review volume ini belum ditulis. Nantikan ya!</p>";
  }
  // tombol volume sebelumnya / berikutnya
  isi += '<div class="navigasi-vol">' +
         (nomor > 1 ? '<button data-ke="' + (nomor - 1) + '">&laquo; Vol. ' + (nomor - 1) + "</button>" : "<span></span>") +
         (nomor < JUMLAH_VOLUME ? '<button data-ke="' + (nomor + 1) + '">Vol. ' + (nomor + 1) + " &raquo;</button>" : "<span></span>") +
         "</div></div>";
  jendelaVolume.innerHTML = isi;
  jendelaVolume.classList.add("buka");
  jendelaVolume.querySelector(".tutup").addEventListener("click", function () {
    jendelaVolume.classList.remove("buka");
  });
  jendelaVolume.querySelectorAll(".navigasi-vol button").forEach(function (t) {
    t.addEventListener("click", function () { bukaDetailVolume(Number(t.dataset.ke)); });
  });
}
// tombol Esc menutup jendela
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && jendelaVolume) jendelaVolume.classList.remove("buka");
});

tampilkanVolume("");
const kolomCari = document.getElementById("cariVolume");
if (kolomCari) {
  kolomCari.addEventListener("input", function () { tampilkanVolume(kolomCari.value); });
}

// ===== 5c. Tab kelompok karakter =====
const tombolTab = document.querySelectorAll(".tab button");
tombolTab.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    tombolTab.forEach(function (t) { t.classList.remove("aktif"); });
    tombol.classList.add("aktif");
    const kelompok = tombol.dataset.kelompok;
    document.querySelectorAll(".karakter").forEach(function (k) {
      k.style.display = (kelompok === "semua" || k.dataset.kelompok === kelompok) ? "block" : "none";
    });
  });
});

// ===== 6. Validasi form (Registrasi & Kontak) =====
function pasangForm(idForm, idPesan, teksSukses) {
  const form = document.getElementById(idForm);
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const pesan = document.getElementById(idPesan);
    const email = form.querySelector('input[type="email"]').value;
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!polaEmail.test(email)) {
      pesan.className = "pesan salah";
      pesan.textContent = "Format email belum benar, coba cek lagi ya.";
      return;
    }
    pesan.className = "pesan ok";
    pesan.textContent = teksSukses;
    form.reset();
  });
}
pasangForm("formRegistrasi", "pesanRegistrasi", "Terima kasih! Pendaftaranmu sudah kami terima (simulasi, belum terkirim ke server).");
pasangForm("formKontak", "pesanKontak", "Pesanmu sudah dicatat. Terima kasih sudah menghubungi kami (simulasi).");