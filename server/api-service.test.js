const { getHistoricalData, getMarketInformation } = require('./api-service');

describe('getHistoricalData', () => {
  test('return an object', async() => {
    const historicalData = await getHistoricalData('BTC', 'JPY');
    expect(typeof historicalData).toBe('object');
  });

  test('have properties', async() => {
    const historicalData = await getHistoricalData('BTC', 'JPY');
    expect(historicalData).toHaveProperty('times');
    expect(historicalData).toHaveProperty('prices');
    expect(historicalData).toHaveProperty('lastPrice');
    expect(historicalData).toHaveProperty('changeIn24Hour');
    expect(historicalData).toHaveProperty('highIn24Hour');
    expect(historicalData).toHaveProperty('lowIn24Hour');
  });

  test('return 1444 length data', async() => {
    const historicalData = await getHistoricalData('BTC', 'JPY');
    expect(historicalData.times).toHaveLength(1441);
  });
});

describe('getMarketInformation', () => {
  test('return an object', async() => {
    const marketInformation = await getMarketInformation('BTC', 'JPY');
    expect(typeof marketInformation).toBe('object');
  });

  test('have properties', async() => {
    const marketInformation = await getMarketInformation('BTC', 'JPY');
    expect(marketInformation).toHaveProperty('marketCap');
    expect(marketInformation).toHaveProperty('volume24Hour');
  });
});
