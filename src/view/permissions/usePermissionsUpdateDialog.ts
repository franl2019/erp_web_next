import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IPermissions} from "@/module/permissions/permissions";
import PermissionsUpdateDialog from "@/view/permissions/permissionsUpdateDialog.vue";


export async function usePermissionsUpdateDialog(permission: IPermissions) {
    await erpDialogFactory(PermissionsUpdateDialog, {permission})
}