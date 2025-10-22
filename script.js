// Simple version - pasti work
function showGuestName() {
    // Ambil parameter dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const namaParam = urlParams.get('nama');
    
    const namaElement = document.getElementById('guestName');
    
    if (namaParam) {
        // Ganti + dengan spasi
        const namaFix = namaParam.replace(/\+/g, ' ');
        namaElement.textContent = namaFix;
        console.log('Nama ditemukan:', namaFix);
    } else {
        namaElement.textContent = 'Tamu Undangan';
        console.log('Nama tidak ditemukan, menggunakan default');
    }
}

function confirmAttendance(status) {
    const namaElement = document.getElementById('guestName');
    const nama = namaElement.textContent;
    
    // Sembunyikan tombol
    document.getElementById('rsvpButtons').style.display = 'none';
    
    // Tampilkan pesan sukses
    const thankYouDiv = document.getElementById('thankYouMessage');
    thankYouDiv.style.display = 'block';
    
    // Pesan alert
    if (status === 'hadir') {
        alert(`Terima kasih ${nama}! Kami tunggu kehadirannya.`);
    } else {
        alert(`Terima kasih ${nama} atas konfirmasinya.`);
    }
}

// Jalankan ketika halaman siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Undangan siap!');
    showGuestName();
});
