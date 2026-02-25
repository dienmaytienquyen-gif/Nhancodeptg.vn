const crypto = require('crypto');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    
    try {
        const body = JSON.parse(event.body);
        const { type, code, seri } = body;

        const partner_id = '72845595642';
        const partner_key = 'a2beb524331cd657fbc016fcd6ccc21c9';
        const request_id = Math.floor(Math.random() * 100000000).toString();

        const sign = crypto.createHash('md5').update(partner_key + code + seri).digest('hex');

        const url = `https://doithe1s.vn/chargingws/v2?sign=${sign}&telco=${type}&code=${code}&serial=${seri}&amount=10000&partner_id=${partner_id}&request_id=${request_id}`;

        const response = await fetch(url);
        const result = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ status: "success", result })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: "error", msg: error.message })
        };
    }
};

