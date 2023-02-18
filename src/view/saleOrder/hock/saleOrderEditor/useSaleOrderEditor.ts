import {useSaleOrderEdit} from "@/view/saleOrder/hock/saleOrderEditor/editorModel/useSaleOrderEdit";
import {useSaleOrderCreate} from "@/view/saleOrder/hock/saleOrderEditor/editorModel/useSaleOrderCreate";

export function useSaleOrderEditor(isEditPage: boolean) {
    return isEditPage ?
        useSaleOrderEdit :
        useSaleOrderCreate;
}