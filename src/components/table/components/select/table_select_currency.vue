<template>
  <el-select style="height: 32px" v-model="value" placeholder="选择币种" ref="ElSelectRef">
    <el-option
        v-for="item in currencySelectList"
        :key="item.currencyid"
        :label="item.currencyname"
        :value="item.currencyid"
    >
    </el-option>
  </el-select>
</template>

<script lang="js">
import {CurrencyService} from "@/module/currency/currency.service";
import {nextTick} from "vue";

export default {
  props:['params'],
  data(){
    return{
      currencySelectList:[],
      value:0
    }
  },methods:{
    getValue() {
      return this.value;
    },

    async getCurrencyList() {
      const currencyService = new CurrencyService();
      this.currencySelectList = await currencyService.find();
    }
  },async created() {
    await this.getCurrencyList()
    this.value = this.params.value;
  }, mounted() {
    nextTick(()=>{
      this.$refs.ElSelectRef.focus()
    })
  }
}
</script>
