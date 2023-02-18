import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import UserRoleMxCreateDialog from "@/view/auth/userRoleMx/userRoleMxCreateDialog.vue";



export async function useUserRoleMxCreateDialog(roleId:number) {
    await erpDialogFactory(UserRoleMxCreateDialog,{roleId})
}