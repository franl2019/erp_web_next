import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import UserRoleMxCreateDialog from "@/view/auth/userRoleMx/userRoleMxCreateDialog.vue";



export async function useUserRoleMxCreateDialog(roleId:number) {
    await useErpDialogDemo(UserRoleMxCreateDialog,{roleId})
}