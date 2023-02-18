<template>
  <div class="z-10 fixed inset-0 h-screen w-full bg-black opacity-50" @click.stop.prevent @keyup.enter.stop></div>
  <div class="z-10 fixed inset-0 flex items-center justify-center h-screen">
    <div
        ref="dialogBoxRef"
        :style="titleStyle"
        class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
    >

      <div
          class="w-full flex items-center justify-between select-none
          px-4 font-bold h-14 bg-gray-100 text-base font-medium text-gray-900"
          @mousedown="mousedown"
      >
        <div class="">
          {{ $props.title }}
        </div>

        <div
            class="h-7 w-7 rounded bg-red-500 text-2xl text-white
            flex justify-center items-center select-none pb-1
            hover:bg-red-600 shadow-2xl active:bg-red-700 cursor-pointer"
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
          class="flex flex-col
          bg-gray-100 px-4 py-2 space-y-2
          md:py-0 md:h-14 md:flex md:items-center
          sm:flex-row-reverse sm:space-x-reverse
          sm:px-4 sm:space-y-0 sm:space-x-2">
        <erp-button type="success" @click="ok">
          确定
        </erp-button>
        <erp-button type="info" @click="close">
          取消
        </erp-button>
        <div class="flex-grow">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import ErpButton from "@/components/button/ErpButton.vue";
import {computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref} from "vue";

export default defineComponent({
  name: "ErpFormDialog",
  components: {
    ErpButton
  },
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
  setup(props, {emit}) {

    function ok() {
      emit('clickedConfirm');
      emit('update:visible', false);
      if (props.resolve_dialog) {
        props.resolve_dialog(true);
        props.unmount()
      }
    }

    function close() {
      emit('clickedClose');
      emit('clickedCancel');
      emit('update:visible', false);
      if (props.reject_dialog) {
        props.reject_dialog('close');
        props.unmount()
      }
    }

    //移动值 px
    let translateX = ref(0);
    let translateY = ref(0);

    //计算属性 组合
    const titleStyle = computed(() => {
      return `transform: translate(${translateX.value}px, ${translateY.value}px);`
    })

    const dialogBoxRef = ref<HTMLElement>()

    //上次鼠标按下位置
    let lastClientX = 0;
    let lastClientY = 0;
    //最大移动位置
    let maxTranslateX = 0;
    let maxTranslateY = 0;

    //按下
    function mousedown(event: MouseEvent) {
      //记录按下位置
      lastClientX = event.clientX;
      lastClientY = event.clientY;
      //改变鼠标为移动样式
      document.body.style.cursor = 'move'
      //记录可视范围
      maxTranslateX = Math.abs(dialogBoxRef.value!.offsetLeft);
      maxTranslateY = Math.abs(dialogBoxRef.value!.offsetTop);
      //监听事件
      document.addEventListener('mouseup', mouseup);
      document.addEventListener('mousemove', mousemove);
    }

    //松开
    function mouseup() {
      //改变鼠标为移动样式
      document.body.style.cursor = 'default'
      //取消监听事件
      document.removeEventListener('mouseup', mouseup)
      document.removeEventListener('mousemove', mousemove)
      //清零最大移动范围
      maxTranslateX = 0;
      maxTranslateY = 0;
    }

    function mousemove(event: MouseEvent) {
      //新位置 = 旧位置 + 新移动px
      const newTranslateX = translateX.value + (event.clientX - lastClientX);
      const newTranslateY = translateY.value + (event.clientY - lastClientY);
      //记录上次位置
      lastClientX = event.clientX;
      lastClientY = event.clientY;
      //如果0就等于不动
      if ((newTranslateX + newTranslateY) === 0) return;
      //控制不能超出可视范围
      if (maxTranslateX >= Math.abs(newTranslateX)) translateX.value = newTranslateX;
      if (maxTranslateY >= Math.abs(newTranslateY)) translateY.value = newTranslateY;
    }

    onMounted(() => {
      window.addEventListener('resize', resize);
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resize);
    })

    //调整浏览器大小事件
    function resize() {
      //清空移动位置
      if (translateX.value + translateY.value === 0) return;
      translateX.value = 0
      translateY.value = 0
    }


    return {
      ok,
      close,
      mousedown,
      titleStyle,
      dialogBoxRef
    };
  },
});
</script>