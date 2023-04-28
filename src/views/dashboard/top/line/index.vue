<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "linechart",
  data() {
    return {
      mychart: null,
    };
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart);
    this.mychart.setOption({
      tooltip: {},

      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [11, 45, 48, 77, 96, 21, 75],
        },
      ],
      // 拐点样式
      itemStyle: {
        opacity: 0,
      },
      // 线条样式
      lineStyle: {
        color: "purple",
      },
      //填充颜色设置
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "purple", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#fff", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
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