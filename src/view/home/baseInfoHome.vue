<template>
  <erp-page-box-row>
    <div class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto">
      <div class="font-bold text-xl mb-2">基础资料设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="warehouse">仓库资料设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="product">商品资料设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="productOtherUnit">辅助单位设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="client">客户资料设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="buy">供应商资料设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="account">出纳账户设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="currency">币种设置</erp-router-button>
        </div>
      </div>
    </div>
  </erp-page-box-row>
</template>

<script lang="ts">
import ErpRouterButton from "@/components/button/ErpRouterButton.vue";
import ErpPageBoxRow from "@/components/page/ErpPageBoxRow.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "baseInfoHome",
  components: {
    ErpRouterButton,
    ErpPageBoxRow,
  },
  setup() {
    return {}
  },
});
</script>