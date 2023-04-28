<template>
  <div class="authstyle">
    <el-input v-model="roleName" :disabled="true" style="margin-bottom: 20px">
    </el-input>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
      style="margin-bottom: 30px"
    >
    </el-tree>
    <el-button type="primary" @click="saveEdit">保存</el-button>
    <el-button @click="cancaelEdit">取消</el-button>
  </div>
</template>

<script>
export default {
  name: "auth",
  data() {
    return {
      roleName: "角色名称",
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    cancaelEdit() {
      this.$router.push({
        name: "Role",
      });
    },
    saveEdit() {},
  },
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style>
.authstyle {
  padding: 15px;
}
</style>