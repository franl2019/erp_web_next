<template>
  <erp-tree ref="clientAreaTreeRef" :config="clientAreaTreeConfig" :data="clientAreaTreeData"
            :expand-on-click-node="false" :highlight-current="true" default-expand-all node-key="clientareaid"
            v-bind="$attrs"/>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IClientAreaTree} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";
import ErpTree from "@/components/tree/ErpTree.vue";

export default defineComponent({
  name: "ErpClientAreaTree",
  components: {
    ErpTree
  },
  setup(_props, {expose}) {
    //客户地区树ref
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

    expose({initData});

    return {
      clientAreaTreeRef,
      clientAreaTreeData,
      clientAreaTreeConfig,
      initData,
    };
  },
});
</script>

<style scoped>

</style>