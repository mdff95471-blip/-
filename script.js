const BOT_TOKEN = '8645229756:AAHNPj9vFS9Ui-ClwYtwmCT8980wn5G18K4'; 
const MY_CHAT_ID = '6258563456'; 
const FIREBASE_DB_URL = 'https://lala-29a05-default-rtdb.firebaseio.com/'; 

// ইউজারের জন্য একটা ইউনিক আইডি তৈরি বা লোড করা
if (!localStorage.getItem('user_session_id')) {
    localStorage.setItem('user_session_id', 'USER_' + Math.floor(100000 + Math.random() * 900000));
}
const userId = localStorage.getItem('user_session_id');

// 🔴 রিফ্রেশ প্রবলেম সলভ: পেজ লোড হলেই চেক করবে ইউজার অলরেডি লগইন বা ভেরিফাইড কি না
document.addEventListener("DOMContentLoaded", function() {
    // যদি সে আগে থেকেই লগইন করা থাকে, তবে তাকে আর আটকে রাখবে না
    if (sessionStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('isUserVerified') === 'true') {
        sessionStorage.setItem('isLoggedIn', 'true'); // সেশন ধরে রাখা
        
        // আপনার নোটিশ বা লগইন বক্সের ID সাধারণত 'login-page' বা 'auth-box' হয়, ওটা হাইড করার চেষ্টা করবে
        const loginPage = document.getElementById('login-page') || document.getElementById('auth-box');
        if (loginPage) {
            loginPage.style.display = 'none';
        }
        
        // সরাসরি মেইন পেজ ওপেন করবে
        updateNumberPage();
    }
});

function updateNumberPage() {
    const numberPage = document.getElementById('number-page');
    if (numberPage) {
        numberPage.style.display = 'block'; // পেজটি দৃশ্যমান করা
        numberPage.innerHTML = `
            <h2 class="video-title" style="color: #2ecc71;">Select Contact Method</h2>
            
            <div id="main-contact-list" style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding-top: 20px;">
                
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'WhatsApp')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('WhatsApp.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'WhatsApp')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'IMO')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('IMO.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'IMO')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">💬 𝗜𝗠𝗢 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'Video Call')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('Video Service.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'Video Call')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">🎥 𝗩𝗶𝗱𝗲𝗼 & 𝗔𝘂δ𝗶𝗼 𝗖𝗮𝗹𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲</div>
                </div>

                <div id="upload-box" style="display:none; background:#1e1e1e; padding:20px; border-radius:15px; border:1px solid #444; width:90%; text-align:center;">
                    <p style="color:#ffda79; margin-bottom:15px; font-weight: bold;">চ্যানেল সাবস্ক্রাইব করে এখানে স্ক্রিনশট দিন:</p>
                    <input type="file" id="ss-file" accept="image/*" style="margin-bottom:15px; color:#fff;">
                    <button onclick="submitToTelegram()" style="background:#2ecc71; color:#fff; border:none; padding:12px 25px; border-radius:25px; font-weight:bold; cursor:pointer; width: 100%;">SEND TO ADMIN</button>
                </div>
                
                <div id="number-display-box" style="display:none; background:#2c3e50; padding:20px; border-radius:15px; border:2px solid #2ecc71; width:90%; text-align:center; margin-top:20px; box-shadow: 0 0 15px #2ecc71;">
                    <h3 style="color:#2ecc71; margin:0 0 10px 0;">✅ Admin Sent Your Number!</h3>
                    <p id="admin-number" style="color:#fff; font-size:24px; font-weight:bold; letter-spacing:2px; background:#1a252f; padding:10px; border-radius:10px; margin:0; border:1px dashed #2ecc71; user-select:all;"></p>
                    <p style="color:#bdc3c7; font-size:12px; margin-top:8px;">নম্বরটি কপি করে যোগাযোগ করুন</p>
                </div>
            </div>
        `;
        listenForAdminReply();
    }
}

function processAction(ytLink, type) {
    window.open(ytLink, '_blank');
    localStorage.setItem('selected_card', type);
    document.getElementById('upload-box').style.display = 'block';
    document.getElementById('upload-box').scrollIntoView({ behavior: 'smooth' });
}

async function submitToTelegram() {
    const fileInput = document.getElementById('ss-file');
    const file = fileInput.files[0];
    const selectedCard = localStorage.getItem('selected_card') || 'Unknown';
    
    if (!file) {
        alert("স্ক্রিনশট সিলেক্ট করুন!");
        return;
    }

    const btn = event.target;
    btn.innerText = "Sending...";
    btn.disabled = true;

    const formData = new FormData();
    formData.append('chat_id', MY_CHAT_ID);
    formData.append('photo', file);
    formData.append('caption', `🔔 **নতুন রিকোয়েস্ট!**\n\n🎯 কার্ড: ${selectedCard}\n🆔 ইউজার আইডি: \`\ ${userId}\`\n⏰ সময়: ${new Date().toLocaleString()}\n\n👉 এই মেসেজে Reply দিয়ে শুধু নম্বরটি লিখে সেন্ড করুন।`);

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("সফলভাবে পাঠানো হয়েছে!");
            document.getElementById('upload-box').innerHTML = `<p style="color:#2ecc71; font-weight:bold;">✅ আপনার ${selectedCard} রিকোয়েস্টটি পাঠানো হয়েছে। এডমিন কিছুক্ষণের মধ্যে এই পেজেই নম্বর দিয়ে দেবে, দয়া করে অপেক্ষা করুন।</p>`;
        }
    } catch (error) {
        alert("এরর হয়েছে!");
        btn.disabled = false;
        btn.innerText = "SEND TO ADMIN";
    }
}

function listenForAdminReply() {
    setInterval(async () => {
        try {
            const res = await fetch(`${FIREBASE_DB_URL}replies/${userId}.json`);
            const data = await res.json();
            if (data && data.number) {
                document.getElementById('number-display-box').style.display = 'block';
                document.getElementById('admin-number').innerText = data.number;
                document.getElementById('number-display-box').scrollIntoView({ behavior: 'smooth' });
            }
        } catch (e) { console.error(e); }
    }, 3000);
}

// লগইন সাকসেস ফাংশন
const originalHandleLogin = handleLogin;
handleLogin = function() {
    if (typeof originalHandleLogin === 'function') originalHandleLogin();
    localStorage.setItem('isUserVerified', 'true'); // ভেরিফিকেশন ট্রু করা
    sessionStorage.setItem('isLoggedIn', 'true');
    updateNumberPage();
};
