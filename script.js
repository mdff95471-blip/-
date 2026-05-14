// ==========================================
// ⚙️ অ্যাপের ছবি ও লিঙ্ক কন্ট্রোল প্যানেল (CONFIG)
// এখান থেকে খুব সহজে ছবি ও লিঙ্ক পরিবর্তন করুন
// ==========================================
const APP_CONFIG = {
    // ১. মেইন সিলেকশন পেজের দুটি কার্ডের ছবি
    mainMenu: {
        numberListImage: "photo.jpg", // নাম্বার কার্ডের ছবি
        videoServicesImage: "photo.jpg"           // ভিডিও কার্ডের ছবি
    },

    // ২. পাসওয়ার্ড দেওয়ার পর নাম্বার পেজের দুটি কার্ডের ছবি ও লিঙ্ক
    numberPage: {
        whatsapp: {
            image: "file_00000000ddfc7208bd0baf5324ead328.png",     // হোয়াটসঅ্যাপ কার্ডের ছবি
            link: "https://wa.me/YOUR_NUMBER"                       // আপনার হোয়াটসঅ্যাপ লিঙ্ক
        },
        imo: {
            image: "IMG_20260512_165429_423.jpg",                   // ইমো কার্ডের ছবি
            link: "imo://YOUR_ID"                                   // আপনার ইমো লিঙ্ক
        }
    }
};

// ==========================================
// 🚀 অ্যাপের মেইন কোড (এখানে আর হাত দেওয়ার প্রয়োজন নেই)
// ==========================================

window.onload = function() {
    // প্রথমে সেশন থেকে লগইন ডেটা মুছে দেবে
    sessionStorage.removeItem('isLoggedIn'); 

    // মেইন সিলেকشن মেনুর কার্ড দুটিতে ছবি সেট করা
    const cards = document.querySelectorAll('#selection-menu .menu-card');

    if (cards.length >= 2) {
        cards[0].style.backgroundImage = `url('${APP_CONFIG.mainMenu.numberListImage}')`;
        cards[0].style.backgroundSize = "cover";
        cards[0].style.backgroundPosition = "center";

        cards[1].style.backgroundImage = `url('${APP_CONFIG.mainMenu.videoServicesImage}')`;
        cards[1].style.backgroundSize = "cover";
        cards[1].style.backgroundPosition = "center";
    }
};

// Number Page আপডেট করার ফাংশন (WhatsApp & Imo)
function updateNumberPage() {
    const numberPage = document.getElementById('number-page');
    if (numberPage) {
        numberPage.innerHTML = `
            <h2 class="video-title" style="color: #2ecc71;">Select Contact Method</h2>
            <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; padding-top: 20px;">
                
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="window.location.href='${APP_CONFIG.numberPage.whatsapp.link}'" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('${APP_CONFIG.numberPage.whatsapp.image}'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 10px; color: #fff; font-weight: bold; background: #1e1e1e; padding: 8px; border-radius: 20px; border: 1px solid #444;">WhatsApp Number</div>
                </div>

                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="window.location.href='${APP_CONFIG.numberPage.imo.link}'" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('${APP_CONFIG.numberPage.imo.image}'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 10px; color: #fff; font-weight: bold; background: #1e1e1e; padding: 8px; border-radius: 20px; border: 1px solid #444;">Imo Number</div>
                </div>

            </div>
        `;
    }
}

let selectedCategory = "";

function showSelectionMenu() {
    document.getElementById('warning-overlay').style.display = 'none';
    document.getElementById('selection-menu').style.display = 'block';
}

function goToLogin(category) {
    selectedCategory = category;
    document.getElementById('selection-menu').style.display = 'none';
    document.getElementById('login-page').style.display = 'flex';
}

function handleLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    
    if(u === "admin" && p === "1234") {
        sessionStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login-page').style.display = 'none';
        
        if(selectedCategory === 'video') {
            document.getElementById('home-page').style.display = 'block';
        } else {
            document.getElementById('number-page').style.display = 'block';
            updateNumberPage(); 
        }
    } else {
        alert("ভুল পাসওয়ার্ড!");
    }
}

function handlePlay(ytLink, tgLink) {
    let subscribed = localStorage.getItem('isSubscribed');
    if (!subscribed) {
        alert("ভিডিও দেখতে প্রথমে চ্যানেলটি সাবস্ক্রাইব করুন!");
        localStorage.setItem('isSubscribed', 'true');
        window.open(ytLink, '_blank');
    } else {
        window.location.href = tgLink;
    }
}

function exitApp() { 
    window.location.href = "https://google.com"; 
}
