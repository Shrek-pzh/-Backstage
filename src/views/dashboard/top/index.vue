<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><TopItem title="总销售额" datas="¥ 126560">
          <template slot="chart">
            <div>
              周同比 56.67%&nbsp;&nbsp;<svg
                t="1680856264300"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1778"
                width="16"
                height="16"
              >
                <path
                  d="M511.744 940.8a44.8 44.8 0 0 1-44.8-44.8V236.544L159.68 543.68a44.8 44.8 0 1 1-63.36-63.36l384-384a44.8 44.8 0 0 1 63.36 0l384 384a44.8 44.8 0 1 1-63.36 63.36L556.544 235.776V896a44.8 44.8 0 0 1-44.8 44.8z"
                  fill="#d81e06"
                  p-id="1779"
                ></path>
              </svg>
              日同比 19.96%&nbsp;&nbsp;<svg
                t="1680856294704"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1948"
                width="16"
                height="16"
              >
                <path
                  d="M511.744 83.2a44.8 44.8 0 0 0-44.8 44.8v659.52l-307.264-307.2a44.8 44.8 0 1 0-63.36 63.36l384 384a44.8 44.8 0 0 0 63.36 0l384-384a44.8 44.8 0 1 0-63.36-63.36l-307.776 307.84V128a44.8 44.8 0 0 0-44.8-44.8z"
                  fill="#333333"
                  p-id="1949"
                ></path>
              </svg>
            </div>
          </template>
          <template slot="detail">
            <div>日销售额￥ 12423</div>
          </template>
        </TopItem>
      </el-col>
      <el-col :span="6"
        ><TopItem title="访问量" datas="45325">
          <template slot="chart">
            <linechart></linechart>
          </template>
          <template slot="detail"> <div>日访问量 1234</div> </template>
        </TopItem>
      </el-col>
      <el-col :span="6"
        ><TopItem title="支付笔数" datas="5466">
          <template slot="chart">
            <barchart></barchart>
          </template>
          <template slot="detail"> <div>转换率64%</div></template>
        </TopItem>
      </el-col>
      <el-col :span="6"
        ><TopItem title="运营活动效果" datas="78%">
          <template slot="chart">
            <progresschart></progresschart>
          </template>
          <template slot="detail">
            <div>
              周同比 56.67%&nbsp;&nbsp;<svg
                t="1680856264300"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1778"
                width="16"
                height="16"
              >
                <path
                  d="M511.744 940.8a44.8 44.8 0 0 1-44.8-44.8V236.544L159.68 543.68a44.8 44.8 0 1 1-63.36-63.36l384-384a44.8 44.8 0 0 1 63.36 0l384 384a44.8 44.8 0 1 1-63.36 63.36L556.544 235.776V896a44.8 44.8 0 0 1-44.8 44.8z"
                  fill="#d81e06"
                  p-id="1779"
                ></path>
              </svg>
              日同比 19.96%&nbsp;&nbsp;<svg
                t="1680856294704"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1948"
                width="16"
                height="16"
              >
                <path
                  d="M511.744 83.2a44.8 44.8 0 0 0-44.8 44.8v659.52l-307.264-307.2a44.8 44.8 0 1 0-63.36 63.36l384 384a44.8 44.8 0 0 0 63.36 0l384-384a44.8 44.8 0 1 0-63.36-63.36l-307.776 307.84V128a44.8 44.8 0 0 0-44.8-44.8z"
                  fill="#333333"
                  p-id="1949"
                ></path>
              </svg>
            </div>
          </template>
        </TopItem>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopItem from "./topItem";
import linechart from "./line";
import progresschart from "./progress";
import barchart from "./bar";
export default {
  name: "top",
  components: { TopItem, linechart, barchart, progresschart },
};
</script>

<style>
.el-card__header {
  padding: 0;
}
.el-card__body {
  padding: 10px 0;
}
.cardstyle {
  padding: 18px 20px;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>