<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "barchart",
  data() {
    return {
      mychart: null,
    };
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart);
    this.mychart.setOption({
      tooltip: {},
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      series: [
        {
          type: "bar",
          data: [11, 45, 48, 77, 96, 21, 75, 43, 65, 98, 23],
          color: "cyan",
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style>
</style>