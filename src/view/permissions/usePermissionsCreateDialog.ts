import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import PermissionsCreateDialog from "@/view/permissions/permissionsCreateDialog.vue";


export async function usePermissionsCreateDialog() {
    await erpDialogFactory(PermissionsCreateDialog,{})
}