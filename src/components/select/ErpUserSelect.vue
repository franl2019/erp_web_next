<template>
  <el-select v-bind="$attrs" placeholder="请选择用户">
    <el-option v-for="item in userSelectList" :key="item.userid" :label="item.username" :value="item.userid">
    </el-option>
  </el-select>
</template>

<script lang='ts'>
import {defineComponent, onMounted, ref} from 'vue';
import {IUser} from "@/module/user/user";
import {UserService} from "@/module/user/user.service";
import { ElSelect,ElOption } from 'element-plus';

export default defineComponent({
  name: "ErpUserSelect",
  components:{
    ElSelect,ElOption
  },
  setup(){
    const userSelectList = ref<IUser[]>([]);
    const userService = new UserService();

    onMounted(async () => {
      await getUserList()
    })

    async function getUserList() {
      const user: IUser = {
        userid: 0,
        usertype: 0,
        username: "未选择",
        usercode: "",
        creater: "",
        createdAt: null,
        updater: "",
        updatedAt: null,
        useflag: 0,
      };
      const users = await userService.find();
      users.unshift(user)
      userSelectList.value = [...users]
    }

    return{
      userSelectList
    }

  }
})
</script>

<style scoped>

</style>