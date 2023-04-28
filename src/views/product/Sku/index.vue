<template>
  <!-- sku管理 -->
  <div>
    <!-- sku展示表格 -->
    <el-table :data="skuData" style="width: 100%; margin: 20px 10px" border>
      <!-- 序号 -->
      <el-table-column align="center" type="index" label="序号" width="100">
      </el-table-column>
      <!-- 名称 -->
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <!-- 描述 -->
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <!-- 默认图片 -->
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="默认图片"
            style="width: 100px; height: 80px"
          />
        </template>
      </el-table-column>
      <!-- 重量 -->
      <el-table-column prop="weight" label="重量(千克)" width="100">
      </el-table-column>
      <!-- 价格 -->
      <el-table-column label="价格(元)" width="80">
        <template slot-scope="{ row }"> {{ row.price }}.00 </template>
      </el-table-column>
      <!-- 商品状态 -->
      <el-table-column label="商品状态" width="80">
        <template slot-scope="{ row }">
          {{ row.isSale == 1 ? "上架中" : "已下架" }}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <hintButton
            icon="el-icon-sort-up"
            type="success"
            title="上架"
            size="small"
            v-show="row.isSale == 0"
            @click="onSale(row)"
          />
          <hintButton
            icon="el-icon-sort-down"
            type="info"
            title="下架"
            size="small"
            v-show="row.isSale == 1"
            @click="cancelSale(row)"
          />
          <hintButton
            icon="el-icon-edit"
            type="primary"
            title="修改sku"
            size="small"
          />
          <hintButton
            icon="el-icon-view"
            type="warning"
            title="展示sku详细信息"
            size="small"
            @click="showDetail(row)"
          />
          <el-popconfirm title="确定删除吗靓仔？" @onConfirm="delSKU(row)">
            <hintButton
              icon="el-icon-delete"
              type="danger"
              title="删除该sku"
              size="small"
              slot="reference"
            />
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="totalCount"
      style="text-align: center"
    >
    </el-pagination>

    <!-- 抽屉展示组件 -->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="50%"
      class="drawerStyle"
      :before-close="beforeClose"
      v-loading="true"
    >
      <!-- 名称 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">名称</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuDetail.skuName }}
          </div></el-col
        >
      </el-row>
      <!-- 描述 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">描述</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuDetail.skuDesc }}
          </div></el-col
        >
      </el-row>
      <!-- 价格 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">价格</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            {{ skuDetail.price }}.00元
          </div></el-col
        >
      </el-row>
      <!-- 平台属性 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">平台属性</div></el-col
        >
        <el-col :span="18"
          ><div class="grid-content bg-purple-light">
            <el-tag
              type="success"
              style="margin: 0 5px"
              v-for="(item, index) in skuDetail.skuAttrValueList"
              :key="index"
              >{{ item.valueName }}</el-tag
            >
          </div></el-col
        >
      </el-row>
      <!-- 轮播图 -->
      <el-row>
        <el-col :span="6"
          ><div class="grid-content bg-purple">商品图片</div></el-col
        >
        <el-col :span="10"
          ><div class="grid-content bg-purple-light">
            <el-carousel height="248px" trigger="click">
              <el-carousel-item
                v-for="(item, index) in skuDetail.skuImageList"
                :key="index"
              >
                <img
                  :src="item.imgUrl"
                  style="
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                    display: block;
                  "
                />
              </el-carousel-item>
            </el-carousel></div
        ></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "skuList",
  data() {
    return {
      // 抽屉组件显示隐藏标识
      drawer: false,

      // 分页器参数
      pageNum: 1,
      pageSize: 5,
      totalCount: 0,

      // sku展示表格数据
      skuData: [],

      // 某个sku详细信息列表
      skuDetail: {},
    };
  },
  methods: {
    // 抽屉组件关闭前回调
    beforeClose(done) {
      // 清除本次数据 避免下次显示残留
      this.skuDetail = {};
      done();
    },
    // 删除sku
    async delSKU(row) {
      let { code } = await this.$API.sku.reqdelSku(row.id);
      if (code == 200) {
        this.$message({ type: "success", message: "sku删除成功" });
        this.getSkuListData();
      }
    },
    // sku上架
    async onSale(row) {
      let { code } = await this.$API.sku.reqonSale(row.id);
      console.log(code);

      if (code == 200) row.isSale = 1;
    },
    // sku下架
    async cancelSale(row) {
      let { code } = await this.$API.sku.reqcancelSale(row.id);
      console.log(code);
      if (code == 200) row.isSale = 0;
    },
    // 展示抽屉组件显示详细sku
    async showDetail(row) {
      this.drawer = true;
      let res = await this.$API.sku.reqSkuDetail(row.id);
      this.skuDetail = res.data;
    },
    handleSizeChange(pagesize) {
      this.pageSize = pagesize;
      this.getSkuListData();
    },
    handleCurrentChange(pagenum) {
      this.pageNum = pagenum;
      this.getSkuListData();
    },
    async getSkuListData() {
      let res = await this.$API.sku.reqSkuList(this.pageNum, this.pageSize);
      // 赋值sku列表
      this.skuData = res.data.records;
      if (this.skuData < 1) {
        this.pageNum--;
        this.getSkuListData();
      }
      this.totalCount = res.data.total;
    },
  },
  mounted() {
    // 挂载即获取数据展示
    this.getSkuListData();
  },
};
</script>

<style lang="less">
.el-drawer__body {
  padding-top: 40px;

  .bg-purple {
    text-align: right;
    font-size: 18px;
  }

  .grid-content {
    padding: 0 10px;
    line-height: 1.3;
  }
}
</style>

<style lang="less">
/* 布局组件样式 */
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: skyblue;
}
.el-carousel__indicators--horizontal {
  bottom: 0;
}
</style>