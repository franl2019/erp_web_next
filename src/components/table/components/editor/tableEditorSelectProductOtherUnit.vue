<template>
  <div class="max-h-9 overflow-hidden border-2 border-solid">
    <el-select
        ref="ElSelectRef"
        placeholder="选择辅助单位"
        v-model="value"
        class="h-10"
        @change="onChange">
      <el-option
          v-for="item in productOtherUnitSelectList"
          :key="item.productOtherUnitName"
          :label="item.productOtherUnitName"
          :value="item"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, unref} from "vue";
import {IProductOtherUnitFind} from "@/module/productOtherUnit/productOtherUnit";
import {ProductOtherUnitService} from "@/module/productOtherUnit/productOtherUnit.service";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {OutboundMxMath} from "@/module/math/OutboundMxMath";

export default defineComponent({
  name: "tableEditorSelectProductOtherUnit",
  props: ["params"],
  setup(props) {
    const productOtherUnitSelectList = ref<IProductOtherUnitFind[]>([]);
    const value = ref('');
    const ElSelectRef = ref();
    const {params} = unref(props);

    onMounted(async () => {
      await getProductOtherUnitList()
      value.value = params.value;
      await nextTick(() => {
        ElSelectRef.value?.focus()
      })
    })

    function getValue() {
      return value.value;
    }

    async function getProductOtherUnitList() {
      const productOtherUnitService = new ProductOtherUnitService();
      const productOtherUnitFindDto = new ProductOtherUnitFindDto();
      productOtherUnitFindDto.productid = props.params.data.productid
      productOtherUnitSelectList.value = await productOtherUnitService.find(productOtherUnitFindDto);
    }

    function onChange(productOtherUnit:IProductOtherUnitFind) {
      props.params.stopEditing();

      props.params.data.otherUnit = productOtherUnit.productOtherUnitName
      props.params.data.otherUnitConversionRate = productOtherUnit.conversionRate
      //为相关的单元格计算
      const outboundMxMath = new OutboundMxMath(props.params.data);
      outboundMxMath.calculate(props.params.column.getColId());

      props.params.api.refreshCells({
        rowNodes: [props.params.node!]
      });

    }

    return {
      productOtherUnitSelectList,
      value,
      ElSelectRef,
      getValue,
      onChange,
    }

  }
})
</script>
