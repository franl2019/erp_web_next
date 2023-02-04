<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black opacity-50" @click.stop.prevent
       @keyup.enter.stop>
  </div>

  <div class="absolute top-0 left-0 h-full w-full">
    <div class="relative p-10 h-full w-full">
      <div class="flex flex-col bg-white rounded-xl border-solid border shadow-xl h-full w-full">
        <div class="flex-none flex justify-between items-center h-12  pl-4 pr-4 rounded-t-xl bg-gray-100">
          <div class="text-xl font-bold">{{ $props.title }}</div>
          <div
              class="h-7 w-7 rounded bg-red-500 text-2xl text-white
                    flex justify-center items-center select-none pb-1
                    hover:bg-red-600 shadow-2xl active:bg-red-700 cursor-pointer"
              @click="onCloseButton">
            ×
          </div>
        </div>
        <div class="flex-grow flex h-0 py-2 pl-4 pr-4">
          <!--left-->
          <div v-show="leftMenu && isShowLeft"
               class="flex-col flex-none absolute sm:relative bg-white top-0 sm:left-0 w-full sm:w-64 h-full">
            <slot name="left"></slot>
          </div>
          <div v-show="leftMenu"
               class="w-6 h-full flex flex-none items-start z-40 sm:z-0 mr-2 border-l border-solid"
               @click="switchLeftBoxVisible">
            <div
                class="py-2 border-t border-r border-b border-solid flex flex-col items-center justify-center cursor-pointer">
              <div v-show="!isShowLeft" class="text-center font-bold text-sm select-none">筛选</div>
              <div v-show="isShowLeft" class="text-center font-bold text-sm select-none">收起</div>
              <img v-show="!isShowLeft" alt="menu" class="h-5 w-5"
                   src="@/assets/keyboard_double_arrow_right_black_18dp.svg"/>
              <img v-show="isShowLeft" alt="menu" class="h-5 w-5"
                   src="@/assets/keyboard_double_arrow_left_black_18dp.svg"/>
            </div>
          </div>
          <!--right-->
          <div class="flex-grow flex flex-col h-full">
            <slot></slot>
          </div>
        </div>
        <div class="flex-none flex justify-between items-center h-14  pl-4 pr-4 rounded-b-xl bg-gray-100">
          <div>
            <slot name="leftBottomButtonBox"></slot>
          </div>
          <div>
            <erp-button ref="okButtonRef" type="success" @click="onOkButton">确定</erp-button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, PropType, ref} from "vue";
import ErpButton from "@/components/button/ErpButton.vue";

export default defineComponent({
  name: "ErpLeftRightLayoutDialog",
  components: {ErpButton},
  props: {
    resolve_dialog: {
      type: Function as PropType<(value: any) => boolean>
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
    leftMenu: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits:[
    'clickedConfirm',
    'clickedCancel',
    'clickedClose',
  ],
  setup(props, {emit}) {
    const isShowLeft = ref<boolean>(true);
    const okButtonRef = ref();
    function switchLeftBoxVisible() {
      isShowLeft.value = !isShowLeft.value;
    }

    onMounted(async ()=>{
      await nextTick();
      okButtonRef.value.getNode().focus();
    })

    function onCloseButton() {
      emit('clickedClose');
      emit('clickedCancel');
      if (props.reject_dialog) {
        props.reject_dialog('close');
        props.unmount();
      }
    }

    function onOkButton() {
      emit('clickedConfirm');
      if (props.resolve_dialog) {
        props.resolve_dialog(true);
        props.unmount();
      }
    }

    return {
      isShowLeft,
      okButtonRef,
      onOkButton,
      onCloseButton,
      switchLeftBoxVisible,
    };
  },
});
</script>