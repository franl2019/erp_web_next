<template>
  <el-select ref="ElSelectRef" v-model="value" placeholder="选择出纳账号" style="height: 32px">
    <el-option
        v-for="item in accountSelectList"
        :key="item.accountId"
        :label="item.accountName"
        :value="item.accountId"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {IAccount} from "@/module/account/account";
import {AccountService} from "@/module/account/account.service";
import {defineComponent, nextTick, onMounted, ref, unref} from 'vue';

export default defineComponent({
  name: "table_select_account_auth",
  props: ["params"],
  setup(props) {
    const accountSelectList = ref<IAccount[]>([]);
    const value = ref(0);
    const {params} = unref(props);
    const ElSelectRef = ref();

    onMounted(async () => {
      await getAccountList()
      value.value = params.value;
      await nextTick(()=>{
        ElSelectRef.value?.focus()
      })
    })

    function getValue() {
      // this simple editorModel doubles any value entered into the input
      return value.value;
    }

    async function getAccountList() {
      const accountService = new AccountService();
      accountSelectList.value = await accountService.findAuth();
    }

    return{
      getValue,
      value,
      ElSelectRef,
      accountSelectList,
    }


  }
})
</script>

