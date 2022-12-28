<template>
  <div v-show="!props.disabled" class="flex rounded-md shadow-sm">
    <ErpInputRound :value="props.clientname ? props.clientname :'请选择客户'"
           class="flex-1 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
           disabled
           placeholder="" type="text"></ErpInputRound>
    <button
        v-if="props.clientname.length===0"
        class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm active:bg-gray-100 focus:outline-none"
        @click="clickedSelect"
    >
      选择
    </button>
    <button
        v-else
        class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-red-500 text-white text-sm active:bg-red-600 focus:outline-none"
        @click="clickedUnSelect"
    >
      取消选择
    </button>
  </div>
  <erp-input-round v-show="props.disabled" v-model="props.clientname" disabled></erp-input-round>
</template>

<script lang='ts'>
import {useErpSelectClientDialog} from "@/components/dialog/selectInfo/client";
import {IClient} from "@/module/client/client";
import useErpDialog from "@/components/dialog/useErpDialog";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name:"ErpSelectClientBtn",
  components:{
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
  setup(props, {emit: emits}) {

    function clickedSelect() {
      useErpSelectClientDialog({
        ok: (client: IClient) => {
          emits('select', client);
        }
      })
    }

    function clickedUnSelect() {
      if (props.unSelectSure) {
        useErpDialog({
          title: "注意",
          message: "取消选择客户将会清空单据明细！",
          ok: () => {
            emits('unSelect');
          }
        })
      } else {
        emits('unSelect');
      }
    }

    return {
      props,
      clickedSelect,
      clickedUnSelect,
    };
  },
});
</script>