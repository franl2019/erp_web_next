import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import PermissionsThemeCreateDialog from "@/view/permissionsTheme/components/permissionsThemeCreateDialog.vue";

export async function usePermissionsThemeCreateDialog() {
    return await erpDialogFactory(PermissionsThemeCreateDialog,{})
}