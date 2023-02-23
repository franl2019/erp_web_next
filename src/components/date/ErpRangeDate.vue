<template>
  <el-date-picker
      v-model="findDate"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      range-separator="-"
      type="daterange"
      value-format="YYYY-MM-DD HH:mm:ss"
      unlink-panels
      :shortcuts="shortcuts"
      @change="change"
  ></el-date-picker>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  useGetEndDate,
  useGetLastMonthEndDate,
  useGetLastMonthStartDate, useGetLastYearEndDate, useGetLastYearStartDate,
  useGetStartDate, useGetThisYearEndDate,
  useGetThisYearStartDate
} from "@/utils";
import {ElDatePicker} from 'element-plus'
export default defineComponent({
  name: "ErpRangeDate",
  components:{
    ElDatePicker
  },
  props:{
    startDate:String,
    endDate:String,
  },
  emits:['update:startDate','update:endDate','change'],
  setup(props,{emit}) {
    const findDate = ref([props.startDate,props.endDate])

    const shortcuts = [
      {
        text: '上月',
        value: [useGetLastMonthStartDate(), useGetLastMonthEndDate()],
      },
      {
        text: '本月',
        value: [useGetStartDate(), useGetEndDate()],
      },
      {
        text: '上月到本月',
        value: [useGetLastMonthStartDate(), useGetEndDate()],
      },
      {
        text: '本年',
        value: () => {
          return [useGetThisYearStartDate(), useGetThisYearEndDate()]
        },
      },
      {
        text: '上年',
        value: () => {
          return [useGetLastYearStartDate(), useGetLastYearEndDate()]
        },
      },
    ]

    async function change() {
     await emit('update:startDate',findDate.value[0])
     await emit('update:endDate',findDate.value[1])
     await emit('change')
    }
    return {
      change,
      findDate,
      shortcuts
    }
  }
});
</script>