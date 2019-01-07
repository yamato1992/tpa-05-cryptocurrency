<template>
  <div id="app">
    <h1>Cryptocurrency Chart</h1>
    <p>[BTC] (JPY)</p>
    <div class="metrics-container">
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
      <div class="metric-container">
        <div class="metric-label">Metric Name</div>
        <div class="metric-value">Metric Value</div>
      </div>
    </div>
    <div>TODO: Chart</div>
    <h5>TECH PLAY ACADEMY</h5>
  </div>
</template>

<script>
export default {
  name: 'App',
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

.metric-container {
  background: #ccc;
  width: 120px;
  height: 50px;
  padding: 10px;
  margin: 10px;
}
</style>
