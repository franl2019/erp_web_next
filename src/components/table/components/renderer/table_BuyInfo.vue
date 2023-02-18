<template>
  <el-popover
      placement="right"
      transition=""
      trigger="click"
      width="20rem"
  >
    <template #default>
      <div class="w-full pl-3 pr-2 py-2">
        <div class="font-bold text-base mb-2 space-x-0.5">供应商信息</div>
        <div class="flex">
          <div class="flex-col flex-none text-right mr-4 space-y-0.5">
            <div>编号:</div>
            <div>名称:</div>
            <div>业务员:</div>
            <div>销售人:</div>
            <div>电话:</div>
            <div>地址:</div>
            <div>应付账款:</div>
            <div>预付账款:</div>
          </div>
          <div class="flex-col flex-grow w-full space-y-0.5">
            <div>{{ buy.buycode }}</div>
            <div>{{ buy.buyname }}</div>
            <div>{{ buy.ymrep ? buy.ymrep : '无' }}</div>
            <div>{{ buy.salesman ? buy.salesman : '无' }}</div>
            <div>{{ buy.phone_no ? buy.phone_no : '无' }}</div>
            <div>{{ buy.address ? buy.address : '无' }}</div>
            <div>{{ '0.00' }}</div>
            <div>{{ '0.00' }}</div>
          </div>
        </div>
        <div class="flex flex-row-reverse">
          <div class="hover:underline hover:text-indigo-600 text-indigo-500 cursor-pointer">更多信息</div>
        </div>
      </div>
    </template>
    <template #reference>
      <div
          ref="buttonRef"
          class="hover:underline hover:text-indigo-600"
          @click="onClickTitle"
      >{{ params.value }}
      </div>
    </template>
  </el-popover>

</template>

<script lang='ts'>
import {defineComponent, ref} from "vue";
import {BuyService} from "@/module/buy/buy.service";
import {IBuy} from "@/module/buy/buy";

export default defineComponent({
  name: "TableBuyInfo",
  props:["params"],
  setup(props) {
    const buttonRef = ref();
    const buy = ref<IBuy>({
      accountspayabletype: 0,
      address: "",
      buyareaid: 0,
      buycode: "",
      buyid: 0,
      buyname: "",
      contactperson: "",
      createdAt: null,
      creater: "",
      del_uuid: 0,
      deleteAt: null,
      deleter: "",
      email: "",
      level1date: null,
      level1name: "",
      level1review: 0,
      level2date: null,
      level2name: "",
      level2review: 0,
      moneytype: "",
      operateareaid: 0,
      phone_no: "",
      remark1: "",
      remark10: "",
      remark2: "",
      remark3: "",
      remark4: "",
      remark5: "",
      remark6: "",
      remark7: "",
      remark8: "",
      remark9: "",
      salesman: "",
      tel_no: "",
      updatedAt: null,
      updater: "",
      useflag: 0,
      ymrep: ""
    })

    async function onClickTitle() {
      const buyService = new BuyService();
      const buyid = props.params.data["buyid"]
      if (buyid) {
        buy.value = await buyService.findOne(buyid);
      } else {
        console.log("无")
      }
    }

    return {
      buttonRef,
      buy,
      onClickTitle,
    };
  },
});
</script>
