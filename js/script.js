document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING & WELCOME SCREEN ---
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        // Tambahkan delay sedikit untuk efek dramatis
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            // Sembunyikan setelah transisi selesai
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800); 
        }, 500);
    });

    // --- SIDEBAR RESPONSIVE ---
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.querySelector('.sidebar');
    menuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        menuBtn.classList.toggle('fa-times'); // Ubah ikon bars menjadi X
    });

    // --- DARK MODE TOGGLE ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Ganti ikon bulan/matahari
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark'); // Simpan preferensi
        } else {
            darkModeToggle.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Cek preferensi tema dari localStorage saat halaman dimuat
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.classList.replace('fa-moon', 'fa-sun');
    }

    // --- GALLERY SLIDER OTOMATIS ---
    let slideIndex = 0;
    const slides = document.querySelectorAll('.gallery-container .slide');
    const prevBtn = document.querySelector('.gallery-container .prev');
    const nextBtn = document.querySelector('.gallery-container .next');

    function showSlides(n) {
        // Batasi index agar tidak keluar dari jumlah slide
        if (n >= slides.length) { slideIndex = 0; }
        if (n < 0) { slideIndex = slides.length - 1; }

        // Sembunyikan semua slide
        slides.forEach(slide => slide.style.display = "none");
        // Tampilkan slide yang aktif
        slides[slideIndex].style.display = "block";
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Event listener untuk tombol prev/next
    prevBtn.addEventListener('click', () => plusSlides(-1));
    nextBtn.addEventListener('click', () => plusSlides(1));

    // Fungsi geser otomatis setiap 4 detik
    setInterval(() => {
        plusSlides(1);
    }, 4000);

    showSlides(slideIndex); // Tampilkan slide pertama saat halaman dimuat

    // --- FORM KONTAK ---
    const contactForm = document.getElementById('contactForm');
    const sendWhatsAppBtn = document.getElementById('send-whatsapp');

    // Kirim via Email (menggunakan mailto:)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form submit biasa
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        // Buka aplikasi email default client
        window.location.href = `mailto:tujuan@emailsekolah.com?subject=Pesan dari ${nama}&body=${pesan}%0A%0ADari: ${email}`;
    });

    // Kirim via WhatsApp
    sendWhatsAppBtn.addEventListener('click', function() {
        const nama = document.getElementById('nama').value;
        const pesan = document.getElementById('pesan').value;
        
        if (nama === '' || pesan === '') {
            alert('Harap isi nama dan pesan terlebih dahulu.');
            return;
        }

        const nomorTujuan = '6281234567890'; // Ganti dengan nomor WhatsApp sekolah (format 62)
        const formatPesan = `Halo, saya ${nama}. Saya ingin bertanya mengenai: ${pesan}`;
        const urlWhatsApp = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(formatPesan)}`;
        
        window.open(urlWhatsApp, '_blank');
    });

});