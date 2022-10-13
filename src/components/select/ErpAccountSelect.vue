<template>
  <el-select ref="ElSelectRef" placeholder="选择出纳账号" v-bind="$attrs">
    <el-option v-for="item in accountSelectList" :key="item.accountId" :label="item.accountName"
      :value="item.accountId">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { IAccount } from "@/module/account/account";
import { AccountService } from "@/module/account/account.service";

export default defineComponent({
  name: "ErpAccountSelect",
  setup(_props,{expose}) {
    onMounted(async () => {
      await getAccountList();
    })

    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }

    expose({focus})

    //产品类别选择List
    const accountSelectList = ref<IAccount[]>();
    //服务
    const accountService = new AccountService();

    async function getAccountList() {
      accountSelectList.value = await accountService.find({
        accountCode: "",
        accountId: 0,
        accountName: "",
        accountType: "",
        companyFlag: 0,
        currencyid: 0,
        useFlag: 0
      });

      accountSelectList.value?.push({
        accountId: 0,
        accountCode: "",
        accountName: '[选择出纳账户]',
        accountType: "",
        companyFlag: 0,
        createdAt: null,
        creater: "",
        currencyid: 0,
        updatedAt: null,
        updater: "",
        useFlag: 0
      })
    }

    return {
      ElSelectRef,
      accountSelectList,
      getAccountList,
    };
  },
});
</script>
