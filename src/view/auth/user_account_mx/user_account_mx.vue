<template>
  <div class="flex flex-col h-full">
    <erp-title title="用户出纳账户权限">
      <erp-button @click="clickedCreateBtn">新增权限</erp-button>
      <erp-button type="danger" @click="clickedDeleteBtn">删除权限</erp-button>
    </erp-title>
    <erp-table ref="userAccountAuthTableRef" :find-dto="userAccountAuthFindDto"
               :table-state="defaultUserAccountAuthTableState"></erp-table>
  </div>

  <account-auth-create-dialog v-if="accountCreateDialogVisual" :dto="userAccountAuthCreateDto"
                              title="新增用户出纳账户权限"
                              @clickedCancel="clickedCreateDialogCancelBtn"
                              @clickedConfirm="clickedCreateDialogSaveBtn">
  </account-auth-create-dialog>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import AccountAuthCreateDialog from "@/view/auth/user_account_mx/components/accountAuthCreateDialog.vue";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {UserAccountAuthFindDto} from "@/module/user_account_mx/dto/userAccountAuthFind.dto";
import {
  defaultUserAccountAuthTableState
} from "@/view/auth/user_account_mx/tableConfig/defaultUserAccountAuthTableState";
import {UserAccountAuthCreateDto} from "@/module/user_account_mx/dto/userAccountAuthCreate.dto";
import {UserAccountAuthDeleteDto} from "@/module/user_account_mx/dto/userAccountAuthDeleteDto";
import useErpDialog from "@/components/dialog/useErpDialog";
import {IUserAccountMxFind} from "@/module/user_account_mx/userAccountMx";
import {UserAccountMxService} from "@/module/user_account_mx/userAccountMx.service";
import {VerifyParamError} from "@/types/error/verifyParamError";

export default defineComponent({
  name:"user_account_mx",
  components: {
    ErpTable,
    ErpTitle,
    ErpButton,
    AccountAuthCreateDialog
  },
  props: {
    userid: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const userAccountAuthTableRef = ref<ITableRef>();

    onMounted(async () => {
      await initTableData();
    })

    async function initTableData() {
      await userAccountAuthTableRef.value?.initTableData();
    }

    const accountCreateDialogVisual = ref<boolean>(false);

    //查询
    const userAccountAuthFindDto = ref(new UserAccountAuthFindDto());
    userAccountAuthFindDto.value.userid = Number(props.userid);
    //创建
    const userAccountAuthCreateDto = ref(new UserAccountAuthCreateDto());
    //删除
    const userAccountAuthDeleteDto = ref(new UserAccountAuthDeleteDto());
    userAccountAuthDeleteDto.value.userid = Number(props.userid);

    //创建出纳账号权限按钮
    function clickedCreateBtn() {
      userAccountAuthCreateDto.value = new UserAccountAuthCreateDto();
      userAccountAuthCreateDto.value.userid = Number(props.userid);
      accountCreateDialogVisual.value = true;
    }

    //创建出纳账号权限保存按钮
    async function clickedCreateDialogSaveBtn() {
      await userAccountMxAuth.create(userAccountAuthCreateDto.value);
      accountCreateDialogVisual.value = false;
      await userAccountAuthTableRef.value?.initTableData();
    }

    //创建出纳账号权限取消按钮
    function clickedCreateDialogCancelBtn() {
      accountCreateDialogVisual.value = false;
    }

    //accountAuthService
    const userAccountMxAuth = new UserAccountMxService();

    async function clickedDeleteBtn() {
      const userAccountAuth = await getUserAccountAuthTableSelected();
      useErpDialog({
        title: "提示",
        message: `是否删除${userAccountAuth.accountName}`,
        ok: async () => {
          userAccountAuthDeleteDto.value.accountId = userAccountAuth.accountId;
          await userAccountMxAuth.delete_data(userAccountAuthDeleteDto.value);
          accountCreateDialogVisual.value = false;
          await userAccountAuthTableRef.value?.initTableData();
        }
      })
    }

    async function getUserAccountAuthTableSelected(): Promise<IUserAccountMxFind> {
      const userAccountMxList = userAccountAuthTableRef.value?.getGridApi().getSelectedRows();
      if (userAccountMxList && userAccountMxList.length > 0) {
        return userAccountMxList[0];
      } else {
        return Promise.reject(new VerifyParamError("请选择出纳账户权"))
      }
    }

    return {
      props,
      userAccountMxAuth,
      userAccountAuthFindDto,
      userAccountAuthTableRef,
      userAccountAuthCreateDto,
      userAccountAuthDeleteDto,
      accountCreateDialogVisual,
      defaultUserAccountAuthTableState,
      initTableData,
      clickedCreateBtn,
      clickedDeleteBtn,
      clickedCreateDialogSaveBtn,
      clickedCreateDialogCancelBtn,
    };
  },
});
</script>