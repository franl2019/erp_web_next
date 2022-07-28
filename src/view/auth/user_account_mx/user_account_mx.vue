<template>
  <div class="flex flex-col h-full">
    <erp_title title="用户出纳账户权限">
      <erp_button @click="clickedCreateBtn">新增权限</erp_button>
      <erp_button @click="clickedDeleteBtn" type="danger">删除权限</erp_button>
    </erp_title>
    <erp_table
        ref="userAccountAuthTableRef"
        :table-state="defaultUserAccountAuthTableState"
        :find-dto="userAccountAuthFindDto"
    ></erp_table>
  </div>

  <account-auth-create-dialog
      title="新增用户出纳账户权限"
      v-if="accountCreateDialogVisual"
      :dto="userAccountAuthCreateDto"
      @clickedConfirm="clickedCreateDialogSaveBtn"
      @clickedCancel="clickedCreateDialogCancelBtn"
  >
  </account-auth-create-dialog>
</template>
<script setup lang="ts">
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {UserAccountAuthFindDto} from "@/module/user_account_mx/dto/userAccountAuthFind.dto";
import {
  defaultUserAccountAuthTableState
} from "@/view/auth/user_account_mx/tableConfig/defaultUserAccountAuthTableState";
import AccountAuthCreateDialog from "@/view/auth/user_account_mx/components/accountAuthCreateDialog.vue";
import {UserAccountAuthCreateDto} from "@/module/user_account_mx/dto/userAccountAuthCreate.dto";
import {UserAccountAuthDeleteDto} from "@/module/user_account_mx/dto/userAccountAuthDeleteDto";
import ErpDialog from "@/components/dialog/dialog";
import {IUserAccountMxFind} from "@/module/user_account_mx/userAccountMx";
import {UserAccountMxService} from "@/module/user_account_mx/userAccountMx.service";
import {VerifyParamError} from "@/error/verifyParamError";
import {useRoute} from "vue-router";

const userAccountAuthTableRef = ref<ITableRef>();

onMounted(async () => {
  await initTableData();
})

async function initTableData() {
  await userAccountAuthTableRef.value?.initTableData();
}


const route = useRoute();

const accountCreateDialogVisual = ref<boolean>(false);

//查询
const userAccountAuthFindDto = ref(new UserAccountAuthFindDto());
userAccountAuthFindDto.value.userid = Number(route.query.userid);
//创建
const userAccountAuthCreateDto = ref(new UserAccountAuthCreateDto());
//删除
const userAccountAuthDeleteDto = ref(new UserAccountAuthDeleteDto());
userAccountAuthDeleteDto.value.userid = Number(route.query.userid);

//创建出纳账号权限按钮
function clickedCreateBtn() {
  userAccountAuthCreateDto.value = new UserAccountAuthCreateDto();
  userAccountAuthCreateDto.value.userid = Number(route.query.userid);
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
  ErpDialog({
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
</script>