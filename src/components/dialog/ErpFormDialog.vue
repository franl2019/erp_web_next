<template>
  <div class="fixed inset-0 z-20 flex items-center justify-center sm:h-screen pt-4 px-4 pb-20">
    <!--遮罩层-->
    <div class="fixed inset-0 sm:h-screen w-full bg-black opacity-50" @click.stop.prevent @keyup.enter.stop></div>

    <div
        class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
      <div
          class="w-full flex items-center justify-between px-4 font-bold h-14 bg-gray-100 text-base font-medium text-gray-900">
        <div>
          {{ props.title }}
        </div>

        <div
            class="h-7 w-7 rounded bg-red-500 text-2xl text-white flex justify-center items-center select-none pb-1 hover:bg-red-600 shadow-2xl active:bg-red-700"
            @click="close">
          ×
        </div>
      </div>

      <template v-if="$slots.default">
        <div class="w-full px-4 max-h-96 overflow-y-auto">
          <slot></slot>
        </div>
      </template>

      <template v-else>
        <slot name="custom"></slot>
      </template>

      <div
          class="bg-gray-100 px-4 py-2 md:py-0 md:h-14 md:flex md:items-center sm:px-4 flex flex-col space-y-2 sm:space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:space-x-2">
        <erp-button class="" type="success" @click="ok">
          确定
        </erp-button>
        <erp-button class="" type="info" @click="close">
          取消
        </erp-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import ErpButton from "@/components/button/ErpButton.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErpFormDialog",
  components: {
    ErpButton
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  emits: [
    'clickedConfirm',
    'clickedCancel',
    'clickedClose',
    'update:visible',
  ],
  setup(props, {emit: emits}) {

    async function ok() {
      emits('clickedConfirm');
      emits('update:visible', false);
    }

    function close() {
      emits('clickedCancel');
      emits('update:visible', false);
    }

    return {
      props,
      ok,
      close,
    };
  },
});
</script>