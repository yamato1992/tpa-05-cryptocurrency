<script>
import { Line } from 'vue-chartjs';

export default {
  name: 'Chart',
  props: {
    xAxis: Array,
    yAxis: Array,
    label: String,
  },
  extends: Line,
  mounted: function() {
    this.renderChart({
      labels: this.xAxis,
      datasets: [{
        label: this.label,
        data: this.yAxis,
        backgroundColor: 'rgba(20, 160, 255, 0.5)',
        pointBackgroundCOlor: 'rgba(20, 160, 255, 0.5)',
      }], 
    },
    {
      maintainAspectRatio: false,
    });
  },
};
</script>

<style>

</style>
