<template>
  <el-date-picker
      v-bind="$attrs"
      type="daterange"
      value-format="YYYY-MM-DD HH:mm:ss"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      unlink-panels
  ></el-date-picker>
</template>

<script setup lang="ts">
</script>