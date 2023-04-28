<template>
  <div class="userStyle">
    <div style="margin-bottom: 20px">
      <el-input
        ref="searchInp"
        v-model="username"
        placeholder="用户名"
        style="width: 200px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchUser"
        >查询</el-button
      >
      <el-button @click="clearbtn">清空</el-button>
    </div>
    <div>
      <el-button type="primary" @click="addFormVisible = true">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <el-table :data="tabledata" style="width: 100%; margin-top: 20px" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="70" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="nickName" label="用户昵称" width="230">
      </el-table-column>
      <el-table-column prop="roleName" label="权限列表" width="width">
      </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" width="200">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            size="small"
            icon="el-icon-user-solid"
            @click="setRole"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="updateUser"
          ></el-button>

          <el-popconfirm
            title="要删除吗靓仔？"
            @onConfirm="delUser"
            style="margin-left: 10px"
          >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              slot="reference"
            ></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 7]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="userform">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="userform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="100px">
          <el-input v-model="userform.nickName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="userform.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色弹框 -->
    <el-dialog title="设置角色" :visible.sync="setRoleFlag">
      <el-form :model="roleform">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="roleform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色列表" label-width="100px">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleFlag = false">取 消</el-button>
        <el-button type="primary" @click="setRoleFlag = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户弹框 -->
    <el-dialog title="修改用户" :visible.sync="updateVisible">
      <el-form :model="updateform">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="updateform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="100px">
          <el-input v-model="updateform.nickname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  name: "User",
  data() {
    return {
      username: "",
      tabledata: [1],

      // 添加用户弹框
      addFormVisible: false,
      userform: { username: "", nickName: "", password: "" },

      // 分配角色弹框
      setRoleFlag: false,
      roleform: {
        name: "",
      },

      // 修改用户弹框
      updateVisible: false,
      updateform: {
        name: "",
        nickname: "",
      },

      // 分页器
      limit: 3,
      page: 1,
      total: 10,

      // 分配角色多选框
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    // 搜索清空按钮
    clearbtn() {
      this.username = "";
      this.$refs.searchInp.focus();
      this.getUserList();
    },
    // 用户搜索按钮
    searchUser() {
      this.getUserList(this.username);
    },
    // 用户添加按钮
    async confirmAdd() {
      this.addFormVisible = false;
      await this.$API.user.reqAddUser(this.userform);
      this.getUserList();
    },
    // 页面跳转
    handleCurrentChange(page) {
      this.page = page;
      this.getUserList();
    },
    // 修改页面展示条目
    handleSizeChange(limit) {
      this.limit = limit;
      this.getUserList();
    },
    // 分配角色按钮
    setRole() {
      this.setRoleFlag = true;
    },
    // 修改用户按钮
    updateUser() {
      this.updateVisible = true;
    },
    // 删除用户按钮
    delUser() {
      console.log("del");
    },
    // 分配角色多选框
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },

    // 请求用户列表
    async getUserList(username = "") {
      let { data } = await this.$API.user.reqUserList(
        this.page,
        this.limit,
        username
      );
      this.tabledata = data.items;
      this.total = data.total;
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>

<style>
.userStyle {
  padding: 20px;
}
</style>