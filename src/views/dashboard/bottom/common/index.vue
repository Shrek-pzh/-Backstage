<template>
  <div>
    <div class="topp">
      <span>{{ title }}</span>
      <svg
        style="margin-right: 150px"
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
    <div class="datas">
      <span style="font-size: 25px">{{ dataone }}</span
      >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
        style="font-size: 15px"
        >{{ datatwo }}%</span
      >&nbsp;&nbsp;&nbsp;
      <!-- 上箭头 -->
      <svg
        v-show="datatwo >= 0"
        t="1680856264300"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1778"
        width="16"
        height="16"
      >
        <path
          d="M511.744 940.8a44.8 44.8 0 0 1-44.8-44.8V236.544L159.68 543.68a44.8 44.8 0 1 1-63.36-63.36l384-384a44.8 44.8 0 0 1 63.36 0l384 384a44.8 44.8 0 1 1-63.36 63.36L556.544 235.776V896a44.8 44.8 0 0 1-44.8 44.8z"
          fill="#d81e06"
          p-id="1779"
        ></path>
      </svg>
      <!-- 下箭头 -->
      <svg
        v-show="datatwo < 0"
        t="1680856294704"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1948"
        width="16"
        height="16"
      >
        <path
          d="M511.744 83.2a44.8 44.8 0 0 0-44.8 44.8v659.52l-307.264-307.2a44.8 44.8 0 1 0-63.36 63.36l384 384a44.8 44.8 0 0 0 63.36 0l384-384a44.8 44.8 0 1 0-63.36-63.36l-307.776 307.84V128a44.8 44.8 0 0 0-44.8-44.8z"
          fill="#333333"
          p-id="1949"
        ></path>
      </svg>
    </div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "common",
  props: ["title", "dataone", "datatwo"],
};
</script>

<style>
.topp {
  display: flex;
  justify-content: space-between;
}
</style>