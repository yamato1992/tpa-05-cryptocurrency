<template>
  <div id="app">
    <h1>Cryptocurrency Chart</h1>
    <p>[BTC] (JPY)</p>
    <div class="metrics-container">
      <Metric :metricName='metrics.rate.name' :metricValue='metrics.rate.value'></Metric>
      <Metric :metricName='metrics.change.name' :metricValue='metrics.change.value'></Metric>
      <Metric :metricName='metrics.high.name' :metricValue='metrics.high.value'></Metric>
      <Metric :metricName='metrics.low.name' :metricValue='metrics.low.value'></Metric>
      <Metric :metricName='metrics.volume.name' :metricValue='metrics.volume.value'></Metric>
      <Metric :metricName='metrics.cap.name' :metricValue='metrics.cap.value'></Metric>
    </div>
    <Chart v-if='loaded' :x-axis='times' :y-axis='prices' :label='cryptocurrency'></Chart>
    <h5 class='error-message'>{{ historicalDataErrorMessage }}</h5>
    <h5 class='error-message'>{{ marketInformationErrorMessage }}</h5>
    <h5>TECH PLAY ACADEMY</h5>
  </div>
</template>

<script>
import Metric from './components/Metric';
import Chart from './components/Chart';

export default {
  name: 'App',
  components: {
    Metric,
    Chart,
  },
  data: function() {
    return {
      cryptocurrency: 'BTC',
      target: 'JPY',
      times: [],
      prices: [],
      metrics: {
        rate: { name: '1 cryptocurrency <> target', value: '-'},
        change: { name: '24 Hour Change', value: '-'},
        high: { name: '24 Hour High', value: '-'},
        low: { name: '24 Hour Low', value: '-'},
        volume: { name: '24 Hour Volume', value: '-'},
        cap: { name: 'Market Cap', value: '-'},
      },
      historicalDataErrorMessage: '',
      marketInformationErrorMessage: '',
      loaded: false,
    };
  },
  mounted: function() {
    this.setMetricName(this.cryptocurrency, this.target);
    this.setMetricValue(this.cryptocurrency, this.target);
  },
  methods: {
    setMetricName: function(cryptocurrency, target) {
      this.metrics.rate.name = `1 ${cryptocurrency} <> ${target}`;
    },
    setMetricValue: async function(cryptocurrency, target) {
      const historicalData = await this.fetchHistoricalData(cryptocurrency, target)
      if (historicalData.err) {
        this.historicalDataErrorMessage = historicalData.err;
      } else {
        this.times = historicalData.times;
        this.prices = historicalData.prices;
        this.metrics.rate.value = historicalData.lastPrice;
        this.metrics.change.value = historicalData.changeIn24Hour;
        this.metrics.high.value = historicalData.highIn24Hour;
        this.metrics.low.value = historicalData.lowIn24Hour;
        this.loaded = true;
      }

      const marketInformationData = await this.fetchMarketInformation(cryptocurrency, target);
      if (marketInformationData.err) {
        this.marketInformationErrorMessage = marketInformationData.err;
      } else {
        this.metrics.volume.value = marketInformationData.volume24Hour;
        this.metrics.cap.value = marketInformationData.marketCap;
      }
    },
    fetchHistoricalData: function(cryptocurrency, target) {
      const path = `/api/historical-data?cryptocurrency=${cryptocurrency}&target=${target}`;
      return fetch(path).then(res => res.json());
    },
    fetchMarketInformation: function(cryptocurrency, target) {
      const path = `/api/market-information?cryptocurrency=${cryptocurrency}&target=${target}`;
      return fetch(path).then(res => res.json());
    },
  }
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}

.metrics-container {
  display: flex;
  justify-content: center;
}

.error-message {
  color: red;
}

</style>
