<template>
  <div class="fixed inset-0 z-20 flex items-center justify-center sm:h-screen pt-4 px-4 pb-20">
    <div class="fixed inset-0 sm:h-screen w-full bg-black opacity-50" @click.stop.prevent @keyup.enter.stop></div>
    <div
        class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
      <p class="w-screen font-bold px-4  py-2  text-base font-medium text-gray-900 border-b">
        {{ props.title }}
      </p>
      <div class="w-full px-4 max-h-96 overflow-y-auto">
        <slot></slot>
      </div>
      <div
          class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col space-y-2 sm:space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:space-x-2">
        <erp_button type="success" class="" @click="ok">
          确定
        </erp_button>
        <erp_button type="info" class="" @click="close">
          取消
        </erp_button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Erp_button from "@/components/button/ErpButton.vue";

const props = withDefaults(defineProps<{
  title?: string;
  visible?: boolean;
}>(), {
  title: ""
})

const emits = defineEmits(['clickedConfirm', 'clickedCancel', 'update:visible'])

async function ok() {
    emits('clickedConfirm');
    emits('update:visible', false);
}

function close() {
    emits('clickedCancel');
    emits('update:visible', false);
}
</script>