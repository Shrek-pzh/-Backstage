<template>
  <!-- 三级联动全局组件 -->
  <div>
    <!-- v-model的值为当前被选中的el-option的 value 属性值 -->
    <label>一级目录：</label>
    <el-select
      v-model="category1Id"
      placeholder="请选择"
      class="cardstyle"
      @change="handler1"
      :disabled="show"
    >
      <el-option
        v-for="item in option1"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <label>二级目录：</label>

    <el-select
      v-model="category2Id"
      placeholder="请选择"
      class="cardstyle"
      @change="handler2"
      :disabled="show"
    >
      <el-option
        v-for="item in option2"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <label>三级目录：</label>

    <el-select
      v-model="category3Id"
      placeholder="请选择"
      class="cardstyle"
      @change="handler3"
      :disabled="show"
    >
      <el-option
        v-for="item in option3"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "sangjiNav",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      option1: [],
      option2: [],
      option3: [],
    };
  },
  methods: {
    handler1() {
      // 选一级目录时清除二三级已获取id 以及二三级已获取目录
      this.category2Id = "";
      this.category3Id = "";
      (this.option2 = []), (this.option3 = []), this.getcategory2();
    },
    handler2() {
      // 选二级目录时清除三级已获取id 以及三级已获取目录
      this.category3Id = "";
      (this.option3 = []), this.getcategory3();
    },
    // 选择三目录
    handler3() {
      // 一旦三级目录选择完毕，将一、二、三级的id上传到父组件获取商品属性列表
      this.$emit("uploadID", {
        category1Id: this.category1Id,
        category2Id: this.category2Id,
        category3Id: this.category3Id,
      });
    },
    // 获取一级目录
    async getcategory1() {
      let res = await this.$API.attr.reqCategory1();
      this.option1 = res.data;
    },
    // 获取二级目录
    async getcategory2() {
      let res = await this.$API.attr.reqCategory2(this.category1Id);
      this.option2 = res.data;
    },
    // 获取三级目录
    async getcategory3() {
      let res = await this.$API.attr.reqCategory3(this.category2Id);
      this.option3 = res.data;
    },
  },
  props: ["show"],
  mounted() {
    // 挂载自动获取一级目录
    this.getcategory1();
  },
};
</script>

<style>
.cardstyle {
  margin: 0 3px;
}
</style>