<template>
  <!--
    SPU可以理解为类
    People类【SPU】
    实例:【SKU】-->
  <div>
    <!-- 三级联动导航 -->
    <el-card style="margin: 20px 0">
      <!-- :show="!isAddTable" 传入props属性控制三级联动导航是否禁用 :show表示用v-bind，其中可为表达式-->
      <sangjiNav @uploadID="getDatabyID" :show="scene !== 0" />
    </el-card>
    <el-card>
      <!-- 1、第一场景 spu展示表格 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 10px 0"
          @click="AddSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >

        <el-table :data="spuDataList" style="width: 100%" border>
          <el-table-column
            header-align="center"
            align="center"
            type="index"
            label="序号"
          >
          </el-table-column>
          <el-table-column header-align="center" prop="spuName" label="SPU名称">
          </el-table-column>
          <el-table-column
            header-align="center"
            prop="description"
            label="SPU描述"
          >
          </el-table-column>
          <el-table-column header-align="center" label="操作">
            <template slot-scope="{ row }">
              <hintButton
                title="添加sku"
                icon="el-icon-plus"
                size="mini"
                type="primary"
                @click="AddSku(row)"
              />
              <hintButton
                title="修改spu"
                icon="el-icon-edit"
                size="mini"
                type="success"
                @click="updateSpu(row)"
              />
              <hintButton
                title="展示当前spu的所有sku"
                icon="el-icon-star-off"
                size="mini"
                type="warning"
                @click="showSku(row)"
              />
              <!-- 气泡确认框 -->
              <el-popconfirm
                title="确定删除这个spu吗靓仔？"
                @onConfirm="removeSpu(row)"
              >
                <hintButton
                  slot="reference"
                  title="删除spu"
                  icon="el-icon-delete"
                  size="mini"
                  type="danger"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
        分页器 
        当前第几页、数据总条数、每一页展示条数、连续页码数
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"

        current-page:代表的是当前第几页
        total：代表分页器一共需要展示数据条数
        page-size：代表的是每一页需要展示多少条数据
        page-sizes：代表可以设置每一页展示多少条数据
        layout：可以实现分页器布局
        pager-count:按钮的数量  如果 9  连续页码是7
        @current-change="getPageList"
        -->
        <el-pagination
          style="margin-top: 10px; text-align: center"
          layout="prev, pager, next,jumper,->,sizes,total"
          :current-page="page"
          :total="total"
          :page-size="limit"
          :page-sizes="[3, 5, 7]"
          :page-count="7"
          @current-change="getPageList"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
      <!-- 1、第二场景 spu修改表格 -->
      <div v-show="scene == 1">
        <spuForm @changeScene1="changeScene1" ref="spu" />
      </div>
      <!-- 1、第三场景 sku修改表格 -->
      <div v-show="scene == 2">
        <skuForm @changeScene2="changeScene2" ref="sku" />
      </div>
    </el-card>
    <!-- sku展示弹出框 -->
    <!-- :before-close="handleClose" -->
    <el-dialog
      :title="SpuName + '的sku列表'"
      :visible.sync="skuVisible"
      width="50%"
      :before-close="beforeClose"
    >
      <el-table
        :data="skuShowlist"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量(千克)" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 130px; height: 130px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import spuForm from "./SpuForm.vue";
import skuForm from "./SkuForm.vue";

export default {
  name: "SPU",
  components: { spuForm, skuForm },
  data() {
    return {
      skuVisible: false,
      // sku展示框的数据
      skuShowlist: [],

      category1Id: "",
      category2Id: "",
      category3Id: "",

      // 本组件共有三个场景 0：spu展示列表 1：spu修改表格 2：sku修改表格
      scene: 0,
      // 服务器返回spu所以数据
      spuAllInfo: {},
      // 服务器返回的spu列表
      spuDataList: [],
      // 当前页
      page: 1,
      // 每页展示数目
      limit: 3,
      // 展示的总数目
      total: 0,

      // 展示sku列表需要使用的spu名称
      SpuName: "",

      // sku展示loading效果
      loading: true,
    };
  },
  methods: {
    // 弹出框关闭前回调
    beforeClose(done) {
      // 重置loading标识
      this.loading = true;
      // 清空展示数据 避免下次展示出现残留
      this.skuShowlist = [];
      // 放行方法
      done();
    },
    // 通过弹出框展示选择spu的sku
    async showSku(row) {
      this.SpuName = row.spuName;
      let { data } = await this.$API.spu.reqSkulistbyId(row.id);
      this.skuShowlist = data;
      // 得到数据后关闭loading标识 不再展示
      this.loading = false;
      this.skuVisible = true;
    },

    // 移除spu
    async removeSpu(row) {
      // 拦截器都已经做了请求错误处理，到这里只能是成功的结果
      await this.$API.spu.reqRemoveSpu(row.id);
      this.getSpulist(this.page, this.limit, this.category3Id);
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.getAndShowspu(this.category3Id, row.id);
    },
    // 添加spu 修改和添加的区别是有无第二参数：spuid
    AddSpu() {
      this.scene = 1;
      this.$refs.spu.getAndShowspu(this.category3Id);
    },
    AddSku(row) {
      this.scene = 2;
      // 需要传入spuid category1Id category2Id category3Id row中包含 category3Id和 spuId
      let { category1Id, category2Id } = this;
      this.$refs.sku.getBaseInfo(category1Id, category2Id, row);
    },
    // 接收三级id 请求商品属性列表
    async getDatabyID({ category1Id, category2Id, category3Id }) {
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;
      this.getSpulist(this.page, this.limit, this.category3Id);
    },
    // 接收页码展示数据
    getPageList(page) {
      this.page = page;
      this.getSpulist(this.page, this.limit, this.category3Id);
    },
    // 更改每页展示数目
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpulist(this.page, this.limit, this.category3Id);
    },
    // 获取spu列表数据
    async getSpulist(page, limit, category3Id) {
      let { data } = await this.$API.spu.reqSpuList(page, limit, category3Id);
      this.spuAllInfo = data;
      this.spuDataList = data.records;
      this.page = data.current;
      this.limit = data.size;
      this.total = data.total;
    },
    // 从spuform场景转spu展示
    changeScene1(scene) {
      this.scene = scene;
      // 跳转回来需要重新获取数据
      this.getSpulist(this.page, this.limit, this.category3Id);
    },
    // 从skuform场景转spu展示
    changeScene2(scene) {
      this.scene = scene;
      // 跳转回来不需要重新获取数据刷新页面
    },
  },
  mounted() {},
};
</script>

<style>
</style>