<template>
  <el-select ref="ElSelectRef" v-model="value" placeholder="选择币种" style="height: 32px">
    <el-option
        v-for="item in currencySelectList"
        :key="item.currencyid"
        :label="item.currencyname"
        :value="item.currencyid"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {CurrencyService} from "@/module/currency/currency.service";
import {defineComponent, nextTick, onMounted, ref, unref} from "vue";
import {ICurrency} from "@/module/currency/currency";

export default defineComponent({
  name: "table_select_currency",
  props: ["params"],
  setup(props) {
    const currencySelectList = ref<ICurrency[]>([]);
    const value = ref(0);
    const ElSelectRef = ref();
    const {params} = unref(props);

    onMounted(async () => {
      await getCurrencyList()
      value.value = params.value;
      await nextTick(() => {
        ElSelectRef.value?.focus()
      })
    })

    function getValue() {
      return value.value;
    }

    async function getCurrencyList() {
      const currencyService = new CurrencyService();
      currencySelectList.value = await currencyService.find();
    }

    return {
      currencySelectList,
      value,
      ElSelectRef,
      getValue,
    }

  }
})
</script>
