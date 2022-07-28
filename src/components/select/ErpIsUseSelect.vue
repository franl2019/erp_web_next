<template>
  <el-select v-bind="$attrs" ref="ElSelectRef">
    <el-option
        v-for="item in booleanList"
        :key="item.key"
        :label="item.label"
        :value="item.key"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import {ref} from "vue";

const booleanList = [{
  key: 1,
  label: "使用"
}, {
  key: 0,
  label: "未使用"
}]

const ElSelectRef = ref();

function focus() {
  ElSelectRef.value.focus();
}

defineExpose({focus});
</script>

<style scoped>

</style>