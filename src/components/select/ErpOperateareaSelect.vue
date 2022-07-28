<template>
  <el-select v-bind="$attrs" placeholder="选择所属操作区域" ref="ElSelectRef" size="large">
    <el-option
        v-for="item in operateareaSelectList"
        :key="item.operateareaid"
        :label="item.operateareaname"
        :value="item.operateareaid"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IOperatearea, OperateareaService} from "@/module/operatearea/operatearea.service";
import {FindOperateareaDto} from "@/module/operatearea/dto/findOperatearea.dto";

onMounted(() => {
  getOperateareaList();
})

const props = withDefaults(defineProps<{
  operateareatype?: number
}>(), {
  operateareatype: 0
});


const ElSelectRef = ref();

function focus() {
  ElSelectRef.value.focus();
}

const operateareaSelectList = ref<IOperatearea[]>([]);//操作区域选择Data
const operateareaService = new OperateareaService();

async function getOperateareaList() {
  const findOperateareaDto = new FindOperateareaDto();
  findOperateareaDto.operateareatype = props.operateareatype;
  operateareaSelectList.value = await operateareaService.findAll(findOperateareaDto);
}


defineExpose({focus});
</script>

<style scoped>

</style>