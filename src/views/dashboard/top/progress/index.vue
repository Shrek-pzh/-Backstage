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
        //最小值与最大值的设置
        min: 0,
        max: 100,
      },
      yAxis: { show: false, type: "category" },
      series: [
        {
          type: "bar",
          data: [78],
          barWidth: 10,
          color: "yellowgreen",
          // 设置背景色
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
        },
      ],
      //布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //文本标签
      label: {
        show: true,
        //改变文本内容
        formatter: "|",
        //文本标签位置调试
        position: "right",
      },
    });
  },
};
</script>

<style>
</style>