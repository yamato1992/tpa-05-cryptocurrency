<template>
  <div id="app">
    <h1>Cryptocurrency Chart</h1>
    <p>[BTC] (JPY)</p>
    <div class="metrics-container">
      <Metric metricName='1 BTC <> JPY' :metricValue='jpyPerBTC'></Metric>
      <Metric metricName='24 Hour Change' :metricValue='changeIn24Hour'></Metric>
      <Metric metricName='24 Hour High' :metricValue='highIn24Hour'></Metric>
      <Metric metricName='24 Hour Low' :metricValue='lowIn24Hour'></Metric>
      <Metric metricName='24 Hour Volume' :metricValue='volumeIn24Hour'></Metric>
      <Metric metricName='Market Cap' :metricValue='marketCap'></Metric>
    </div>
    <Chart></Chart>
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
      jpyPerBTC: 1,
      changeIn24Hour: 2,
      highIn24Hour: 3,
      lowIn24Hour: 4,
      volumeIn24Hour: 5,
      marketCap: 6,
    };
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
</style>
