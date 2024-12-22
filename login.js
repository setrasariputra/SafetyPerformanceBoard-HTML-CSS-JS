document.getElementById("login-form").addEventListener("submit",(e)=>{
    e.preventDefault();

    const userlogin = document.getElementById("userlogin").value;
    const userpass = document.getElementById("userpass").value;
    const userPassString=userpass.toString();

    // encrypt credential
    const rawCredential = userlogin+userPassString;
    const base64Encryption = btoa(rawCredential); // model base64 encryption
    
    if(base64Encryption === 'c2FmZXR5MDAwMDAw') {
        // save to localStorage
        const auth = 1;
        localStorage.setItem("auth", auth);
        
        // set session
        const now = new Date();
        const timestamp = Date.now();
        const expiredDuration = 1 * 60 * 1000; // 60 seconds
        const expiredTimestamp = timestamp + expiredDuration;
        
        // save to localStorage
        localStorage.setItem('session', expiredTimestamp);

        // redirect ke dashboard
        const dashbordUrl = 'http://127.0.0.1:5501/dashboard.html';
        window.location.href = dashbordUrl;
    }
    else{
        alert("login gagal")
    }
});