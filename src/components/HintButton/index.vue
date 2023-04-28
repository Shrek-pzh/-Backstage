<template>
  <a :title="title">
    <el-button v-bind="$attrs" v-on="$listeners" class="hintbtn">{{
      btnText
    }}</el-button>
  </a>
</template>

<script>
export default {
  name: "hintButton",
  props: ["title", "btnText"],
};
</script>

<style>
.hintbtn {
  margin: 0 10px;
  padding: 5px 8px;
}
</style>