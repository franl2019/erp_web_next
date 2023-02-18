<template>
  <erp-input-round
      :disabled="$props.disabled"
      :value="$props.clientName || '点击选择客户'"
      class="hover:underline underline-offset-4 cursor-pointer"
      readonly
      type="text"
      @click="clickedButton">
  </erp-input-round>
</template>

<script lang='ts'>
import {useErpSelectClientDialog} from "@/components/dialog/selectInfo/client/useErpSelectClientDialog";
import useErpDialog from "@/components/dialog/useErpDialog";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErpSelectClientInput",
  components: {
    ErpInputRound,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    unSelectSure: {
      type: Boolean,
      default: true,
    },
    clientId: {
      type: Number,
    },
    clientName: {
      type: String,
    },
    operateareaid: {
      type: Number
    }
  },
  emits: [
    "update:clientId",
    "update:clientName",
    "update:operateareaid",
    "change"],
  setup(props, {emit}) {

    async function clickedSelect() {
      const client = await useErpSelectClientDialog()
      emit('update:clientName', client.clientname);
      emit('update:clientId', client.clientid);
      emit('update:operateareaid', client.operateareaid)
      emit('change',client)
    }

    async function clickedButton() {
      if (props.clientId === 0) {
        await clickedSelect();
      } else {
        await clickedUnSelect();
      }
    }

    async function clickedUnSelect() {
      if (props.unSelectSure) {
        await useErpDialog({
          title: "注意",
          message: "重新选择将清空明细！"
        })
      }
      await clickedSelect()
    }

    return {
      clickedButton,
      clickedSelect,
      clickedUnSelect,
    };
  },
});
</script>