<template>
  <erp-input-round
      :disabled="$props.disabled"
      :value="$props.clientname ? $props.clientname :'点击选择客户'"
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
  name: "ErpSelectClientBtn",
  components: {
    ErpInputRound,
  },
  props: {
    clientname: {
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

    async function clickedButton() {
      if (props.clientname === "") {
        await clickedSelect();
      } else {
        await clickedUnSelect();
      }
    }

    async function clickedSelect() {
      const client = await useErpSelectClientDialog()
      emit('select', client);
    }

    async function clickedUnSelect() {
      if (props.unSelectSure) {
        await useErpDialog({
          title: "注意",
          message: "重新选择将清空明细！"
        })
      }
      const client = await useErpSelectClientDialog()
      emit('unSelect');
      emit('select', client);
    }

    return {
      clickedButton,
      clickedSelect,
      clickedUnSelect,
    };
  },
});
</script>