<template>
  <erp-form-dialog
      title="提示"
      @clicked-confirm="clickedOkSelectedDialog"
      @clicked-cancel="clickedCloseSelectedDialog"
  >
    <erp-form>
      <erp-form-item lg-col="8" md-col="8" name="终止数量">
        <erp-input-round type="number" v-model.number="stopQty"></erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import {defineComponent, PropType, ref} from 'vue';
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";

export default defineComponent({
  name: "saleOrderStopQtyInputDialog",
  components: {ErpInputRound, ErpFormItem, ErpForm, ErpFormDialog},
  props: {
    resolve_dialog: {
      type: Function as PropType<(value: unknown) => void>,
      required: true
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
    stopQty:{
      type: Number,
      default:0
    }
  },
  emits: [],
  setup(props) {

    const stopQty = ref<number>(props.stopQty || 0);

    async function clickedOkSelectedDialog() {
      props.resolve_dialog(stopQty.value);
      props.unmount();
    }

    async function clickedCloseSelectedDialog() {
      props.reject_dialog();
      props.unmount();
    }

    return {
      stopQty,
      clickedOkSelectedDialog,
      clickedCloseSelectedDialog
    }
  }
})
</script>

<style scoped>

</style>