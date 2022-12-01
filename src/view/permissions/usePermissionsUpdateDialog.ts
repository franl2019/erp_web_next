import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import {IPermissions} from "@/module/permissions/permissions";
import PermissionsUpdateDialog from "@/view/permissions/permissionsUpdateDialog.vue";


export async function usePermissionsUpdateDialog(permission: IPermissions) {
    await useErpDialogDemo(PermissionsUpdateDialog, {permission})
}