const fetch = require('node-fetch');
const moment = require('moment-timezone');
moment.tz.setDefault('Asisa/Tokyo');
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

const getMarketInformation = function() {
  return Promise.resolve({});
};

const applyPriceFormat = function(price) {
  return numeral(price).format('0,0.00');
};

module.exports = {
  getHistoricalData,
  getMarketInformation,
};
