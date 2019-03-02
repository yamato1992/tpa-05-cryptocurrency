<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'Chart',
  props: {
    times: Array,
    prices: Array,
  },
  data: function() {
    return {
      chardata: {
        labels: this.times,
        datasets: [{
          label: 'BTC',
          data: this.prices,
          backgroundColor: 'rgba(20, 160, 255, 0.5)',
          pointBackgroundCOlor: 'rgba(20, 160, 255, 0.5)',
        },]
      },
      options: {
        maintainAspectRatio: false,
      }
    };
  },
  extends: Line,
  mounted: function() {
    
    this.renderChart(this.chardata, this.options);
  }
};
</script>

<style>

</style>
