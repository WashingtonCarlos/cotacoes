const request = require('request');
const api_token = 'eQ3DVqmxjZvHpPy043CItLsfK6mtW6DFhHdTR5ai85IB7sutuiQaRK7hsB6L';

const cotacao = (symbol, callback) => {
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`;
    request({ url: url, json: true }, (err, response) => {
        if (err) {
            callback({
                mensage: `Something went wrong: ${err}`,
                code: 500
            }, undefined);
        }
        if (response.body === undefined || response.body.data === undefined) {
            callback({
                mensage: 'No data found',
                code: 404
            }, undefined);
        }
        const data2 = response.body.data[0];
        const { symbol, price_open, price, day_high, day_low } = data2;
        callback(undefined, { symbol, price_open, price, day_high, day_low });
    });
};

module.exports = cotacao;