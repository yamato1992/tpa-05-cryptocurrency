const { getHistoricalData, getMarketInformation } = require('./api-service');

describe('getHistoricalData', () => {
  test('return an object', async() => {
    const getHistoricalData = await getHistoricalData('BTC', 'JPY');
    expect(typeof getHistoricalData).toBe('object');
  });
});

describe('getMarketInformation', () => {
  test('return an object', async() => {
    const marketInformation = await getMarketInformation('BTC', 'JPY');
    expect(typeof marketInformation).toBe('object');
  });
});
