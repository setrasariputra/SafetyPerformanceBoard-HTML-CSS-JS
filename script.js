class SafetyPerformanceBoard {
    constructor() {
        this.run();
    }

    run() {
        this.liveDateTime();    
        this.addAccidentRecord();
        this.updateAccidentStats();
    }

    liveDateTime() {
        setInterval(this.updateDateTime, 1000);
    }

    updateDateTime() {
        const now = new Date();
        document.getElementById('currentDate').innerHTML = now.toLocaleDateString();
        document.getElementById('currentTime').innerHTML = now.toLocaleTimeString();
    }

    getAccidentRecords() {
        let accidents = JSON.parse(localStorage.getItem('accidents')) || [];
        return accidents;
    }

    addAccidentRecord() {
        document.getElementById("accidentForm").addEventListener("submit", (e) => {
            e.preventDefault();
            // get form value
            const accidentDate = document.getElementById("accidentDate").value;
            const accidentCount = parseInt(document.getElementById("accidentCount").value);
        
            if(accidentDate && accidentCount > 0) {
                // futureDate validation
                const today = new Date().setHours(0, 0, 0, 0);
                const selectedDate = new Date(accidentDate).setHours(0, 0, 0, 0);
                if(selectedDate > today) {
                    alert('Tidak dapat menambahkan data kecelakaan untuk tanggal di masa depan.');
                }else{
                    // get accidents record on localStorage if exists
                    let accidentRecords = this.getAccidentRecords();
                    accidentRecords.push(
                        {
                            "date": accidentDate,
                            "count": accidentCount
                        }
                    );
                    // save to localStorage
                    localStorage.setItem("accidents", JSON.stringify(accidentRecords));
                    // update accidentStat
                    this.updateAccidentStats();
                    alert('Data kecelakaan berhasil ditambahkan');
                }
            }else{
                alert('Masukkan tanggal dan jumlah kecelakaan yang valid.');
            }
        });
    }

    getThisWeek(date) {
        // Salin tanggal ke variabel baru agar tidak mengubah tanggal aslinya
        const currentDate = new Date(date);
        
        // Atur tanggal ke hari Senin terdekat sebelum atau sama dengan tanggal yang diberikan
        currentDate.setHours(0, 0, 0, 0); // Reset waktu untuk akurasi
        currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7)); // 0 = Minggu, 1 = Senin, ...
        const yearStart = new Date(currentDate.getFullYear(), 0, 1); // 1 Januari
        const weekNo = Math.ceil((((currentDate - yearStart) / 86400000) + 1) / 7); // Hitung jumlah hari dan bagi dengan 7

        return weekNo;
    }

    updateAccidentStats() {
        const now = new Date().setHours(0, 0, 0, 0);
        const thisMonth = new Date().getMonth();
        const thisWeek = this.getThisWeek(new Date());
        console.log(thisWeek);
        const accidentsRecord = this.getAccidentRecords();
        let totalAllTime = 0;
        let totalToday = 0;
        let totalThisMonth = 0;
        let totalThisWeek = 0;
        // loop record to count total
        accidentsRecord.forEach(accident => {
            // get total accident allTIme
            totalAllTime += accident.count;

            // today
            let accidentDate = new Date(accident.date).setHours(0, 0, 0, 0);
            if(now === accidentDate) {
                // count total accident on Today
                totalToday = totalToday + accident.count;
            }

            // thisMonth
            let accidentThisMonth = new Date(accident.date).getMonth();
            if(thisMonth === accidentThisMonth) {
                totalThisMonth = totalThisMonth + accident.count;
            }

            // thisWeek
            let accidentWeek = this.getThisWeek(new Date(accident.date));
            if(thisWeek === accidentWeek) {
                totalThisWeek = totalThisWeek + accident.count;
            }
        });

        // print on innerHTML
        document.getElementById("totalAccidentAllTime").innerHTML = totalAllTime;
        document.getElementById("totalAccidentToday").innerHTML = totalToday;
        document.getElementById("totalAccidentThisMonth").innerHTML = totalThisMonth;
        document.getElementById("totalThisWeek").innerHTML = totalThisWeek;
    }
}

new SafetyPerformanceBoard();