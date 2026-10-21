/* ============================================================
   SCRIPT.JS - Perilaku halaman "Tangan Sigap"
   ------------------------------------------------------------
   1. CONFIG        -> nomor WhatsApp & pesan (ubah di sini saja)
   2. Link WhatsApp -> semua tombol [data-wa-link]
   3. Pilih layanan -> tombol "Pesan" di kartu mengisi form
   4. Form pesan    -> menyusun pesan lalu membuka WhatsApp
   5. Menu HP       -> buka/tutup menu
   6. Tahun footer  -> otomatis
   ============================================================ */

/* ===== 1. CONFIG =====
   phone: format internasional TANPA tanda + atau 0 di depan.
   Contoh nomor 0812-3456-7890 menjadi 6281234567890 */
const CONFIG = {
  phone: "6281234567890",
  greeting: "Halo Tangan Sigap, saya mau tanya jasa serabutan."
};

/* Membuat link WhatsApp dari teks pesan */
function waUrl(text) {
  return "https://wa.me/" + CONFIG.phone + "?text=" + encodeURIComponent(text);
}

/* ===== 2. LINK WHATSAPP UMUM =====
   Semua elemen dengan atribut data-wa-link dibuka ke WhatsApp
   dengan pesan sapaan standar. */
document.querySelectorAll("[data-wa-link]").forEach(function (el) {
  el.setAttribute("href", waUrl(CONFIG.greeting));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* ===== 3. TOMBOL "PESAN" DI KARTU LAYANAN =====
   Nilai data-service di HTML dipilih otomatis pada form. */
const select = document.getElementById("layananSelect");
document.querySelectorAll("[data-service]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (select) select.value = btn.dataset.service;
  });
});

/* ===== 4. FORM PESANAN =====
   Tidak ada server: data hanya dipakai untuk menyusun pesan WhatsApp. */
const form = document.getElementById("orderForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const d = new FormData(form);
    const lines = [
      "Halo Tangan Sigap, saya mau pesan jasa.",
      "Nama: " + d.get("nama"),
      "Layanan: " + d.get("layanan"),
      "Alamat: " + d.get("alamat")
    ];
    if (d.get("catatan")) lines.push("Catatan: " + d.get("catatan"));
    window.open(waUrl(lines.join("\n")), "_blank", "noopener");
  });
}

/* ===== 5. MENU HP ===== */
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");
if (toggle && menu) {
  toggle.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  /* Menu menutup otomatis setelah link diklik */
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ===== 6. TAHUN FOOTER ===== */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
