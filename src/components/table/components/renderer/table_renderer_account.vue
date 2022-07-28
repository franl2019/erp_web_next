<template>
  <div>{{accountName}}</div>
</template>

<script setup lang="ts">
import {ICellRendererParams} from "ag-grid-community";
import {onMounted, ref} from "vue";
import {IAccount} from "@/module/account/account";
import {AccountService} from "@/module/account/account.service";

const props = defineProps<{
  params: ICellRendererParams
}>();

const value = ref(props.params.value);
const accountName = ref("[未选择]")

//产品类别选择List
const accountSelectList = ref<IAccount[]>([]);
//服务
const accountService = new AccountService();

async function getAccountList() {
  accountSelectList.value = await accountService.findAuth();
}

async function setAccountName(){
  for (let i = 0; i < accountSelectList.value.length; i++) {
    if(accountSelectList.value[i].accountId === value.value){
      accountName.value = accountSelectList.value[i].accountName;
    }
  }
}

onMounted(async () => {
  await getAccountList();
  await setAccountName();
})
</script>