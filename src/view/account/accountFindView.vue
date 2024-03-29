<template>
  <erp-page-box>
    <erp-title title="出纳账户">
      <erp-button @click="clickedCreateAccount">新增</erp-button>
      <erp-button type="success" @click="clickedEditAccount">修改</erp-button>
      <erp-button type="danger" @click="clickedDeleteAccount">删除</erp-button>
    </erp-title>
    <erp-table
        init
        ref="accountTableRef"
        :find-dto="accountFindDto"
        :table-state="defaultAccountTableConfig">
    </erp-table>
  </erp-page-box>

  <AccountCreateDialog v-if="accountCreateDialogVisible" :dto="accountCreateDto" title="新增出纳账号"
                       @clickedCancel="clickedCreateCancelBtn" @clickedConfirm="clickedCreateOkBtn">
  </AccountCreateDialog>

  <AccountEditDialog v-if="accountEditDialogVisible" :dto="accountEditDto" title="修改出纳账号"
                     @clickedCancel="clickedEditCancelBtn" @clickedConfirm="clickedEditOkBtn">
  </AccountEditDialog>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {defineComponent, ref} from "vue";
import AccountCreateDialog from "@/view/account/component/accountEdit.vue";
import AccountEditDialog from "@/view/account/component/accountEdit.vue";
import {AccountEditDto} from "@/module/account/dto/accountEdit.dto";
import {AccountService} from "@/module/account/account.service";
import useErpDialog from "@/components/dialog/useErpDialog";
import {defaultAccountTableConfig} from "@/view/account/config/defaultAccountTableConfig";
import {FindAccountDto} from "@/module/account/dto/accountFind.dto";
import {ITableRef} from "@/components/table/type";
import {AccountCreateDto} from "@/module/account/dto/accountCreate.dto";
import {IAccount} from "@/module/account/account";
import {VerifyParamError} from "@/types/error/verifyParamError";

export default defineComponent({
  name: "accountFindView",
  components: {
    ErpTitle,
    ErpButton,
    ErpPageBox,
    ErpTable,
    AccountCreateDialog,
    AccountEditDialog,
  },
  setup() {
    const accountTableRef = ref<ITableRef>();
    const accountCreateDialogVisible = ref(false);
    const accountEditDialogVisible = ref(false);

    const accountCreateDto = ref(new AccountCreateDto());
    const accountEditDto = ref(new AccountEditDto({
      accountCode: "",
      accountId: 0,
      accountName: "",
      accountType: "",
      companyFlag: 0,
      createdAt: null,
      creater: "",
      currencyid: 0,
      updatedAt: null,
      updater: "",
      useFlag: 0
    }));

    const accountService = new AccountService();
    const accountFindDto = ref(new FindAccountDto());

    function clickedCreateAccount() {
      accountCreateDto.value = new AccountCreateDto();
      accountCreateDialogVisible.value = true;
    }

    function clickedCreateCancelBtn() {
      accountCreateDialogVisible.value = false;
    }

    async function clickedCreateOkBtn() {
      await accountService.create(accountCreateDto.value);
      accountCreateDialogVisible.value = false;
      await initTableData();
    }

    async function clickedEditAccount() {
      const account = await getSelectedAccount();
      accountEditDto.value = new AccountEditDto(account);
      accountEditDialogVisible.value = true;
    }

    function clickedEditCancelBtn() {
      accountEditDialogVisible.value = false;
    }

    async function clickedEditOkBtn() {
      await accountService.update(accountEditDto.value);
      accountEditDialogVisible.value = false;
      await initTableData();
    }

    async function clickedDeleteAccount() {
      const account = await getSelectedAccount();
      useErpDialog({
        title: "提示",
        message: `是否删除${account.accountName}?`,
        ok: async () => {
          await accountService.delete_data(account.accountId);
          await initTableData();
        }
      })
    }

    async function getSelectedAccount(): Promise<IAccount> {
      const account = await accountTableRef.value?.getGridApi().getSelectedRows()[0];
      if (account && account.accountId) {
        return account
      } else {
        return Promise.reject(new VerifyParamError('请选择出纳账户再操作'));
      }
    }

    async function initTableData() {
      await accountTableRef.value?.initTableData();
    }

    return {
      defaultAccountTableConfig,
      accountTableRef,
      accountCreateDialogVisible,
      accountEditDialogVisible,
      accountCreateDto,
      accountEditDto,
      accountService,
      accountFindDto,
      clickedCreateAccount,
      clickedCreateCancelBtn,
      clickedCreateOkBtn,
      clickedEditAccount,
      clickedEditCancelBtn,
      clickedEditOkBtn,
      clickedDeleteAccount
    };
  },
});
</script>