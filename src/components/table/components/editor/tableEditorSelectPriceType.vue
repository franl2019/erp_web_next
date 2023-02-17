<template>
  <el-select ref="ElSelectRef" v-model="value"  @change="onChange">
    <el-option
        v-for="item in priceTypeList"
        :key="item.typeId"
        :label="item.typeName"
        :value="item.typeId"
    >
    </el-option>
  </el-select>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, unref} from 'vue';
import {OutboundMxMath} from "@/module/math/OutboundMxMath";

export default defineComponent({
  name: "tableEditorSelectPriceType",
  props: ["params"],
  setup(props) {
    const priceTypeList = ref([{
      typeName:"按件计价",
      typeId:0
    },{
      typeName:"按包计价",
      typeId:1
    }]);
    const value = ref(0);
    const {params} = unref(props);
    const ElSelectRef = ref();

    onMounted(async () => {
      value.value = params.value;
      await nextTick(()=>{
        ElSelectRef.value?.focus()
      })
    })

    function getValue() {
      // this simple editorModel doubles any value entered into the input
      return value.value;
    }

    function onChange(pricetype:0|1) {
      props.params.stopEditing();

      props.params.data.pricetype =  pricetype
      //为相关的单元格计算
      const outboundMxMath = new OutboundMxMath(props.params.data);
      outboundMxMath.calculate(props.params.column.getColId());

      props.params.api.refreshCells({
        rowNodes: [props.params.node!]
      });

    }


    return{
      getValue,
      onChange,
      value,
      ElSelectRef,
      priceTypeList,
    }


  }
})
</script>

