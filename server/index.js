const express = require('express');

const apiService = require('./api-service');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/historical-data', (req, res) => {
  const {
    cryptocurrency,
    target,
  } = req.query;
  apiService.getHistoricalData(cryptocurrency, target)
    .then(data => res.json(data))
    .catch(err => {
      console.log('historical data error = ', err);
      res.status(400).json({ err: 'Error retrieving historical data' });
    });
});

app.get('/api/market-information', (req, res) => {
  const {
    cryptocurrency,
    target,
  } = req.query;
  apiService.getMarketInformation(cryptocurrency, target)
    .then(data => res.json(data))
    .catch((err) => {
      console.log('market info error = ', err);
      res.status(400).json({ err: 'Error retrieving market information' });
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
