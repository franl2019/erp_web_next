<template>
  <erp-page-box>
    <erp-title title="1.选择用户"></erp-title>
    <erp-form>
      <erp-form-item lg-col="1" md-col="2" name="用户名称">
        <erp-user-select v-model="userid"></erp-user-select>
      </erp-form-item>
    </erp-form>

    <template v-if="userid">
      <erp-title title="2.管理用户数据范围"></erp-title>
      <div class="flex flex-grow flex-col md:flex-row">
        <div class="flex-none md:w-64 overflow-y-auto md:mr-2 border-solid border border-gray-400">
          <erp-tree ref="AuthTreeRef" :config="authTreeConfig" :data="authMenuTreeData" :default-expand-all="true"
                    :highlight-current="true" node-key="authMenuId" @node-click="onClickTreeNode"/>
        </div>
        <div class="flex-grow h-96 md:h-full">
          <Component :is="user_client_operatearea_mx" v-if="showComponent==='user_client_operatearea_mx'"
                     :userid="userid"></Component>
          <Component :is="user_buy_operatearea_mx" v-else-if="showComponent==='user_buy_operatearea_mx'"
                     :userid="userid"></Component>
          <Component :is="user_warehouse_mx" v-else-if="showComponent==='user_warehouse_mx'" :userid="userid">
          </Component>
          <Component :is="user_account_mx" v-else-if="showComponent==='user_account_mx'" :userid="userid">
          </Component>
        </div>
      </div>
    </template>
  </erp-page-box>
</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTree from "@/components/tree/ErpTree.vue";
import user_client_operatearea_mx from "@/view/auth/userOperateareaMx/client/user_client_operatearea_mx.vue";
import user_buy_operatearea_mx from "@/view/auth/userOperateareaMx/buy/user_buy_operatearea_mx.vue";
import user_warehouse_mx from "@/view/auth/userWarehouseMx/user_warehouse_mx.vue";
import user_account_mx from "@/view/auth/userAccountMx/user_account_mx.vue";
import {Component, defineComponent, ref} from "vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpUserSelect from "@/components/select/ErpUserSelect.vue";

export default defineComponent({
  name: "auth",
  components: {
    ErpUserSelect,
    ErpFormItem,
    ErpForm,
    ErpTree,
    ErpTitle,
    ErpPageBox,
  },
  setup() {
    const AuthTreeRef = ref();
    const userid = ref<number>(0);


    const authTreeConfig = {
      children: 'children',
      label: 'authMenuName',
    }

    interface IAuthMenu {
      authMenuId: number;
      authMenuName: string;
      router: string;
      component?: Component
    }

    interface IAuthMenuTree extends IAuthMenu {
      children?: IAuthMenuTree[];
    }

    const authMenuTreeData = ref<IAuthMenuTree[]>([
      {
        authMenuId: 1,
        authMenuName: "操作区域",
        router: "/1",
        children: [
          {
            authMenuId: 11,
            authMenuName: "客户操作区域",
            router: "user_client_operatearea_mx",
            component: user_client_operatearea_mx
          },
          {
            authMenuId: 12,
            authMenuName: "供应商操作区域",
            router: "user_buy_operatearea_mx",
            component: user_buy_operatearea_mx
          }
        ]
      },
      {
        authMenuId: 2,
        authMenuName: "仓库模块",
        router: "/2",
        children: [
          {
            authMenuId: 21,
            authMenuName: "仓库权限",
            router: "user_warehouse_mx",
            component: user_warehouse_mx
          }
        ]
      },
      {
        authMenuId: 3,
        authMenuName: "财务模块",
        router: "/3",
        children: [
          {
            authMenuId: 31,
            authMenuName: "出纳账户权限",
            router: "user_account_mx",
            component: user_account_mx
          }
        ]
      },
    ])

    let showComponent = ref()

    function onClickTreeNode(authMenu: IAuthMenuTree) {
      if (authMenu.component && userid.value) {
        showComponent.value = authMenu.router
      }
    }

    return {
      AuthTreeRef,
      userid,
      authTreeConfig,
      authMenuTreeData,
      showComponent,
      user_account_mx,
      user_warehouse_mx,
      user_buy_operatearea_mx,
      user_client_operatearea_mx,
      onClickTreeNode,
    };
  },
});
</script>