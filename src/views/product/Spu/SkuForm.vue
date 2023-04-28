<template>
  <!-- sku修改表格 -->
  <div>
    <el-form ref="form" label-width="100px" :data="skuInfo">
      <el-form-item label="SPU名称">
        <span>{{ spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuInfo.skuName"
          placeholder="请输入sku名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input v-model="skuInfo.price">0</el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input
          v-model="skuInfo.weight"
          placeholder="请输入sku重量"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form-item
          :label="Attr.attrName"
          label-width="80px"
          class="floatLeft"
          v-for="(Attr, index) in AttrInfolist"
          :key="index"
        >
          <el-select v-model="Attr.attrIdAndvalueId" placeholder="未选择">
            <el-option
              :label="item.valueName"
              :value="`${item.attrId}:${item.id}`"
              v-for="item in Attr.attrValueList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form-item
          :label="saleAttr.saleAttrName"
          label-width="80px"
          class="floatLeft"
          v-for="(saleAttr, index) in SaleAttrlist"
          :key="index"
        >
          <el-select
            v-model="saleAttr.baseAttrIdAndvalueId"
            placeholder="未选择"
          >
            <el-option
              :label="item.saleAttrValueName"
              :value="`${item.baseSaleAttrId}:${item.id}`"
              v-for="item in saleAttr.spuSaleAttrValueList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="photoList"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column width="80px" align="center" type="selection">
          </el-table-column>
          <el-table-column prop="prop" label="图片预览">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" alt="" class="imgstyle" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="图片名称"> </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="!row.isDefault"
                @click="setDefault(row, $index)"
                >设置默认</el-button
              >
              <el-button type="success" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 4、保存和取消按钮 -->
        <el-button type="primary" @click="addSku">保存</el-button>
        <el-button @click="cancelSkuOperate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 我的测试目录 ：运动健康 运动鞋包 运动包
export default {
  name: "skuForm",
  data() {
    return {
      // 父组件传递的数据
      spuName: "",

      // 发送给服务器的数据对象
      skuInfo: {
        //第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,

        //第二类：需要通过数据双向绑定v-model收集
        skuName: "",
        price: 0,
        skuDesc: "",
        weight: "",

        //第三类：需要自己书写代码
        skuDefaultImg: "",
        skuAttrValueList: [
          //   {
          //     attrId: 0,
          //     valueId: 0,
          //   },
        ],
        skuImageList: [
          //   {
          //     imgName: "",
          //     imgUrl: "",
          //     isDefault: "",
          //   },
        ],
        skuSaleAttrValueList: [
          //   {
          //     saleAttrId: 0,
          //     saleAttrValueId: 0,
          //   },
        ],
      },

      // 写代码获取的数据，需要进行展示
      photoList: [],
      SaleAttrlist: [],
      AttrInfolist: [],

      // 被选中的图片列表
      selectedImglist: [],
    };
  },
  methods: {
    // 表格勾选框回调
    handleSelectionChange(selection) {
      // selection是所有被选中的 row
      // console.log(selection);
      this.selectedImglist = selection;
    },
    // 设置默认图片
    setDefault(row, index) {
      this.photoList.forEach((item) => {
        item.isDefault = false;
      });
      this.photoList[index].isDefault = true;
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 从spu展示组件跳转本组件 获取基本的展示信息
    async getBaseInfo(category1Id, category2Id, row) {
      // 发送的数据对象需要父组件的个别字段数据
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;

      // 用于展示
      this.spuName = row.spuName;

      // 获取spu图片列表
      let res1 = await this.$API.sku.reqSpuImgList(row.id);
      this.photoList = res1.data;
      this.photoList.forEach((item) => {
        this.$set(item, "isDefault", false);
      });
      // 获取销售属性
      let res2 = await this.$API.sku.reqSpuSaleAttrlist(row.id);
      this.SaleAttrlist = res2.data;
      // 获取sku平台属性
      let res3 = await this.$API.sku.reqAttrInfolist(
        category1Id,
        category2Id,
        row.category3Id
      );
      this.AttrInfolist = res3.data;
    },
    // 保存sku操作 需要发送请求
    async addSku() {
      // 整理平台属性
      this.AttrInfolist.forEach((item) => {
        if (item.attrIdAndvalueId) {
          let [attrId, valueId] = item.attrIdAndvalueId.split(":");
          this.skuInfo.skuAttrValueList.push({ attrId, valueId });
        }
      });
      // 整理销售属性
      this.SaleAttrlist.forEach((item) => {
        if (item.baseAttrIdAndvalueId) {
          let [saleAttrId, saleAttrValueId] =
            item.baseAttrIdAndvalueId.split(":");
          this.skuInfo.skuSaleAttrValueList.push({
            saleAttrId,
            saleAttrValueId,
          });
        }
      });
      // 图片数据整理
      this.skuInfo.skuImageList = this.selectedImglist.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      // 发送请求
      let res = await this.$API.sku.AddOrUpdateSku(this.skuInfo);
      if (res.code == 200) {
        this.$message({ type: "success", message: "sku添加成功" });
        Object.assign(this._data, this.$options.data());
        this.$emit("changeScene2", 0);
      }
    },
    // 取消sku操作
    cancelSkuOperate() {
      this.$emit("changeScene2", 0);
      // 对vue里面的data数据重置，一个一个数据重置非常麻烦，这是一个更为简单高效的写法
      Object.assign(this._data, this.$options.data());
      /* 
      this.$data,是所有响应式数据，this.$data可以操作所有的响应式数据，data被放置在vm上，经过代理，实现响应式数据；
      this.$options，当前组件的配置对象，包括data,methods等，this.$options.data()返回组件的初始值（vue里面的data）；
      */
    },
  },
};
</script>

<style>
.imgstyle {
  width: 100px;
  height: 100px;
}
.floatLeft {
  float: left;
  margin-bottom: 10px;
}
</style>