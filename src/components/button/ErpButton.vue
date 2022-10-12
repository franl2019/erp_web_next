<template>
  <button ref="buttonRef"
          v-bind="$attrs"
          :class="buttonSizeStyle"
          :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>


<script lang="ts">
import {defineComponent, PropType} from "vue";
import {computed, ref} from "vue";

export default defineComponent({
  name:"ErpButton",
  expose:["getNode"],
  props:{
    size:{
      type:String as PropType<'mini' | 'small' | 'big'>,
      required:false,
      default:"big",
    },
    type:{
      type:String as PropType<'info' | 'primary' | 'success' | 'warning' | 'danger' | 'login'>,
      required:false,
      default:"info",
    },
    disabled:{
      type:Boolean,
      required:false,
      default:false,
    }
  },
  setup(props){
    const buttonType = {
      info: `bg-white hover:bg-white active:bg-gray-50 focus:ring-gray-500 text-black border-gray-300 shadow border border-gray-200`,
      primary: `bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-500 text-white shadow-lg`,
      success: `bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-500 text-white shadow-lg`,
      warning: `bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-500 text-white shadow-lg`,
      danger: `bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-500 text-white shadow-lg`,
      login: `bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700 focus:ring-indigo-600 text-white shadow-lg`
    }

    const disabledButtonType = {
      info: `bg-gray-200 text-white cursor-not-allowed`,
      primary: `bg-gray-200 text-white cursor-not-allowed`,
      success: `bg-gray-200 text-white cursor-not-allowed`,
      warning: `bg-gray-200 text-white cursor-not-allowed`,
      danger: `bg-gray-200 text-white cursor-not-allowed`,
      login: `bg-gray-200 text-white cursor-not-allowed`
    }

    const buttonSizeStyle = computed(() => {
      switch (props.size) {
        case 'mini':
          return `${props.disabled ? disabledButtonType[props.type] : buttonType[props.type]} flex items-center justify-center h-auto flex-none border-transparent text-xs p-1 font-bold rounded focus:outline-none disabled:opacity-50`
        case 'small':
          return `${props.disabled ? disabledButtonType[props.type] : buttonType[props.type]} flex items-center justify-center px-2 py-1 h-auto flex-none border border-transparent text-sm font-medium rounded focus:outline-none disabled:opacity-50`
        case 'big':
          return `${props.disabled ? disabledButtonType[props.type] : buttonType[props.type]} flex items-center justify-center px-4 py-2 h-10 flex-none border border-transparent text-sm font-medium rounded focus:outline-none disabled:opacity-50`
        default:
          return ''
      }
    })

    const buttonRef = ref();
    function getNode() {
      return buttonRef.value
    }

    return{
      buttonSizeStyle,
      buttonRef,
      getNode,
    }
  }
})
</script>



<style lang="scss" scoped>

</style>