<template>
  <el-select ref="ElSelectRef" placeholder="选择所属操作区域" size="large" v-bind="$attrs">
    <el-option v-for="item in operateareaSelectList" :key="item.operateareaid" :label="item.operateareaname"
               :value="item.operateareaid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IOperatearea, OperateareaService} from "@/module/operatearea/operatearea.service";
import {FindOperateareaDto} from "@/module/operatearea/dto/findOperatearea.dto";

export default defineComponent({
  name: "ErpOperateareaSelect",
  props: {
    operateareatype: {
      type: Number,
      default: 0,
    },
  },
  setup(props,{expose}) {
    onMounted(() => {
      getOperateareaList();
    })

    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }

    expose({focus})

    //操作区域选择Data
    const operateareaSelectList = ref<IOperatearea[]>([]);
    const operateareaService = new OperateareaService();

    async function getOperateareaList() {
      const findOperateareaDto = new FindOperateareaDto();
      findOperateareaDto.operateareatype = props.operateareatype;
      operateareaSelectList.value = await operateareaService.findAll(findOperateareaDto);
    }

    return {
      ElSelectRef,
      operateareaSelectList
    };
  },
});
</script>

<style scoped>

</style>