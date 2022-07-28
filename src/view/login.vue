<template>
  <erp-loading></erp-loading>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img alt="logo" class="mx-auto h-16 w-auto"
             src="@/assets/logo.svg">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          请登录您的账号
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onLoginSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <erp-input v-model="user.usercode" class="rounded-t-md" placeholder="账号" required type="email"></erp-input>
          <erp-input v-model="user.password" class="rounded-b-md" placeholder="密码" required type="password"></erp-input>
        </div>

        <div class="flex items-center justify-between">
          <erp-checkbox class="flex-none">记住密码</erp-checkbox>
          <div class="text-sm flex-none">
            <a class="font-medium text-indigo-600 hover:text-indigo-500" href="#">
              忘记密码？
            </a>
          </div>
        </div>

        <div>
          <erp-button class="w-full" type="login">登录</erp-button>
        </div>
      </form>


<!--      <erp-router-button router-name="test">测试</erp-router-button>-->
    </div>
  </div>


</template>

<script lang='ts' setup>
import ErpButton from "../components/button/ErpButton.vue";
import ErpCheckbox from "../components/button/ErpCheckbox.vue";
import ErpInput from "../components/input/ErpInput.vue";
import {useRouter} from "vue-router";
import {Auth, IAuth} from "@/module/auth/login";
import {reactive} from "vue";
import ErpLoading from "@/components/loading/ErpLoading.vue";
const router = useRouter();

const user: IAuth = reactive({
  usercode: "",
  password: ""
})

async function onLoginSubmit() {
  const auth = new Auth(user)
  await auth.login();
  await router.push({name: "controlHome"})
}
</script>