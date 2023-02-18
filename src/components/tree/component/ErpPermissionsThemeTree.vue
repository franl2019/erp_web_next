<template>
  <erp-tree ref="permissionsThemeTreeRef"
            :config="permissionsThemeTreeConfig"
            :data="permissionsThemeTreeData"
            :highlight-current="true"
            node-key="permissionsThemeId"
            v-bind="$attrs"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import ErpTree from "@/components/tree/ErpTree.vue";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";
import {IPermissionsThemeTree} from "@/module/permissionsTheme/permissionsTheme";

export default defineComponent({
  name: "ErpPermissionsThemeTree",
  components: {ErpTree},
  setup: function (_prop, {expose}) {
    onMounted(() => {
      initData();
    })

    //供应商地区树data
    let permissionsThemeTreeData = ref<IPermissionsThemeTree[]>([]);

    //供应商地区树配置
    const permissionsThemeTreeConfig = {
      children: 'children',
      label: 'permissionsThemeName',
    }

    //获取供应商地区数据
    async function getPermissionsTheme() {
      //供应商地区服务
      const permissionsThemeService = new PermissionsThemeService();
      const permissionsThemes = await permissionsThemeService.find();
      permissionsThemeTreeData.value = [
        {
          permissionsThemeId: 0,
          permissionsThemeName: "全部",
          printid: 0,
          creater: "",
          createdAt: null,
          updater: "",
          updatedAt: null,
          del_uuid: 0,
          deleter: "",
          deletedAt: null,
          children: [...permissionsThemes]
        }
      ]
    }

    //供应商地区树ref
    const permissionsThemeTreeRef = ref();

    //初始化数据
    async function initData() {
      await getPermissionsTheme();
    }

    function getSelectedNode() {
      return permissionsThemeTreeRef.value.getSelectedNode()
    }

    function setSelectedNode(permissionsThemeId: number) {
      return permissionsThemeTreeRef.value.setSelectedNode(permissionsThemeId)
    }

    expose({initData, getSelectedNode, setSelectedNode});

    return {
      initData,
      permissionsThemeTreeRef,
      permissionsThemeTreeData,
      permissionsThemeTreeConfig,
    };
  },
});
</script>

<style scoped>

</style>