<template>
  <div class="text-left col-span-8" :class="mdFormItemStyle + ' ' + lgFormItemStyle">
    <label :class="labelForNameStyle">
      {{ props.name }}
    </label>
    <div class="w-full max-h-10">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, PropType, ref } from "vue";

export default defineComponent({
  name:"ErpFormItem",
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: null as any as PropType<"info" | "danger">,
      default: 'info',
    },
    mdCol: {
      type: String,
      default: "8",
    },
    lgCol: {
      type: String,
      default: "8",
    },
  },
  setup(props) {
    const mdFormItemStyle = ref('md:col-span-8');
    const lgFormItemStyle = ref('lg:col-span-8');

    onMounted(() => {
      setMdFormItemStyle(props.mdCol)
      setLgFormItemStyle(props.lgCol)
    })

    function setMdFormItemStyle(n: string) {
      switch (n) {
        case '1':
          mdFormItemStyle.value = 'md:col-span-1'
          break
        case '2':
          mdFormItemStyle.value = 'md:col-span-2'
          break
        case '4':
          mdFormItemStyle.value = 'md:col-span-4'
          break
        case '8':
          mdFormItemStyle.value = 'md:col-span-8'
          break
      }
    }

    function setLgFormItemStyle(n: string) {
      switch (n) {
        case '1':
          lgFormItemStyle.value = 'lg:col-span-1'
          break
        case '2':
          lgFormItemStyle.value = 'lg:col-span-2'
          break
        case '4':
          lgFormItemStyle.value = 'lg:col-span-4'
          break
        case '8':
          lgFormItemStyle.value = 'lg:col-span-8'
          break
      }
    }

    const labelForNameStyle = `text-sm ${props.type === 'danger' ? 'text-red-600 font-bold' : ''}`
    return {
      props,
      mdFormItemStyle,
      lgFormItemStyle,
      labelForNameStyle,
    };
  },
});
</script>