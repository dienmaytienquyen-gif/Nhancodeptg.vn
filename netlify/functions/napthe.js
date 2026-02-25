const crypto = require('crypto');

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { type, code, seri } = body;
        
        // Thông tin từ ảnh Doithe1s của bạn
        const partner_id = '72845595642'; 
        const partner_key = 'a2beb524331cd657fbc016fcd6ccc21c9';
        
        // Tạo chữ ký bảo mật
        const sign = crypto.createHash('md5').update(partner_key + code + seri).digest('hex');
        
        // Gọi API nạp thẻ thật
        const url = `https://doithe1s.vn/chargingws/v2?sign=${sign}&telco=${type}&code=${code}&serial=${seri}&amount=10000&partner_id=${partner_id}&request_id=${Date.now()}`;

        const response = await fetch(url);
        const result = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
