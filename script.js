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
// 1: { rating: 5, ringkasan: "Tulis ringkasan singkat dan kesanmu di sini." },
const reviewVolume = {
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
    const bintang = data ? "&#9733;".repeat(data.rating) + "&#9734;".repeat(5 - data.rating) : "";
    kartu.innerHTML =
      '<span class="status">' + (data ? "Sudah direview" : "Belum direview") + "</span>" +
      "<h3>Hai, Miiko! Vol. " + i + "</h3>" +
      (data ? '<div class="bintang-rating">' + bintang + "</div><p>" + data.ringkasan + "</p>"
            : "<p>Review volume ini sedang disiapkan.</p>");
    wadahVolume.appendChild(kartu);
  }
}
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
