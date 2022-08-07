<template>
  <el-popover
      :visible="true"
      placement="bottom-start"
      width="20rem"
      transition=""
      :hide-after="0"
      :show-arrow="false"
      :offset="2"
      @show="showPopover"
  >
    <template #default>
      <div class="h-20 w-full">
        <erp-table></erp-table>
      </div>
    </template>
    <template #reference>
      <input ref="inputRef" class="w-full" :value="value">
    </template>
  </el-popover>
</template>

<script lang='ts' setup>
import {onMounted, ref} from "vue";
import ErpTable from "@/components/table/ErpTable.vue";

const props = defineProps<{
  params: {
    value: any
  }
}>()

onMounted(() => {
  value.value = props.params.value;
})

const inputRef = ref();
const value = ref()

function getValue() {
  return value.value;
}

defineExpose([getValue])


function showPopover() {
  inputRef.value.focus();
}
</script>

<style lang='scss' scoped>

</style>