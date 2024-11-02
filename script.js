// Tampilkan tanggal dan waktu secara live
function updateTime() {
    const now = new Date();
    document.getElementById('currentDate').innerText = now.toLocaleDateString();
    document.getElementById('currentTime').innerText = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Inisialisasi data kecelakaan dari localStorage
let accidents = JSON.parse(localStorage.getItem('accidents')) || [];

// Perbarui tampilan statistik kecelakaan
function updateAccidentStats() {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set waktu ke awal hari
    
    let daily = 0, weekly = 0, monthly = 0, total = 0;
    
    accidents.forEach(accident => {
        const accidentDate = new Date(accident.date);
        accidentDate.setHours(0, 0, 0, 0); // Set waktu ke awal hari

        // Total kecelakaan harian
        if (accidentDate.getTime() === now.getTime()) {
            daily += accident.count;
        }
        
        // Total kecelakaan mingguan
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        if (accidentDate >= oneWeekAgo && accidentDate <= now) {
            weekly += accident.count;
        }
        
        // Total kecelakaan bulanan
        if (accidentDate.getMonth() === now.getMonth() && accidentDate.getFullYear() === now.getFullYear()) {
            monthly += accident.count;
        }

        // Total kecelakaan keseluruhan
        total += accident.count;
    });

    document.getElementById('dailyAccident').innerText = daily;
    document.getElementById('weeklyAccident').innerText = weekly;
    document.getElementById('monthlyAccident').innerText = monthly;
    document.getElementById('totalAccident').innerText = total;
}

// Tambahkan data kecelakaan baru
document.getElementById('accidentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dateInput = document.getElementById('accidentDate').value;
    const count = parseInt(document.getElementById('accidentCount').value);

    const selectedDate = new Date(dateInput);
    const today = new Date();
    
    // Set waktu ke awal hari
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (dateInput && count > 0) {
        // Cegah penambahan data kecelakaan untuk tanggal masa depan
        if (selectedDate > today) {
            alert('Tidak dapat menambahkan data kecelakaan untuk tanggal di masa depan.');
        } else {
            accidents.push({ date: dateInput, count });
            localStorage.setItem('accidents', JSON.stringify(accidents));
            updateAccidentStats();
            alert('Data kecelakaan berhasil ditambahkan');
            e.target.reset();
        }
    } else {
        alert('Masukkan tanggal dan jumlah kecelakaan yang valid.');
    }
});

// Muat data dan tampilkan statistik awal
updateTime();
updateAccidentStats();
