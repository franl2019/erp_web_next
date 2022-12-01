import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import PermissionsCreateDialog from "@/view/permissions/permissionsCreateDialog.vue";


export async function usePermissionsCreateDialog() {
    await useErpDialogDemo(PermissionsCreateDialog,{})
}