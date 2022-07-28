<template>
  <erp-page-box>
    <div class="flex-none">
      <erp_title title="权限管理">
        <template v-slot:input>
          <el-select class="md:w-36" v-model="userid" @change="userChange" placeholder="请选择用户">
            <el-option
                v-for="item in userSelectList"
                :key="item.userid"
                :label="item.username"
                :value="item.userid"
            >
            </el-option>
          </el-select>
        </template>
      </erp_title>
    </div>
    <div v-show="userid&&userid!==0" class="flex flex-grow flex-col md:flex-row">
      <div class="flex-none md:w-64 overflow-y-auto md:mr-2 border-solid border border-gray-400">
        <el-tree
            ref="AuthTreeRef"
            :data="authMenuTreeData"
            :props="authTreeConfig"
            node-key="authMenuId"
            :default-expand-all="true"
            :highlight-current="true"
            @node-click="onClickTreeNode"
        />
      </div>
      <div class="flex-grow h-96 md:h-full">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"
                       ></component>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </erp-page-box>
</template>

<script setup lang='ts'>
import Erp_title from "@/components/title/ErpTitle.vue";
import {onMounted, ref} from "vue";
import {UserService} from "@/module/user/user.service";
import {IUser} from "@/module/user/user";
import {useRouter} from "vue-router";
import ErpPageBox from "@/components/page/ErpPageBox.vue";

const router = useRouter();
const AuthTreeRef = ref();
const userid = ref<number>();


const userService = new UserService();
const userSelectList = ref<IUser[]>([]);

const authTreeConfig = {
  children: 'children',
  label: 'authMenuName',
}

interface IAuthMenu {
  authMenuId: number;
  authMenuName: string;
  router: string;
}

interface IAuthMenuTree extends IAuthMenu {
  children?: IAuthMenuTree[];
}

const authMenuTreeData = ref<IAuthMenuTree[]>([
  {
    authMenuId: 1,
    authMenuName: "操作区域",
    router: "/1",
    children: [
      {
        authMenuId: 11,
        authMenuName: "客户操作区域",
        router: "user_client_operatearea_mx"
      },
      {
        authMenuId: 12,
        authMenuName: "供应商操作区域",
        router: "user_buy_operatearea_mx"
      }
    ]
  },
  {
    authMenuId: 2,
    authMenuName: "仓库模块",
    router: "/2",
    children: [
      {
        authMenuId: 21,
        authMenuName: "仓库权限",
        router: "user_warehouse_mx"
      }
    ]
  },
  {
    authMenuId: 3,
    authMenuName: "财务模块",
    router: "/3",
    children: [
      {
        authMenuId: 31,
        authMenuName: "出纳账户权限",
        router: "user_account_mx"
      }
    ]
  },
])

onMounted(async () => {
  userSelectList.value = await userService.find();
})

const selectAuthRouterName = ref<string>("");

function onClickTreeNode(authMenu: IAuthMenuTree) {

    selectAuthRouterName.value = authMenu.router;
    router.push({
      name: authMenu.router,
      query: {
        userid: userid.value
      }
    });

}

function userChange() {
  router.push({
    name: "auth",
  });
}
</script>