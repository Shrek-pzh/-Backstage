<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="success" icon="el-icon-plus" @click="addLOGO"
      >添加</el-button
    >
    <!-- 展示表单 -->
    <!-- 
         表格组件 
         data:表格组件将来需要展示的数据------数组类型
         border：是给表格添加边框
         column属性
         label：显示标题
         width：对应列的宽度
         align：标题的对齐方式
         prop:对应列内容的字段名
         注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
       -->
    <el-table
      :data="logoLists"
      style="width: 100%; margin-top: 10px"
      :border="true"
    >
      <el-table-column prop="id" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="" label="品牌LOGO" width="width">
        <template slot-scope="scope">
          <img
            :src="scope.row.logoUrl"
            :alt="scope.row.tmName"
            style="width: 100px; hieght: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="width">
        <!-- scope可以解构：{ row, $index } row:传入数组的每个数据体 $index：遍历的序号-->
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            icon="el-icon-s-tools"
            size="mini"
            @click="changelogo(row)"
            >修改</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-delete-solid"
            size="mini"
            @click="removelogo(row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
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

    <!-- 对话框，添加品牌的作用 -->
    <!--
        :visible.sync:控制对话框显示与隐藏用的
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
        并将 Form-Item 的 prop 属性设置为需校验的字段名即可
        :before-close="dialogBeforeClose"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="logoform">
        <el-form-item label="品牌名称:" label-width="100px">
          <el-input
            v-model="logoform.tmName"
            autocomplete="off"
            style="width: 350px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="logoform">
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="logoform.logoUrl"
              :src="logoform.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="addOrUpdataAttr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      // 需要渲染的品牌列表，elementui表格渲染数据，结构必须为数组
      logoLists: [],
      // 控制对话显示隐藏
      dialogFormVisible: false,
      // 上传LOGO表单收集
      logoform: {
        tmName: "",
        logoUrl: "",
      },
      // 当前页
      page: 1,
      // 展示总条目
      total: 20,
      // 每页展示条目
      limit: 3,
    };
  },
  methods: {
    // 对话框取消
    cancelDialog() {
      this.dialogFormVisible = false;
      this.logoform.tmName = "";
      this.logoform.logoUrl = "";
      this.logoform.id = "";
    },
    // 添加或是修改某一logo 修改或是添加只能通过对话框确定按钮统一调用，所以需要判断
    async addOrUpdataAttr() {
      this.dialogFormVisible = false;
      // 有logoId 是修改操作
      if (this.logoform.id) {
        let res = await this.$API.tradeMark.reqUpdatalogo(this.logoform);
        this.$message({ type: "success", message: "logo修改成功" });
        this.getlogoList();
      }
      // 没有logoId 是添加操作
      else {
        let res = await this.$API.tradeMark.reqAddlogo(this.logoform);
        if (res.code == 200) {
          this.$message({ type: "success", message: "logo添加成功" });

          // 修改为最后一页跳转
          this.page = Math.ceil((this.total + 1) / this.limit);
          this.getlogoList(this.page);
          // 将上传的logo信息清除
          this.logoform.tmName = "";
          this.logoform.logoUrl = "";
        } else this.$message.error(res.message);
      }
    },
    // 移除某一logo
    async removelogo(id) {
      this.$confirm("是否删除该LOGO？", "logo删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$API.tradeMark.reqremovelogo(id);
          if (res.code == 200) {
            this.$message({ type: "success", message: "删除logo成功！" });
            this.getlogoList();
            if (this.logoLists.length !== 0) return;
            // 如果当前页没有数据跳转第一页
            else this.getlogoList(1);
          } // 失败的结果都被响应拦截器拦截，统一提示错误信息了
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改某一logo
    async changelogo(row) {
      this.dialogFormVisible = true;
      // 深拷贝 row中的响应式方法也会给logoform，修改logoform会影响页面的展示效果
      // this.logoform = row;
      // 只能浅拷贝
      this.logoform = { ...row };
    },
    // 展示对话框
    addLOGO() {
      this.dialogFormVisible = true;
    },
    // 上传图片前校验格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片成功上传，接收返回的存储地址
    handleAvatarSuccess(res, _) {
      //   console.log(res, file);
      if (res.code == 200) this.logoform.logoUrl = res.data;
      else this.$message.error(res.message);
    },

    //当分页器某一页需要展示数据条数发生变化的时候会触发
    handleSizeChange(limit) {
      this.limit = limit;
      this.getlogoList();
    },
    // 展示页跳转
    getPageList(jumppage) {
      this.page = jumppage;
      this.getlogoList();
    },
    // 请求logo展示数据
    async getlogoList(page = this.page) {
      // page = this.page 修改或是删除可以保留在当前页 初始为1
      let { data } = await this.$API.tradeMark.reqlogoList(page, this.limit);
      // console.log(data);
      this.logoLists = data.records;
      this.total = data.total;
    },
  },
  mounted() {
    // console.log(this.$API);
    this.getlogoList();
  },
};
</script>

<style >
</style>

<style>
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