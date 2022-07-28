<template>
  <el-select style="height: 32px" v-model="value" placeholder="选择出纳账号" ref="ElSelectRef">
    <el-option
        v-for="item in accountSelectList"
        :key="item.accountId"
        :label="item.accountName"
        :value="item.accountId"
    >
    </el-option>
  </el-select>
</template>

<script lang="js">
import {AccountService} from "@/module/account/account.service";
import {nextTick} from "vue";
export default {
  props: ['params'],
  data() {
    return {
      accountSelectList: [],
      value: 0,
    }
  }, methods: {
    getValue() {
      // this simple editor doubles any value entered into the input
      return this.value;
    },

    async getAccountList() {
      const accountService = new AccountService();
      this.accountSelectList = await accountService.findAuth();
    }

  },async created() {
    await this.getAccountList()
    this.value = this.params.value;
  }, mounted() {
    nextTick(()=>{
      this.$refs.ElSelectRef.focus()
    })
  }
}
</script>