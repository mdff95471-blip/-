// আপনার টেলিগ্রাম বটের তথ্য
const BOT_TOKEN = '8645229756:AAHNPj9vFS9Ui-ClwYtwmCT8980wn5G18K4'; 
const MY_CHAT_ID = '6258563456'; // আপনার দেওয়া চ্যাট আইডি

// Number Page আপডেট করার ফাংশন
function updateNumberPage() {
    const numberPage = document.getElementById('number-page');
    if (numberPage) {
        numberPage.innerHTML = `
            <h2 class="video-title" style="color: #2ecc71;">Select Contact Method</h2>
            
            <div id="main-contact-list" style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding-top: 20px;">
                
                <!-- WhatsApp Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('WhatsApp.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <!-- IMO Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('IMO.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">💬 𝗜𝗠𝗢 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <!-- Video Call Card -->
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="processAction('https://youtube.com/@lalagamer100?si=JiqNQ_he9nTYYpyD')" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('Video Service.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">🎥 𝗩𝗶𝗱𝗲𝗼 & 𝗔𝘂𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲</div>
                </div>

                <!-- স্ক্রিনশট আপলোড বক্স -->
                <div id="upload-box" style="display:none; background:#1e1e1e; padding:20px; border-radius:15px; border:1px solid #444; width:90%; text-align:center; margin-top: 10px;">
                    <p style="color:#ffda79; margin-bottom:15px; font-weight: bold;">সাবস্ক্রাইব করে স্ক্রিনশটটি দিন:</p>
                    <input type="file" id="ss-file" accept="image/*" style="margin-bottom:15px; color:#fff; font-size: 12px;">
                    <button onclick="submitToTelegram()" style="background:#2ecc71; color:#fff; border:none; padding:12px 25px; border-radius:25px; font-weight:bold; cursor:pointer; width: 100%;">SEND TO ADMIN</button>
                </div>
            </div>
        `;
    }
}

// কার্ডে ক্লিক করলে ইউটিউবে নিয়ে যাবে এবং আপলোড বক্স ওপেন করবে
function processAction(ytLink) {
    window.open(ytLink, '_blank');
    document.getElementById('upload-box').style.display = 'block';
    document.getElementById('upload-box').scrollIntoView({ behavior: 'smooth' });
}

// টেলিগ্রাম বটে ছবি পাঠানোর ফাংশন
async function submitToTelegram() {
    const fileInput = document.getElementById('ss-file');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("দয়া করে একটি স্ক্রিনশট সিলেক্ট করুন!");
        return;
    }

    const btn = event.target;
    btn.innerText = "Sending...";
    btn.disabled = true;

    const formData = new FormData();
    formData.append('chat_id', MY_CHAT_ID);
    formData.append('photo', file);
    formData.append('caption', `🔔 **নতুন সাবস্ক্রাইব রিকোয়েস্ট!**\n\n📅 সময়: ${new Date().toLocaleString()}`);

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("সফলভাবে পাঠানো হয়েছে! এডমিন চেক করছে।");
            document.getElementById('upload-box').innerHTML = `
                <div style="color:#2ecc71; padding:15px; border:1px solid #2ecc71; border-radius:10px; background: rgba(46, 204, 113, 0.1);">
                    ✅ স্ক্রিনশট পাঠানো হয়েছে! এডমিন আপনার রিকোয়েস্টটি চেক করছে।
                </div>`;
        } else {
            throw new Error('Telegram API Error');
        }
    } catch (error) {
        alert("পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        btn.disabled = false;
        btn.innerText = "SEND TO ADMIN";
    }
}

// লগইন সফল হওয়ার পর এই ফাংশনটি কল হবে
const originalHandleLogin = handleLogin;
handleLogin = function() {
    originalHandleLogin();
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        updateNumberPage();
    }
};
