<template>
  <div class="">
    <!--  <div @click="test">123</div>-->
    <table class="ttt pageWidth">
      <colgroup>
        <col width="180">
        <col width="180">
        <col width="250">
      </colgroup>
      <thead class="head">
      <tr>
        <td colspan="4">
          <div class="flex flex-col">
            <div class="text-center font-bold">佛山市建华技术有限公司出货单-送货</div>
            <div class="flex flex-wrap space-x-2">
              <div>客户:美的家电分部</div>
              <div>仓库:成品仓</div>
              <div>开单日期:2021-07-13</div>
              <div>单号:A-XS-21000000000</div>
              <div>地址:乐从镇道教村北街一巷9号</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="t_border">产品编号</td>
        <td class="t_border">产品编号</td>
        <td class="t_border">产品编号</td>
        <td class="t_border">产品编号</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product,i) in data" :key="i" class="row">
        <td class="t_border">{{ product.productcode }}</td>
        <td class="t_border">{{ product.productname }}</td>
        <td class="t_border">{{ product.spec }}</td>
        <td class="t_border">{{ product.materials }}</td>
      </tr>
      </tbody>
      <tfoot class="foot">
      <tr>
        <td colspan="4">
          <div>
            <div class="pageSize">第几页共几页</div>
            <div class="h-16 w-full p-1 border border-solid border-black">最新消息:</div>
            <div class="">制单人:张建华</div>

          </div>
        </td>
      </tr>
      </tfoot>
    </table>

    <div class="page">2</div>

    <div v-for="(item,j) in dataList" :key="j" class="page flex justify-center">
      <table>
        <colgroup>
          <col width="180">
          <col width="180">
          <col width="250">
        </colgroup>
        <thead>
        <tr>
          <td colspan="4">
            <div class="flex flex-col">
              <div class="text-center font-bold">佛山市建华技术有限公司出货单-送货</div>
              <div class="flex flex-wrap space-x-2">
                <div>客户:美的家电分部</div>
                <div>仓库:成品仓</div>
                <div>开单日期:2021-07-13</div>
                <div>单号:A-XS-21000000000</div>
                <div>地址:乐从镇道教村北街一巷9号</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="t_border">产品编号</td>
          <td class="t_border">产品编号</td>
          <td class="t_border">产品编号</td>
          <td class="t_border">产品编号</td>
        </tr>
        </thead>


        <tbody>
        <tr v-for="(product,i) in item" :key="i" class="row">
          <td class="t_border">{{ product.productcode }}</td>
          <td class="t_border">{{ product.productname }}</td>
          <td class="t_border">{{ product.spec }}</td>
          <td class="t_border">{{ product.materials }}</td>
        </tr>
        </tbody>

        <tfoot>
        <tr>
          <td colspan="4">
            <div>
              <div class="pageSize">第{{j+1}}页共{{dataList.length}}页</div>
              <div class="h-16 w-full p-1 border border-solid border-black">最新消息:</div>
              <div class="">制单人:张建华</div>

            </div>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";
import {SaleOutboundPrintService} from "@/module/saleOutbound/service/saleOutboundPrint.service";
import {VerifyParamError} from "@/types/error/verifyParamError";
onMounted(async () => {
  await nextTick(async () => {
    data.value = await new SaleOutboundPrintService().find();
  })
  await test()
  // window.print();
})


const row = ref(50)
const rowHeightList: number[] = []
const data = ref([])

const dataList = ref<any[][]>([])

async function test() {
  const childNodes = document.getElementsByClassName('row')
  for (let i = 0; i < childNodes.length; i++) {
    const childNode = (childNodes[i] as HTMLElement);
    rowHeightList.push(childNode.offsetHeight);
  }
  const pageHeight = (document.getElementsByClassName('page')[0] as HTMLElement).clientHeight || 0;
  const headHeight = (document.getElementsByClassName('head')[0] as HTMLElement).offsetHeight || 0;
  const footHeight = (document.getElementsByClassName('foot')[0] as HTMLElement).offsetHeight || 0;

  const bodyHeight = pageHeight - headHeight - footHeight;
  dataList.value = await calculate(bodyHeight, rowHeightList, data.value)

  const ttt = document.getElementsByClassName('ttt')
  ttt[0].parentNode!.removeChild(ttt[0])
  const bbb = document.getElementsByClassName('page')
  bbb[0].parentNode!.removeChild(bbb[0])
}

function calculate(pageHeight: number, rowHeightList: number[], data: any[]) {
  console.log(rowHeightList)
  if (pageHeight === 0) {
    return Promise.reject(new VerifyParamError("页面高度不能为0"))
  }

  if (rowHeightList.length !== data.length) {
    return Promise.reject(new VerifyParamError("计量数组数量不相等"))
  }

  let nowPageHeight: number = 0
  let dataList: any[][] = [[]];
  let index: number = 0
  for (let i = 0; i < rowHeightList.length; i++) {
    const rowHeight = rowHeightList[i];
    console.log(pageHeight, nowPageHeight, rowHeight)
    //如果大于页面高度
    nowPageHeight = nowPageHeight + rowHeight
    if (pageHeight >= nowPageHeight) {
      dataList[index].push(data[i])
    } else {
      nowPageHeight = rowHeight
      index = index + 1
      dataList.push([data[i]])
    }
  }

  console.dir(dataList)

  return dataList
}
</script>

<style lang="scss">

* {
  font-size: 14px;
  line-height: 1.25rem;
}

body {
  width: 210mm;
  height: 140mm;
  margin: 0;
  padding: 0;
}

.pageWidth{
  width: 210mm;

}


table {
  border-collapse: collapse;
  width: 207mm;
}

.t_border {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.row {
  break-inside: avoid;
  word-wrap: break-word;
}

.page {
  break-after: page;
  width: 210mm;
  height: 130mm;
}


</style>