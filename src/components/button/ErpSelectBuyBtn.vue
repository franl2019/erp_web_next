<template>
  <erp-input-round
      :disabled="$props.disabled"
      :value="$props.buyname ? $props.buyname :'点击选择供应商'"
      class="hover:underline underline-offset-4 cursor-pointer"
      readonly
      type="text"
      @click="clickedButton">
  </erp-input-round>
<!--  <div class="flex rounded-md shadow-sm">-->
<!--    <ErpInputRound v-show="!props.disabled" :value="props.buyname ? props.buyname:'请选择供应商'"-->
<!--                   class="flex-1 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"-->
<!--                   disabled placeholder="" type="text"></ErpInputRound>-->

<!--    <ErpInputRound v-show="props.disabled" :value="props.buyname ? props.buyname:'请选择供应商'"-->
<!--                   class="flex-1 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded sm:text-sm border-gray-300"-->
<!--                   disabled placeholder="" style="background-color: #F5F7FA;color: #A8ABB2" type="text"></ErpInputRound>-->
<!--    <template v-if="!props.disabled">-->
<!--      <button v-if="props.buyname.length===0"-->
<!--              class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm active:bg-gray-100 focus:outline-none"-->
<!--              @click="clickedSelect">-->
<!--        选择-->
<!--      </button>-->
<!--      <button v-else-->
<!--              class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-500 text-white text-sm active:bg-red-600 focus:outline-none"-->
<!--              @click="clickedUnSelect">-->
<!--        取消-->
<!--      </button>-->
<!--    </template>-->
<!--  </div>-->
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