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
        labels: [
          "2019-03-02 10:38",
          "2019-03-02 10:39",
          "2019-03-02 10:40",
          "2019-03-02 10:41",
          "2019-03-02 10:42",
          "2019-03-02 10:43",
          "2019-03-02 10:44",
          "2019-03-02 10:45",
          "2019-03-02 10:46",
          "2019-03-02 10:47",
          "2019-03-02 10:48"
        ],
        datasets: [{
          label: 'BTC',
          data: [
            426,533.46,
            426,508.61,
            426,512.02,
            426,479.61,
            426,453.75,
            426,479.89,
            426,484.81,
            426,547.44,
            426,584.11,
            426,632.29,
            426,611.11
          ],
          backgroundColor: 'rgba(20, 160, 255, 0.5)',
          pointBackgroundCOlor: 'rgba(20, 160, 255, 0.5)',
        },]
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 15,
            right: 15,
            top: 30,
            bottom: 15,
          },
        }
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
