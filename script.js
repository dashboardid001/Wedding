// Fungsi untuk mengambil parameter dari URL
function getParameterFromURL(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fungsi untuk menampilkan nama tamu
function displayGuestName() {
    const nama = getParameterFromURL('nama');
    const guestNameElement = document.getElementById('guestName');
    
    if (nama) {
        // Decode URL dan format nama
        const namaDecoded = decodeURIComponent(nama).replace(/\+/g, ' ');
        guestNameElement.innerHTML = `<span style="color: #d4af37;">${namaDecoded}</span>`;
        
        // Simpan di localStorage
        localStorage.setItem('namaTamu', namaDecoded);
    } else {
        guestNameElement.innerHTML = '<span style="color: #666;">Tamu Undangan</span>';
    }
}

// Fungsi konfirmasi kehadiran
function confirmAttendance(status) {
    const nama = getParameterFromURL('nama') || localStorage.getItem('namaTamu') || 'Tamu Undangan';
    const namaDecoded = decodeURIComponent(nama).replace(/\+/g, ' ');
    
    // Sembunyikan tombol, tampilkan pesan terima kasih
    document.getElementById('rsvpButtons').classList.add('hidden');
    document.getElementById('thankYouMessage').classList.remove('hidden');
    
    // Simpan data konfirmasi
    const konfirmasiData = {
        nama: namaDecoded,
        status: status,
        waktu: new Date().toLocaleString('id-ID'),
        ip: await getIPAddress()
    };
    
    // Simpan di localStorage
    localStorage.setItem('konfirmasiUndangan', JSON.stringify(konfirmasiData));
    
    // Tampilkan pesan personal
    let pesan = '';
    if (status === 'hadir') {
        pesan = `Terima kasih ${namaDecoded}! Kami tidak sabar bertemu dengan Anda. ❤️`;
    } else {
        pesan = `Terima kasih ${namaDecoded} atas informasinya. Doakan kami ya! 🙏`;
    }
    
    // Optional: Tampilkan alert
    setTimeout(() => {
        alert(pesan);
    }, 500);
    
    // Kirim data ke console (bisa diganti dengan API)
    console.log('Data Konfirmasi:', konfirmasiData);
    
    // Optional: Kirim ke Google Sheets
    sendToGoogleSheets(konfirmasiData);
}

// Fungsi untuk mendapatkan IP address
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'unknown';
    }
}

// Fungsi untuk mengirim data ke Google Sheets (placeholder)
function sendToGoogleSheets(data) {
    // Ini akan kita setup nanti
    console.log('Mengirim data ke Google Sheets:', data);
    // Implementasi dengan Google Apps Script bisa ditambahkan later
}

// Fungsi hitung mundur ke hari H
function countdown() {
    const weddingDate = new Date('2025-03-15').getTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    console.log(`⏳ Menuju hari H: ${days} hari lagi`);
    
    // Bisa ditampilkan di halaman jika mau
    // document.getElementById('countdown').innerText = `${days} hari menuju hari bahagia`;
}

// Jalankan semua fungsi ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    displayGuestName();
    countdown();
    
    // Cek jika sudah konfirmasi sebelumnya
    const sudahKonfirmasi = localStorage.getItem('konfirmasiUndangan');
    if (sudahKonfirmasi) {
        document.getElementById('rsvpButtons').classList.add('hidden');
        document.getElementById('thankYouMessage').classList.remove('hidden');
    }
});

// Fungsi tambahan: Share undangan
function shareInvitation() {
    const nama = getParameterFromURL('nama') || localStorage.getItem('namaTamu') || 'Tamu Undangan';
    const shareText = `Hai! Saya ${nama} ingin berbagi undangan pernikahan Sarah & Michael. `;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Undangan Pernikahan Sarah & Michael',
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback untuk browser yang tidak support Web Share API
        prompt('Copy link berikut untuk berbagi:', shareUrl);
    }
}
