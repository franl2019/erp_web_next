<template>
  <erp-input-round
      :disabled="$props.disabled"
      :value="$props.buyname ? $props.buyname :'点击选择供应商'"
      class="hover:underline underline-offset-4 cursor-pointer"
      readonly
      type="text"
      @click="clickedButton">
  </erp-input-round>
</template>

<script lang='ts'>
import {useErpSelectBuyDialog} from "@/components/dialog/selectInfo/buy/useErpSelectBuyDialog";
import useErpDialog from "@/components/dialog/useErpDialog";
import {defineComponent} from "vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";

export default defineComponent({
  name: "ErpSelectBuyBtn",
  components: {ErpInputRound},
  props: {
    buyname: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unSelectSure: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["select", "unSelect"],
  setup(props, {emit}) {

    async function clickedButton(){
      if (props.buyname === "") {
        await clickedSelect();
      } else {
        await clickedUnSelect();
      }
    }

    async function clickedSelect() {
      const buy = await useErpSelectBuyDialog();
      emit('select', buy);
    }

    async function clickedUnSelect() {
      if (props.unSelectSure) {
        await useErpDialog({
          title: "注意",
          message: "重新选择将清空单据!!"
        })
      }
      const buy = await useErpSelectBuyDialog();
      emit('unSelect');
      emit('select', buy);
    }

    return {
      clickedButton,
      clickedSelect,
      clickedUnSelect
    };
  },
});
</script>