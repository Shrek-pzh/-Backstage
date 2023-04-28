<template>
  <div>
    <el-card class="cardstyle">
      <div slot="header" class="slotheader">
        <el-tabs v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <div>
          <ul @click="getorderTime($event)">
            <li class="lione" data-index="0">今日</li>
            <li class="lione" data-index="1">本周</li>
            <li class="lione" data-index="2">本月</li>
            <li class="lione" data-index="3">本年</li>
          </ul>
          <div class="date">
            <el-date-picker
              v-model="dateval"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="slotchart" ref="chart"></div>
          </el-col>
          <el-col :span="6" style="height: 300px">
            <h2>门店{{ titleshow }}排名</h2>
            <ul style="display: block; width: 100%">
              <li class="litwo">
                <span class="topnum">1</span><span>肯德基</span
                ><span class="datanum">45655</span>
              </li>
              <li class="litwo">
                <span class="topnum">2</span><span>肯德基</span
                ><span class="datanum">45655</span>
              </li>
              <li class="litwo">
                <span class="topnum">3</span><span>肯德基</span
                ><span class="datanum">45655</span>
              </li>
              <li class="litwo">
                <span>4</span><span>肯德基</span
                ><span class="datanum">45655</span>
              </li>
              <li class="litwo">
                <span>5</span><span>肯德基</span
                ><span class="datanum">45655</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import echarts from "echarts";
export default {
  name: "middle",
  data() {
    return {
      activeName: "sale",
      dateval: [],
      mychart: null,
      // 测试数据
      dataone: [10, 52, 200, 334, 390, 330, 220, 60, 433, 20, 84, 222, 110, 20],
      datatwo: [60, 433, 20, 84, 222, 110, 20, 10, 52, 200, 334, 390, 330, 220],
      // 展示标题
      titleshow: "销售额",
    };
  },
  watch: {
    activeName: {
      immediate: true,

      handler(newval, oldval) {
        this.$nextTick(() => {
          this.titleshow = newval == "sale" ? "销售额" : "访问量";
          const data = newval == "sale" ? this.dataone : this.datatwo;
          this.mychart.setOption({
            title: {
              text: this.titleshow + "趋势",
            },
            series: [
              {
                data: data,
              },
            ],
          });
        });
      },
    },
  },
  methods: {
    getorderTime(e) {
      let dayfirst, daylast;
      const orderval = e.target.dataset.index;
      switch (orderval) {
        case "0":
          (function () {
            dayfirst = daylast = dayjs().format("YYYY-MM-DD");
            console.log(dayfirst, daylast);
          })();
          break;
        case "1":
          (function () {
            dayfirst = dayjs().day(-6).format("YYYY-MM-DD"); // 1为星期一
            daylast = dayjs().day(0).format("YYYY-MM-DD"); // 0为星期日
            console.log(dayfirst, daylast);
          })();
          break;
        case "2":
          (function () {
            dayfirst = dayjs().startOf("month").format("YYYY-MM-DD"); // 1为星期一
            daylast = dayjs().endOf("month").format("YYYY-MM-DD"); // 0为星期日
            console.log(dayfirst, daylast);
          })();
          break;
        case "3":
          (function () {
            dayfirst = dayjs().startOf("year").format("YYYY-MM-DD"); // 1为星期一
            daylast = dayjs().endOf("year").format("YYYY-MM-DD"); // 0为星期日
            console.log(dayfirst, daylast);
          })();
          break;
      }
      this.dateval = [dayfirst, daylast];
    },
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart);
    this.mychart.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          color: "blue",
          data: [],
        },
      ],
    });
  },
};
</script>

<style lang="less">
.cardstyle {
  padding: 10px;
}
.slotheader {
  display: flex;
  justify-content: space-between;
}
ul {
  float: left;
  margin: 0;
  padding: 0;
  list-style: none;
}
.lione {
  float: left;
  margin: 10px 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.date {
  float: left;
}
.el-card__header {
  border-bottom: 0px;
}
.slotchart {
  width: 100%;
  height: 300px;
  margin: 10px;
}
.topnum {
  display: inline-block;
  width: 15px;
  height: 15px;
  line-height: 15px;
  color: white;
  border-radius: 50%;
  padding: 0 3px;
  background-color: black;
}

.litwo {
  display: block;
  height: 35px;
  line-height: 35px;
  span {
    margin: 10px;
  }
  .datanum {
    float: right;
    width: 45px;
    height: 19px;
    margin: 0;
  }
}
</style>