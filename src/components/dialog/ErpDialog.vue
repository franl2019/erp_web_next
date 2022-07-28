<template>
  <div v-if="isShow" class="fixed inset-0 z-20 flex items-center justify-center sm:h-screen pt-4 px-4 pb-20"
       @click.stop.prevent @keyup.enter.stop>
    <div class="fixed inset-0 sm:h-screen w-full bg-black opacity-50" @click.stop.prevent @keyup.enter.stop></div>
    <div
        class="inline-block w-full align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"/>
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 id="modal-title" class="text-lg leading-6 font-bold text-gray-900">
              {{ props.title }}
            </h3>
            <div class="mt-2 flex items-center justify-center">
              <p class="text-lg text-black w-auto">
                {{ props.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
          class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-end sm:space-x-2.5">
        <erp_button v-if="props.okBtnVisible" ref="okBtnRef" type="danger" @click="clickedConfirm">
          确定
        </erp_button>
        <erp_button v-if="props.closeBtnVisible" ref="cancelButtonRef" type="info"
                    @click="clickedCancel">
          取消
        </erp_button>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Erp_button from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";

const isShow = ref(true);
const okBtnRef = ref();
const cancelButtonRef = ref()
onMounted(() => {
  setDefaultFocus(props);
})

function setDefaultFocus(prop: { okBtnVisible: boolean, closeBtnVisible: boolean }) {
  const {okBtnVisible, closeBtnVisible} = prop;
  if (closeBtnVisible && cancelButtonRef.value) {
    cancelButtonRef.value.getNode().focus();
  } else if (okBtnVisible && okBtnRef.value) {
    okBtnRef.value.getNode().focus();
  }
}

const props = withDefaults(defineProps<{
  unmount?: Function;
  title?: string;
  message: string;
  ok?: Function;
  close?: Function;
  okBtnVisible?: boolean;
  closeBtnVisible?: boolean;
}>(), {
  unmount: () => {
  },
  title: "提示",
  message: "",
  ok: () => {
  },
  close: () => {
  },
  okBtnVisible: true,
  closeBtnVisible: true,
});
const emits = defineEmits(['clickedCancel', 'clickedConfirm'])

async function clickedConfirm() {
    emits('clickedConfirm');
    await props.ok();
    await props.unmount();
}

async function clickedCancel() {
    emits('clickedCancel');
    await props.close();
    await props.unmount();
}
</script>