<template>
  <el-select ref="ElSelectRef" placeholder="选择币种" v-bind="$attrs">
    <el-option v-for="item in currencySelectList" :key="item.currencyid" :label="item.currencyname"
               :value="item.currencyid">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {CurrencyService} from "@/module/currency/currency.service";
import {ICurrency} from "@/module/currency/currency";

export default defineComponent({
  name: "ErpCurrencySelect",
  expose: ["focus"],
  props: {
    modelValue:{
      type:Number,
      default:0
    }
  },
  emits: ['update:modelValue'],
  setup(_props, {emit}) {
    onMounted(async () => {
      await getCurrencyList();
      await setDefaultCurrency(currencySelectList.value);
    })

    const ElSelectRef = ref();
    const currencySelectList = ref<ICurrency[]>([]);//币种选择Data
    const currencyService = new CurrencyService();

    async function getCurrencyList() {
      currencySelectList.value = await currencyService.find();
    }

    function setDefaultCurrency(currencySelectList: ICurrency[]) {
      for (let i = 0; i < currencySelectList.length; i++) {
        if (currencySelectList[i].standardmoneyflag === 1) emit('update:modelValue', currencySelectList[i].currencyid);
      }
    }

    function focus() {
      ElSelectRef.value.focus();
    }

    return {
      ElSelectRef,
      currencySelectList,
      focus,
    };
  },
});
</script>