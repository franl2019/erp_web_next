import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import PermissionsThemeCreateDialog from "@/view/permissionsTheme/components/permissionsThemeCreateDialog.vue";

export async function usePermissionsThemeCreateDialog() {
    return await useErpDialogDemo(PermissionsThemeCreateDialog,{})
}