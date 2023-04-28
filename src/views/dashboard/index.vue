<template>
  <div class="dashboard-container">
    <top1></top1>
    <middle class="middle"></middle>
    <bottom class="bootom"></bottom>
  </div>
</template>

<script>
import { mapState } from "vuex";
import top1 from "./top";
import middle from "./middle";
import bottom from "./bottom";

export default {
  name: "Dashboard",
  components: { top1, middle, bottom },
  computed: {
    ...mapState("home", ["homeData"]),
  },
  methods: {
    getallData() {
      this.$store.dispatch("home/getallData");
    },
  },
  mounted() {
    this.getallData();
  },
};
</script>

<style lang="less" scoped>
.middle,
.bottom {
  margin: 10px 0;
}
</style>
