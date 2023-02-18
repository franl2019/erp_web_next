<template>
  <el-select placeholder="请选择" size="large" v-bind="$attrs">
    <el-option
        v-for="role in roleList"
        :key="role.roleId"
        :label="role.roleName"
        :value="role.roleId"
    />
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {ElOption, ElSelect} from "element-plus";
import {IRole} from "@/module/role/role";
import {RoleService} from "@/module/role/role.service";

export default defineComponent({
  name: "ErpRoleSelect",
  components: {
    ElSelect,
    ElOption
  },
  setup(_props, {expose}) {
    const ElSelectRef = ref();
    //产品类别选择List
    const roleList = ref<IRole[]>([]);
    //服务
    const roleService = new RoleService();
    //产品类别树配置
    const selectConfig = {
      children: 'children',
      label: 'roleName',
    }

    onMounted(async () => {
      await getRoleList();
    })

    async function getRoleList() {
      const roles = await roleService.find();
      const role:IRole = {
        roleId: 0,
        roleName: "未选择",
        createdAt: null,
        creater: "",
        del_uuid: 0,
        deletedAt: null,
        deleter: "",
        level1Date: null,
        level1Name: "",
        level1Review: 0,
        level2Date: null,
        level2Name: "",
        level2Review: 0,
        printid: 0,
        updatedAt: null,
        updater: "",
        useflag: 0,
        useflagDate: null

      }
      roles.unshift(role);
      roleList.value = [...roles];
    }

    function focus() {
      ElSelectRef.value.focus();
    }

    expose({focus})

    return {
      ElSelectRef,
      roleList,
      selectConfig,
    };
  },
});
</script>