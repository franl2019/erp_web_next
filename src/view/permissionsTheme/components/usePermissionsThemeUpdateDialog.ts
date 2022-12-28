import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import PermissionsThemeUpdateDialog from "@/view/permissionsTheme/components/permissionsThemeUpdateDialog.vue";

export async function usePermissionsThemeUpdateDialog(permissionsTheme:IPermissionsTheme):Promise<IPermissionsTheme> {
    return await erpDialogFactory(PermissionsThemeUpdateDialog,{permissionsTheme})
}