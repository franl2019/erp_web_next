<template>
  <erp-title v-if="readonly" title="角色">
    <div class="h-10 flex space-x-1">
      <erp-button :disabled="!buttonShowState.create" :size="'small'" :type="'info'" @click="onClickedCreateRoleButton">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" :size="'small'" :type="'success'" @click="onClickedUpdateRoleButton">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" :size="'small'" :type="'danger'" @click="onClickedDeleteRoleButton">删除</erp-button>
    </div>
  </erp-title>
  <erp-tree
      ref="roleTreeRef"
      :config="roleTreeConfig"
      :data="roleTreeData"
      :highlight-current="true"
      node-key="roleId"
      @nodeClick="onClickedRoleTree"
      v-bind="$attrs"
  />

  <role-create-dialog v-if="createDialogVisual"
                      @clickedCancel="clickedCancelCreateDialog"
                      @clickedConfirm="clickedConfirmCreateDialog">
  </role-create-dialog>

  <role-update-dialog v-if="updateDialogVisual"
                      :role="tableSelectedRole"
                      @clickedCancel="clickedCancelUpdateDialog"
                      @clickedConfirm="clickedConfirmUpdateDialog">
  </role-update-dialog>
</template>

<script lang="ts">
import {defineComponent, onMounted, Ref, ref} from "vue";
import ErpTree from "@/components/tree/ErpTree.vue";
import {IRole, IRoleTree} from "@/module/role/role";
import {RoleService} from "@/module/role/role.service";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import RoleCreateDialog from "@/view/role/roleCreateDialog.vue";
import RoleUpdateDialog from "@/view/role/roleUpdateDialog.vue";
import {useButtonState} from "@/composables/useButtonState";
import {RoleUpdateDto} from "@/module/role/dto/roleUpdate.dto";

export default defineComponent({
  name: "ErpRoleTree",
  components: {RoleUpdateDialog, RoleCreateDialog, ErpButton, ErpTitle, ErpTree},
  props: {
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits:['node-click'],
  setup: function (_prop, {expose,emit}) {

    onMounted(() => {
      initData();
    })

    const createDialogVisual = ref(false);
    const updateDialogVisual = ref(false);
    const {buttonShowState, updateButtonState} = useButtonState();
    const roleService = new RoleService();
    const tableSelectedRole: Ref<IRole> = ref(new RoleUpdateDto({} as IRole));

    //供应商地区树data
    let roleTreeData = ref<IRoleTree[]>([]);

    //供应商地区树配置
    const roleTreeConfig = {
      children: 'children',
      label: 'roleName',
    }

    //获取供应商地区数据
    async function getRoles() {
      //供应商地区服务
      const roleService = new RoleService();
      const roles = await roleService.find();
      roleTreeData.value = [...roles ]
    }

    //供应商地区树ref
    const roleTreeRef = ref();

    //初始化数据
    async function initData() {
      await getRoles();
    }

    function getSelectedNode() {
      return roleTreeRef.value.getSelectedNode() as IRole | undefined | null
    }

    function setSelectedNode() {
      return roleTreeRef.value.setSelectedNode()
    }

    function onClickedRoleTree() {
      const role = getSelectedNode();
      if (role){
        tableSelectedRole.value = {...role};
        if(role.roleId !== 0){
          updateButtonState(role.level1Review,role.level2Review);
        }else{
          updateButtonState();
        }
        emit('node-click',role);
      }
    }

    function onClickedCreateRoleButton() {
      createDialogVisual.value = true;
    }

    function clickedCancelCreateDialog() {
      createDialogVisual.value = false;
    }

    async function clickedConfirmCreateDialog(role: IRole) {
      await roleService.create(role);
      await initData();
      createDialogVisual.value = false;
      updateButtonState();
    }


    function clickedCancelUpdateDialog() {
      updateDialogVisual.value = false;
    }

    async function clickedConfirmUpdateDialog(role: IRole) {
      await roleService.update(role);
      await initData();
      updateDialogVisual.value = false;
    }

    function onClickedUpdateRoleButton() {
      updateDialogVisual.value = true;
    }

    async function onClickedDeleteRoleButton() {
      await roleService.delete_data(tableSelectedRole.value.roleId);
      await initData();
      updateButtonState();
    }

    expose({initData, getSelectedNode, setSelectedNode});

    return {
      roleTreeRef,
      roleTreeData,
      roleTreeConfig,
      buttonShowState,
      tableSelectedRole,
      createDialogVisual,
      updateDialogVisual,
      initData,
      onClickedRoleTree,
      onClickedCreateRoleButton,
      clickedCancelCreateDialog,
      clickedConfirmCreateDialog,
      clickedCancelUpdateDialog,
      clickedConfirmUpdateDialog,
      onClickedUpdateRoleButton,
      onClickedDeleteRoleButton,
    };
  },
});
</script>

<style scoped>

</style>