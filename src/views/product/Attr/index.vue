<template>
  <!-- 商品属性管理区 -->
  <div>
    <!-- 三级联动导航 -->
    <el-card style="margin-bottom: 10px">
      <!-- :show="!isAddTable" 传入props属性控制三级联动导航是否禁用 :show表示用v-bind，其中可为表达式-->
      <sangjiNav @uploadID="getDatabyID" :show="isAddTable" />
    </el-card>

    <!-- 属性展示区 -->
    <el-card>
      <div v-show="!isAddTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 属性展示table -->
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="属性名"
            prop="attrName"
            width="width"
          >
          </el-table-column>
          <el-table-column align="center" label="属性值" width="width">
            <template slot-scope="{ row }">
              <el-tag
                type="warning"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="{ row }">
              <el-button type="warning" @click="updateAttrvalue(row)"
                >修改</el-button
              >
              <el-popconfirm title="确定删除吗靓仔？" @onConfirm="delAttr(row)">
                <el-button type="danger" slot="reference">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isAddTable">
        <!-- 1、来个表单收集属性名 -->
        <el-form
          ref="Attrform"
          :model="AttrInfo"
          label-width="80px"
          :inline="true"
        >
          <el-form-item label="属性名呀">
            <el-input
              v-model="AttrInfo.attrName"
              placeholder="输入你的属性名喂靓仔"
              style="width: 300px"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 2、来个添加按钮 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!AttrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <!-- 3、属性值表格 -->
        <el-table
          :data="AttrInfo.attrValueList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="80px"
          >
          </el-table-column>
          <el-table-column prop="valueName" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                :ref="$index"
                v-show="row.flag"
                @blur="tolook(row, $index)"
                @keyup.native.enter="tolook(row, $index)"
              ></el-input>
              <span
                v-show="!row.flag"
                style="display: block"
                @click="editAttrval(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除吗靓仔?`"
                @onConfirm="delattrValue($index)"
              >
                <!-- slot="reference" 配合气泡框使用 -->
                <el-button
                  type="danger"
                  icon="el-icon-delete-solid"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 4、保存和取消按钮 -->
        <el-button
          type="primary"
          @click="addOrUpdateVal"
          :disabled="AttrInfo.attrValueList.length == 0"
          >保存</el-button
        >
        <el-button @click="cancelValOperate">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入深克隆
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      // 属性列表
      tableData: [],
      // 获取三级id在适时用于发送请求 同时category3Id用于判断是否添加按钮是否禁用
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 添加属性表格展示与否标志
      isAddTable: false,
      // 属性添加或修改的信息
      AttrInfo: {
        attrName: "",
        attrValueList: [
          //   {
          //     attrId: 0,
          //     id: 0,
          //     valueName: "string",
          //   },
        ],
        categoryId: 0, //三级分类的id
        categoryLevel: 0, //因为服务器也需要区分几级id
        // id:"" 属性的id 属性值对象中的attrId实际上就是等于这个值。添加属性时没有，修改时拥有
      },
    };
  },
  methods: {
    // 取消属性值的操作（包括添加属性值和修改属性值）
    cancelValOperate() {
      // 隐藏属性添加表格
      this.isAddTable = false;
      // 置空属性添加或修改的信息
      this.AttrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.AttrInfo.id, // 属性的id
        categoryLevel: 3,
      };
    },
    // 点击span查看框进入属性值编辑模式
    editAttrval(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        // 切换标识位需要等待dom结构完成再获取焦点
        this.$refs[index].focus();
      });
    },
    // input失去焦点或按下enter键进入查看模式
    tolook(row, index) {
      if (row.valueName.trim() == "") {
        this.$refs[index].focus();
        return this.$message({ type: "warning", message: "属性值不能为空！" });
      }
      row.flag = false;
    },
    // 垃圾桶按钮去除某一属性值
    delattrValue(index) {
      this.AttrInfo.attrValueList.splice(index, 1);
    },
    // 添加属性按钮
    addAttr() {
      this.isAddTable = true;
      // 置空属性添加或修改的信息
      this.AttrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 更新属性按钮
    updateAttrvalue(row) {
      this.isAddTable = true;
      // 将选中的属性赋值给attrInfo
      // 由于数据结构当中存在对象里面套数组，数组里面有套对象，因此需要使用深拷贝解决这类问题
      // 深拷贝，浅拷贝在面试的时候出现频率很高，切记达到手写深拷贝与浅拷贝
      // this.AttrInfo = { ...row };
      this.AttrInfo = cloneDeep(row);
      // 将flag属性设置为响应式属性
      this.AttrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 添加属性值按钮
    addAttrValue() {
      this.AttrInfo.attrValueList.push({
        //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        attrId: this.AttrInfo.id,
        valueName: "",
        // 查看模式和编辑模式的切换标识,必须保证一个属性值对应一个标识，所以在这里添加
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.AttrInfo.attrValueList.length - 1].focus();
      });
    },
    // 删除属性按钮
    async delAttr(row) {
      let { category1Id, category2Id, category3Id } = this;
      let res = await this.$API.attr.delAttr(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "属性删除成功" });
        this.getDatabyID({ category1Id, category2Id, category3Id });
      }
    },
    // 点击保存按钮向服务器请求 添加或者修改属性
    async addOrUpdateVal() {
      let { category1Id, category2Id, category3Id } = this;
      try {
        await this.$API.attr.reqAddOrUpdateAttrVal(this.AttrInfo);
        this.getDatabyID({ category1Id, category2Id, category3Id });
        if (this.AttrInfo.id)
          this.$message({ type: "success", message: "属性修改成功" });
        else this.$message({ type: "success", message: "属性添加成功" });
        this.isAddTable = false;
      } catch (error) {
        this.$message({ type: "error", message: "属性操作失败" });
        this.isAddTable = false;
      }
    },
    // 接收三级id 请求商品属性列表
    async getDatabyID({ category1Id, category2Id, category3Id }) {
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;

      let res = await this.$API.attr.reqAttrList({
        category1Id,
        category2Id,
        category3Id,
      });
      this.tableData = res.data;
      //   console.log(res);
    },
  },
};
</script>

<style>
</style>