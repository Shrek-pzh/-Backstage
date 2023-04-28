<template>
  <div class="userStyle">
    <div style="margin-bottom: 20px">
      <el-input
        v-model="username"
        placeholder="角色名称"
        style="width: 200px; margin-right: 20px"
      ></el-input>
      <el-button type="primary" icon="el-icon-search">查询</el-button>
      <el-button>清空</el-button>
    </div>
    <div>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <el-table :data="tabledata" style="width: 900px; margin-top: 20px" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" width="70" align="center">
      </el-table-column>

      <el-table-column prop="prop" label="角色名称" width="width">
        <template slot-scope="{ row, $index }">
          <span v-show="!updateFlag">查看</span>
          <div v-show="updateFlag">
            <el-input
              placeholder="请输入内容"
              v-model="roleName"
              clearable
              size="mini"
              style="float: left; width: 200px"
            >
            </el-input>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-refresh"
              style="float: right"
              >取消</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            size="mini"
            icon="el-icon-user-solid"
            @click="editRole"
          ></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>

          <el-popconfirm
            title="要删除吗靓仔？"
            @onConfirm="delRole"
            style="margin-left: 10px"
          >
            <el-button
              type="danger"
              size="mini"
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
    <el-dialog title="添加新角色" :visible.sync="addFormVisible" width="400px">
      <el-form :model="userform">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="userform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      username: "",
      tabledata: [1],
      userform: {
        name: "",
        nickname: "",
        password: "",
      },
      addFormVisible: false,

      // 分页器
      limit: 3,
      page: 1,
      total: 10,

      // 角色名称
      roleName: "输入模式",
      updateFlag: false,
    };
  },
  methods: {
    addUser() {
      this.addFormVisible = true;
    },
    // 页面跳转
    handleCurrentChange(page) {
      console.log(page);
    },
    // 修改页面展示条目
    handleSizeChange(limit) {
      console.log(limit);
    },
    // 角色权限编辑按钮
    editRole() {
      this.$router.push({
        name: "RoleAuth",
        params: {
          id: 1,
        },
      });
    },
    // 取消修改角色名称按钮
    cancelRoleName() {
      console.log("取消");
    },
    // 角色删除按钮
    delRole() {
      console.log("delrole");
    },
  },
};
</script>

<style>
.userStyle {
  padding: 20px;
}
</style>