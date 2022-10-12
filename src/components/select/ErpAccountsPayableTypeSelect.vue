<template>
  <el-select v-bind="$attrs" placeholder="选择应付账款类型" ref="ElSelectRef">
    <el-option v-for="item in accountspayabletypeSelectList" :key="item.accountspayabletypeid"
      :label="item.accountspayabletypename" :value="item.accountspayabletypeid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name:"ErpAccountsPayableTypeSelect",
  expose:["focus"],
  setup() {
    const accountspayabletypeSelectList = ref([{
      accountspayabletypeid: 0,
      accountspayabletypename: "应付账款"
    }]);

    const ElSelectRef = ref();
    function focus() {
      ElSelectRef.value.focus();
    }

    return {
      accountspayabletypeSelectList,
      ElSelectRef,
      focus,
    };
  },
});
</script>

<style scoped>

</style>