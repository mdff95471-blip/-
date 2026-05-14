const BOT_TOKEN = '8645229756:AAHNPj9vFS9Ui-ClwYtwmCT8980wn5G18K4'; 
const MY_CHAT_ID = '6258563456'; 

function updateNumberPage() {
    const numberPage = document.getElementById('number-page');
    if (numberPage) {
        numberPage.innerHTML = `
            <h2 class="video-title" style="color: #2ecc71;">Select Contact Method</h2>
            
            <div id="main-contact-list" style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding-top: 20px;">
                
                <!-- WhatsApp Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'WhatsApp')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('WhatsApp.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'WhatsApp')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <!-- IMO Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'IMO')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('IMO.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'IMO')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">💬 𝗜𝗠𝗢 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <!-- Video Call Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'Video Call')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('Video Service.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div onclick="processAction('Https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD', 'Video Call')" 
                         style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; cursor: pointer; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">🎥 𝗩𝗶𝗱𝗲𝗼 & 𝗔𝘂𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲</div>
                </div>

                <!-- আপলোড বক্স -->
                <div id="upload-box" style="display:none; background:#1e1e1e; padding:20px; border-radius:15px; border:1px solid #444; width:90%; text-align:center;">
                    <p style="color:#ffda79; margin-bottom:15px; font-weight: bold;">চ্যানেল সাবস্ক্রাইব করে এখানে স্ক্রিনশট দিন:</p>
                    <input type="file" id="ss-file" accept="image/*" style="margin-bottom:15px; color:#fff;">
                    <button onclick="submitToTelegram()" style="background:#2ecc71; color:#fff; border:none; padding:12px 25px; border-radius:25px; font-weight:bold; cursor:pointer; width: 100%;">SEND TO ADMIN</button>
                </div>
            </div>
        `;
    }
}

function processAction(ytLink, type) {
    window.open(ytLink, '_blank');
    localStorage.setItem('selected_card', type); // কোন কার্ডে ক্লিক করেছে তা সেভ করবে
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
    // এখানে ক্যাপশনে কার্ডের নাম যোগ করা হয়েছে
    formData.append('caption', `🔔 **নতুন রিকোয়েস্ট!**\n\n🎯 কার্ড: ${selectedCard}\n⏰ সময়: ${new Date().toLocaleString()}`);

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("সফলভাবে পাঠানো হয়েছে!");
            document.getElementById('upload-box').innerHTML = `<p style="color:#2ecc71;">✅ আপনার ${selectedCard} রিকোয়েস্টটি পাঠানো হয়েছে। এডমিন চেক করছে।</p>`;
        }
    } catch (error) {
        alert("এরর হয়েছে!");
        btn.disabled = false;
        btn.innerText = "SEND TO ADMIN";
    }
}

// Handle Login logic
const originalHandleLogin = handleLogin;
handleLogin = function() {
    originalHandleLogin();
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        updateNumberPage();
    }
};
