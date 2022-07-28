<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl">仓库管理流程图</div>

      <div class="flex h-4/6 w-full items-center justify-center">
        <module-card title="库存查询" @click="openInventoryView">
          <module-card-item content="超最大库存数" :count="11"></module-card-item>
          <module-card-item content="超最小库存数" :count="4"></module-card-item>
        </module-card>
<!--        <erp_button_big></erp_button_big>-->
      </div>
      <div class="w-full border-t border-solid border-gray-300 pt-2"></div>
      <div class="font-bold text-xl mb-1">相关设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="warehouse">仓库资料设置</erp-router-button>
        </div>

        <div class="mr-6">
          <erp-router-button router-name="product">商品资料设置</erp-router-button>
        </div>
      </div>
    </div>
    <div class="w-64 flex-none border-l border-solid pl-2">
      <erp_title title="账簿报表"></erp_title>
      <div class="mb-5">
        <div class="font-bold">库存报表</div>
        <erp-router-button router-name="">
          商品收发明细表
        </erp-router-button>
        <erp-router-button router-name="psiMonthReport">
          商品收发汇总表
        </erp-router-button>
      </div>
    </div>
  </erp-page-box-row>
</template>

<script lang="ts" setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import ModuleCard from "@/components/card/moduleCard/moduleCard.vue";
import ModuleCardItem from "@/components/card/moduleCard/moduleCardItem.vue";
import {useRouter} from "vue-router";
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import {useRouterPage} from "@/utils";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
const router = useRouter();

function openInventoryView() {
 const route = router.resolve({
   name:'inventory'
 })
  useRouterPage(route.fullPath,route.meta.title as string);
}
</script>