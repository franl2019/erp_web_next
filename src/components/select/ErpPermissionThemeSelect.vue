<template>
  <el-select v-bind="$attrs" placeholder="请选择" size="large">
    <el-option
        v-for="permission in permissionsThemeList"
        :key="permission.permissionsThemeId"
        :label="permission.permissionsThemeName"
        :value="permission.permissionsThemeId"
    />
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";
import {ElSelect,ElOption} from "element-plus";

export default defineComponent({
  name: "ErpPermissionsThemeSelect",
  components:{
    ElSelect,
    ElOption
  },
  setup(_props,{expose}) {
    const ElSelectRef = ref();
    //产品类别选择List
    const permissionsThemeList = ref<IPermissionsTheme[]>([]);

    //服务
    const permissionsThemeService = new PermissionsThemeService();

    //产品类别树配置
    const selectConfig = {
      children: 'children',
      label: 'permissionsThemeName',
    }

    onMounted(async () => {
      await getPermissionsTheme();
    })

    async function getPermissionsTheme() {
      permissionsThemeList.value = await permissionsThemeService.find();
      const defaultSelect:IPermissionsTheme = {
        permissionsThemeId: 0,
        permissionsThemeName: "不分类",
        printid: 0,
        creater: "",
        createdAt: null,
        updater: "",
        updatedAt: null,
        del_uuid: 0,
        deleter: "",
        deletedAt: null
      }
      permissionsThemeList.value.unshift(defaultSelect);
    }

    function focus() {
      ElSelectRef.value.focus();
    }
    expose({focus})

    return {
      ElSelectRef,
      permissionsThemeList,
      selectConfig,
    };
  },
});
</script>