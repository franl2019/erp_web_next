<template>
  <el-select v-bind="$attrs" placeholder="选择应付账款类型" ref="ElSelectRef">
    <el-option
        v-for="item in accountspayabletypeSelectList"
        :key="item.accountspayabletypeid"
        :label="item.accountspayabletypename"
        :value="item.accountspayabletypeid"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import {ref} from "vue";

const accountspayabletypeSelectList = ref([{
  accountspayabletypeid: 0,
  accountspayabletypename: "应付账款"
}]);

const ElSelectRef = ref();
function focus() {
  ElSelectRef.value.focus();
}
defineExpose({focus});
</script>

<style scoped>

</style>