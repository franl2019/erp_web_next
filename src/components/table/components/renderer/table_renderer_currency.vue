<template>
  <div>{{ currencyName }}</div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {ICurrency} from "@/module/currency/currency";
import {CurrencyService} from "@/module/currency/currency.service";

export default defineComponent({
  name: "TableRendererCurrency",
  props: ["params"],
  setup(props) {
    const value = ref(props.params.value);
    const currencyName = ref("[未选择]")

    //产品类别选择List
    const currencySelectList = ref<ICurrency[]>([]);
    //服务
    const currencyService = new CurrencyService();

    async function getCurrencyList() {
      currencySelectList.value = await currencyService.find();
    }

    async function setCurrencyName() {
      for (let i = 0; i < currencySelectList.value.length; i++) {
        if (currencySelectList.value[i].currencyid === value.value) {
          currencyName.value = currencySelectList.value[i].currencyname;
        }
      }
    }

    onMounted(async () => {
      await getCurrencyList();
      await setCurrencyName();
    })

    return {
      value,
      currencyName,
      currencySelectList,
    };
  },
});
</script>