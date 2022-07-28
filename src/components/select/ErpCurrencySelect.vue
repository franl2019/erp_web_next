<template>
  <el-select v-bind="$attrs" placeholder="选择币种" ref="ElSelectRef">
    <el-option
        v-for="item in currencySelectList"
        :key="item.currencyid"
        :label="item.currencyname"
        :value="item.currencyid"
    >
    </el-option>
  </el-select>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {CurrencyService} from "@/module/currency/currency.service";
import {ICurrency} from "@/module/currency/currency";

onMounted(async ()=>{
  await getCurrencyList();
  await setDefaultCurrency(currencySelectList.value);
})

const emits = defineEmits(['update:modelValue'])
const ElSelectRef = ref();
const currencySelectList = ref<ICurrency[]>([]);//币种选择Data
const currencyService = new CurrencyService();

async function getCurrencyList() {
  currencySelectList.value = await currencyService.find();
}

function setDefaultCurrency(currencySelectList:ICurrency[]) {
  for (let i = 0; i < currencySelectList.length; i++) {
    if(currencySelectList[i].standardmoneyflag === 1) emits('update:modelValue',currencySelectList[i].currencyid);
  }
}

function focus() {
  ElSelectRef.value.focus();
}
defineExpose({focus});
</script>

<style scoped>

</style>