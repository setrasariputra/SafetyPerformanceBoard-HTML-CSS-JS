class auth {
    constructor() {
        this.init();
    }

    init() {
        this.authValidation();
        this.sessionValidation();
        this.timestamp();
        this.logout();
    }

    authValidation() {
        // get auth value
        const auth = localStorage.getItem("auth");

        // auth validation
        if (!auth || Number(auth) !== 1) {
            // redirect to login page
            this.redirectToLogin();
        }   
    }

    sessionValidation() {
        const activeSession = Number(localStorage.getItem("session"));

        // Jalankan setiap 1 menit (60.000 milidetik)
        setInterval(() => {
            const timestamp = Date.now();
            if(timestamp >= activeSession) {
                // redirect to login page
                this.redirectToLogin();
            }
        }, 1 * 60 * 1000);
    }

    timestamp() {
        setInterval(() => {
            const timestamp = Date.now();
            localStorage.setItem('timestamp', timestamp);
        }, 1 * 1 * 1000);
    }

    logout() {
        document.getElementById("auth-logout").addEventListener("click",(e)=>{
            e.preventDefault();
            this.redirectToLogin();
        });
    }

    redirectToLogin() {
        // clear localStorage
        localStorage.clear();

        // redirect
        const loginUrl = 'http://127.0.0.1:5501/login.html';
        window.location.href = loginUrl;
    }
}

new auth();

