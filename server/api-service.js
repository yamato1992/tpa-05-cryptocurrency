require('dotenv').config();

const fetch = require('node-fetch');
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Tokyo');
const numeral = require('numeral');

const getHistoricalData = async function(cryptocurrency, target) {
  const DATA_LIMIT = 10;
  const apiUrl = `https://min-api.cryptocompare.com/data/histominute?fsym=${cryptocurrency}&tsym=${target}&limit=${DATA_LIMIT}`;
  const data = await fetch(apiUrl)
    .then(res => res.json())
    .then(json => json.Data);

  const times = [];
  const prices = [];
  const lastPrice = applyPriceFormat(data[DATA_LIMIT].close);
  const changeIn24Hour = applyPriceFormat(data[DATA_LIMIT].close - data[0].close);
  let highIn24Hour = data[0].high;
  let lowIn24Hour = data[0].low;

  data.forEach((item) => {
    const time = moment.unix(item.time).format('YYYY-MM-DD HH:mm');
    const price = applyPriceFormat(item.close);
    highIn24Hour = item.high > highIn24Hour ? item.high : highIn24Hour;
    lowIn24Hour = item.low > lowIn24Hour ? item.low : lowIn24Hour;
    times.push(time);
    prices.push(price);
  });

  highIn24Hour = applyPriceFormat(highIn24Hour);
  lowIn24Hour = applyPriceFormat(lowIn24Hour);

  return {
    times,
    prices,
    lastPrice,
    changeIn24Hour,
    highIn24Hour,
    lowIn24Hour,
  };
};

const getMarketInformation = async function(cryptocurrency, target) {
  const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptocurrency}&convert=${target}`;
  const apiKey = process.env.COIN_MARKET_CAP_API_KEY;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': apiKey,
    }
  };

  const data = await fetch(apiUrl, fetchOptions)
    .then(res => res.json())
    .then(json => json.data);

  const targetQuote = data[cryptocurrency].quote[target];
  const marketCap = numeral(targetQuote.market_cap).format('0.00 a');
  const volume24Hour = numeral(targetQuote.volume_24h).format('0.00 a');

  return {
    marketCap,
    volume24Hour,
  };
};

const applyPriceFormat = function(price) {
  return numeral(price).format('0,0.00');
};

module.exports = {
  getHistoricalData,
  getMarketInformation,
};
