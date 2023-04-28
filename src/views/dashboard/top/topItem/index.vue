<template>
  <div>
    <el-card class="cardstyle">
      <div slot="header">
        <div class="title">
          <span>{{ title }}</span>
          <svg
            t="1680855377304"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1637"
            width="16"
            height="16"
          >
            <path
              d="M469.333333 298.666667a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"
              p-id="1638"
            ></path>
            <path
              d="M469.333333 394.666667a32 32 0 0 0 0 64v-64z m42.666667 32h32a32 32 0 0 0-32-32V426.666667z m-32 298.666666a32 32 0 0 0 64 0h-64z m426.666667-213.333333A394.666667 394.666667 0 0 1 512 906.666667v64c253.312 0 458.666667-205.354667 458.666667-458.666667h-64zM512 906.666667A394.666667 394.666667 0 0 1 117.333333 512h-64c0 253.312 205.354667 458.666667 458.666667 458.666667v-64zM117.333333 512A394.666667 394.666667 0 0 1 512 117.333333v-64C258.688 53.333333 53.333333 258.688 53.333333 512h64zM512 117.333333A394.666667 394.666667 0 0 1 906.666667 512h64c0-253.312-205.354667-458.666667-458.666667-458.666667v64z m-42.666667 341.333334h42.666667v-64h-42.666667v64z m10.666667-32v298.666666h64v-298.666666h-64z"
              p-id="1639"
            ></path>
          </svg>
        </div>
        <div class="datas">{{ datas }}</div>
        <div class="charts" ref="charts">
          <slot name="chart"></slot>
        </div>
      </div>
      <div>
        <div class="detail">
          <slot name="detail"></slot>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TopItem",
  props: ["title", "datas"],
};
</script>

<style>
.title {
  display: flex;
  justify-content: space-between;
}
.datas {
  font-size: 30px;
  padding: 10px 0;
}
.charts {
  height: 50px;
}
</style>