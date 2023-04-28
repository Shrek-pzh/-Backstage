<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="bottomchart">
        <div slot="header" class="bottomslot el-card_header">
          <span>线上热搜</span>
          <!-- 更多 -->
          <svg
            t="1680939203843"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2491"
            width="16"
            height="16"
          >
            <path
              d="M816 608a80 80 0 1 1 0-160 80 80 0 0 1 0 160z m-288 0a80 80 0 1 1 0-160 80 80 0 0 1 0 160z m-288 0a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"
              fill="#000000"
              p-id="2492"
            ></path>
          </svg>
        </div>
        <div style="height: 300px">
          <el-row :gutter="10">
            <el-col :span="12">
              <common title="搜索用户数" dataone="3424" datatwo="18">
                <template slot="chart">
                  <itemchart></itemchart>
                </template>
              </common>
            </el-col>
            <el-col :span="12">
              <common title="访问用户数" dataone="12345" datatwo="-5">
                <template slot="chart">
                  <itemchart></itemchart>
                </template>
              </common>
            </el-col>
          </el-row>
          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="id" label="排名" width="180">
            </el-table-column>
            <el-table-column prop="name" label="搜索关键字"> </el-table-column>
            <el-table-column prop="amount1" sortable label="用户数">
            </el-table-column>
            <el-table-column prop="amount2" sortable label="周涨幅">
            </el-table-column>
          </el-table>
          <el-pagination
            layout="prev, pager, next"
            :total="1000"
            style="float: right"
          >
          </el-pagination>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="bottomchart">
        <div slot="header" class="bottomslot el-card_header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="selectVal" style="margin-bottom: 20px">
            <el-radio-button label="qudao">全部渠道</el-radio-button>
            <el-radio-button label="xianshang">线上</el-radio-button>
            <el-radio-button label="mendian">门店</el-radio-button>
          </el-radio-group>
        </div>
        <div style="height: 350px" ref="piechart"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import common from "./common";
import itemchart from "./item";

import echarts from "echarts";

export default {
  name: "bottom",
  components: { common, itemchart },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 导航标签
      selectVal: "mendian",
      // 饼图实例
      piechart: null,
    };
  },
  mounted() {
    this.piechart = echarts.init(this.$refs.piechart);
    this.piechart.setOption({
      title: {
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: true,
            length2: 42,
          },
          data: [
            { value: 1048, name: "火影" },
            { value: 735, name: "海贼" },
            { value: 580, name: "龙珠" },
            { value: 484, name: "鬼灭" },
            { value: 300, name: "进巨" },
          ],
        },
      ],
    });
    //绑定事件
    this.piechart.on("mouseover", (params) => {
      //获取鼠标移上去那条数据
      const { name, value } = params.data;
      //重新设置标题
      this.piechart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style >
.bottomchart {
  padding: 20px;
}
.bottomslot {
  display: flex;
  justify-content: space-between;
}
.el-card_header {
  font-size: 20px;
  line-height: 2;
  border-bottom: 2px #eee solid;
}
</style>