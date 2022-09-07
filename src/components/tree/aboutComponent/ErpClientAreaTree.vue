<template>
  <erp-tree
      ref="clientAreaTreeRef"
      :data="clientAreaTreeData"
      :highlight-current="true"
      :props="clientAreaTreeConfig"
      node-key="clientareaid"
      default-expand-all
      :expand-on-click-node="false"
      v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
//客户地区树ref
import {onMounted, ref} from "vue";
import {IClientAreaTree} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";
import ErpTree from "@/components/tree/ErpTree.vue";
const clientAreaTreeRef = ref();
//客户地区树data
let clientAreaTreeData = ref<IClientAreaTree[]>([]);
onMounted(async () => {
  await initData();
})

//客户地区树配置
const clientAreaTreeConfig = {
  children: 'children',
  label: 'clientareaname',
}

//获取客户地区数据
async function getClientArea() {
  const clientAreaService = new ClientAreaService();
  clientAreaTreeData.value = await clientAreaService.getClientAreaTreeHaveRoot();
}

async function initData(clientareaid?: number) {
  await getClientArea();
  if (clientareaid) {
    await clientAreaTreeRef.value.setCurrentKey(clientareaid);
    await clientAreaTreeRef.value.$emit('node-click', clientAreaTreeRef.value.getCurrentNode());
  }
}

defineExpose({initData})
</script>

<style scoped>

</style>