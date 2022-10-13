<template>
  <el-select v-bind="$attrs" placeholder="选择应付账款类型" ref="elSelectRef">
    <el-option v-for="item in accountspayabletypeSelectList" :key="item.accountspayabletypeid"
      :label="item.accountspayabletypename" :value="item.accountspayabletypeid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name:"ErpAccountsPayableTypeSelect",
  setup(_props,{expose}) {
    const accountspayabletypeSelectList = ref([{
      accountspayabletypeid: 0,
      accountspayabletypename: "应付账款"
    }]);

    const elSelectRef = ref();
    function focus() {
      elSelectRef.value.focus();
    }

    expose({focus})

    return {
      elSelectRef,
      accountspayabletypeSelectList,
    };
  },
});
</script>

<style scoped>

</style>