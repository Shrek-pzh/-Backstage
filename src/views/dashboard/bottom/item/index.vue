<template>
  <div ref="chart" style="height: 120px"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "bottomItem",
  data() {
    return {
      mychart: null,
    };
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart);
    this.mychart.setOption({
      xAxis: { show: false, type: "category" },
      yAxis: { show: false },
      grid: {
        left: "3%",
        right: "3%",
        top: "3%",
        bottom: "3%",
      },
      series: [
        {
          name: "Line 1",
          type: "line",
          stack: "Total",
          smooth: true,

          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: [140, 232, 101, 264, 90, 340, 250, 140, 232, 101, 264, 90],
        },
      ],
    });
  },
};
</script>

<style>
</style>