<template>
  <erp-page-box-row>
    <div
        class="flex flex-none flex-col items-start flex-grow pt-3 overflow-auto"
    >
      <div class="font-bold text-xl mb-2">系统设置</div>
      <div class="flex">
        <div class="mr-6">
          <erp-router-button router-name="auth">权限设置</erp-router-button>
        </div>
        <div class="mr-6">
          <erp-router-button router-name="role">用户角色设置</erp-router-button>
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
  name:"systemHome",
  components: {
    ErpRouterButton,
    ErpPageBoxRow,
  },
  setup() {
    return {}
  },
});
</script>
