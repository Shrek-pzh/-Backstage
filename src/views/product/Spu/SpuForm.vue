<template>
  <!-- spu修改表格 -->
  <div>
    <el-form ref="form" :model="spuInfo" label-width="80px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfo.spuName"
          placeholder="请输入spu名称"
        ></el-input>
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="品牌">
        <el-select v-model="spuInfo.tmId" placeholder="请选择品牌">
          <el-option
            :label="item.tmName"
            v-model="item.id"
            v-for="item in tmList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="spuInfo.description"></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <el-form-item label="SPU图片">
        <!-- file-list文件列表（数组类型）此处为图片对象数组，对象必须包含name以及url字段 -->
        <el-upload
          action="dev-api/admin/product/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handleUpdate"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select
          v-model="saleAttrIdAndName"
          :placeholder="`还有${unselectAttr.length}个属性未选择`"
        >
          <el-option
            :label="item.name"
            :value="`${item.id}:${item.name}`"
            v-for="(item, index) in unselectAttr"
            :key="index"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 10px"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          :data="spuInfo.spuSaleAttrList"
          style="width: 100%; margin: 10px 0"
          border
        >
          <el-table-column type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column
            header-align="center"
            prop="saleAttrName"
            label="属性名"
          >
          </el-table-column>
          <el-table-column header-align="center" prop="prop" label="属性值列表">
            <template slot-scope="{ row }">
              <!-- <span
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="index"
                >{{ item.saleAttrValueName }}</span
              > -->
              <!-- 000 -->
              <el-tag
                :key="index"
                v-for="(item, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.visible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >+添加属性值</el-button
              >
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="prop" label="操作">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delSaleAttr($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存和取消按钮 -->
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancelSpuOperate">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      // 最终发送给服务器的数据格式 但是需要整理
      spuInfo: {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: 0,
        spuImageList: [],
        spuSaleAttrList: [],
      },
      // 基本品牌列表
      tmList: [],
      // spu图片列表（需要整理到spuInfo才能发送）
      spuImageList: [],
      // 基本的spu属性 用于和已添加的spu比较 用于计算
      AllspuSaleAttrList: [],

      // el组件图片预览的图片路径与显示隐藏标识
      dialogImageUrl: "",
      dialogVisible: false,

      // 选中销售属性的id和名称 用于添加到spuInfo.spuSaleAttrList中
      saleAttrIdAndName: "",
    };
  },
  computed: {
    unselectAttr() {
      return this.AllspuSaleAttrList.filter((item) => {
        return this.spuInfo.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName !== item.name;
        });
      });
    },
  },
  methods: {
    // 删除销售属性回调
    delSaleAttr(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1);
    },
    // 添加销售属性回调
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.saleAttrIdAndName.split(":");
      this.spuInfo.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
      this.saleAttrIdAndName = "";
    },

    // 点击添加spu按钮跳转本子组件  区别为是否传入spuid
    // 点击修改spu按钮跳转本子组件 同时调用这个方法获取展示选定spu的数据
    async getAndShowspu(category3Id, spuId = -1) {
      this.spuInfo.category3Id = category3Id;
      // 如果spuid不等于-1 证明是修改spu 需要获取对应的spu信息
      if (spuId !== -1) {
        // 1、获取选定spu的信息
        let res1 = await this.$API.spu.reqSpuInfo(spuId);
        this.spuInfo = res1.data;

        // 2、获取选定spu的展示图片
        let res2 = await this.$API.spu.reqSpuImgList(spuId);
        res2.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = res2.data;
        this.spuInfo.spuImageList = res2.data;
      }

      // 3、获取基本的品牌列表
      let res3 = await this.$API.spu.reqBaseTrademark();
      this.tmList = res3.data;

      // 4、获取固定的销售属性（三个）
      let res4 = await this.$API.spu.reBaseSaleAttrList();
      this.AllspuSaleAttrList = res4.data;
    },

    // 保存按钮 发送添加或是修改请求
    addOrUpdateSpu() {
      this.$API.spu.AddOrUpdateSpu(this.spuInfo);
      this.$emit("changeScene1", 0);
      // 数据置空
      this.spuInfo = {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: 0,
        spuImageList: [],
        spuSaleAttrList: [],
      };
      this.AllspuSaleAttrList = [];
      this.tmList = [];
      this.spuImageList = [];
    },
    // 取消按钮
    cancelSpuOperate() {
      this.$emit("changeScene1", 0);
      // 数据置空
      this.spuInfo = {
        category3Id: 0,
        description: "",
        spuName: "",
        tmId: 0,
        spuImageList: [],
        spuSaleAttrList: [],
      };
      this.AllspuSaleAttrList = [];
      this.tmList = [];
      this.spuImageList = [];
    },
    // 图片移除成功回调
    handleRemove(file, fileList) {
      // file移除成功的文件 fileList剩余图片数组
      // console.log(file, fileList);
      this.spuInfo.spuImageList = fileList;
    },
    // 上传图片成功回调
    handleUpdate(response, file, fileList) {
      // response上传成功的结果，包含服务器上的图片地址
      // console.log(response, file, fileList);
      // file是上传成功的图片对象，将其添加到发送到服务器的spu对象
      // 发送的数据对象需要imgName和imgUrl字段 所以这里需要先添加
      file.imgName = file.name;
      file.imgUrl = file.response.data;
      this.spuInfo.spuImageList.push(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // el组件可移除标签回调
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },

    showInput(row) {
      this.$set(row, "visible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.focus();
      });
    },

    handleInputConfirm(row) {
      let inputValue = row.inputValue;
      if (inputValue) {
        row.spuSaleAttrValueList.push({
          saleAttrValueName: inputValue,
          baseSaleAttrId: row.baseSaleAttrId,
        });
      } else return this.$message("请输入正确的属性值");
      row.visible = false;
      row.inputValue = "";
    },
  },
};
</script>

<style>
</style>

<style>
/* 销售属性值标签样式 */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style>
/* 图片上传组件样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>