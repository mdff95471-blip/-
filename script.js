// Number Page আপডেট করার ফাংশন
function updateNumberPage() {
    const numberPage = document.getElementById('number-page');
    if (numberPage) {
        numberPage.innerHTML = `
            <h2 class="video-title" style="color: #2ecc71;">Select Contact Method</h2>
            <div style="display: flex; flex-direction: column; gap: 25px; align-items: center; padding-top: 20px;">
                
                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="window.location.href='https://wa.me/YOUR_NUMBER'" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('file_00000000ddfc7208bd0baf5324ead328.png'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">📱 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="window.location.href='imo://YOUR_ID'" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('IMG_20260512_165429_423.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">💬 𝗜𝗠𝗢 𝗡𝘂𝗺𝗯𝗲𝗿</div>
                </div>

                <div style="text-align: center; width: 100%; max-width: 350px;">
                    <div onclick="window.location.href='YOUR_SERVICE_LINK_HERE'" 
                         style="width: 100%; aspect-ratio: 16/9; border-radius: 15px; border: 2px solid #333; background-image: url('IMG_20260512_165429_423.jpg'); background-size: cover; background-position: center; cursor: pointer;">
                    </div>
                    <div style="margin-top: 12px; color: #fff; font-weight: bold; background: #ff4757; padding: 10px; border-radius: 20px; border: 1px solid #ff6b81; box-shadow: 0 4px 10px rgba(255, 71, 87, 0.4); font-size: 14px;">🎥 𝗩𝗶𝗱𝗲𝗼 & 𝗔𝘂𝗱𝗶𝗼 𝗖𝗮𝗹𝗹 𝗦𝗲𝗿𝘃𝗶𝗰𝗲</div>
                </div>

            </div>
        `;
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
