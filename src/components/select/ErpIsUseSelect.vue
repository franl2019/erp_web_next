<template>
  <el-select ref="ElSelectRef" v-bind="$attrs">
    <el-option v-for="item in booleanList" :key="item.key" :label="item.label" :value="item.key">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "ErpIsUseSelect",
  expose: ["focus"],
  setup() {
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

    return {
      booleanList,
      ElSelectRef,
      focus,
    };
  },
});
</script>

<style scoped>

</style>