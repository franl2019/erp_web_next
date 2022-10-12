<template>
  <el-select ref="ElSelectRef" placeholder="选择核销类型" v-bind="$attrs">
    <el-option v-for="item in accountsVerifySheetTypeList" :key="item.id" :label="item.typeName" :value="item.id">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AccountsVerifySheetType } from "@/module/accountsVerifySheet/accountsVerifySheet";

interface IAccountsVerifySheetType {
  id: AccountsVerifySheetType;
  typeName: string;
}

export default defineComponent({
  name:"ErpAccountsVerifySheetTypeSelect",
  expose:["focus"],
  setup() {
    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }

    const accountsVerifySheetTypeList = ref<IAccountsVerifySheetType[]>([
      {
        id: AccountsVerifySheetType.advancePayment_accountsReceivable_1,
        typeName: '预收冲应收[1]'
      },
      {
        id: AccountsVerifySheetType.prepayments_accountsPayable_2,
        typeName: '预付冲应付[2]'
      },
      {
        id: AccountsVerifySheetType.accountsReceivable_accountsPayable_3,
        typeName: '应收冲应付[3]'
      },
      {
        id: AccountsVerifySheetType.accountsReceivable_accountsReceivable_4,
        typeName: '应收转应收[4]'
      },
      {
        id: AccountsVerifySheetType.accountsPayable_accountsPayable_5,
        typeName: '应付转应付[5]'
      },

    ]);
    return {
      ElSelectRef,
      focus,
      accountsVerifySheetTypeList,
    };
  },
});
</script>

<style scoped>

</style>