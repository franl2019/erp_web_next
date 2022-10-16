<template>
  <el-select ref="elSelectRef" placeholder="选择所属操作区域" v-bind="$attrs">
    <el-option v-for="item in operateareaSelectList" :key="item.operateareaid" :label="item.operateareaname"
               :value="item.operateareaid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, unref} from "vue";
import {IOperatearea, OperateareaService} from "@/module/operatearea/operatearea.service";
import {FindOperateareaDto} from "@/module/operatearea/dto/findOperatearea.dto";
import {Operatearea} from "@/module/operatearea/operatearea";
import {ElSelect,ElOption} from "element-plus";

export default defineComponent({
  name: "ErpOperateAreaAuthSelect",
  components:{
    ElSelect,ElOption
  },
  props: {
    operateareatype: {
      type: Number,
      default: 0,
    },
    haveRootNode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props,{expose}) {

    const {operateareatype, haveRootNode} = unref(props)
    onMounted(async () => {
      await getOperateareaList();
    })

    const elSelectRef = ref();

    function focus() {
      elSelectRef.value.focus();
    }
    expose({focus})

    //操作区域选择Data
    const operateareaSelectList = ref<IOperatearea[]>([]);
    const operateareaService = new OperateareaService();

    async function getOperateareaList() {
      const findOperateareaDto = new FindOperateareaDto();
      findOperateareaDto.operateareatype = operateareatype;
      operateareaSelectList.value = await operateareaService.findAll(findOperateareaDto);

      if (haveRootNode) {
        const operatearea = new Operatearea();
        operatearea.operateareaname = '全部区域';
        operateareaSelectList.value.push(operatearea);
      }
    }

    return {
      elSelectRef,
      operateareaSelectList,
    };
  },
});
</script>

<style scoped>

</style>