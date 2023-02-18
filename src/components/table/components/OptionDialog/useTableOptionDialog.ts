import { erpDialogFactory } from "@/components/dialog/erpDialogFactory";
import ErpTableEditOptionDialog from "@/components/table/components/OptionDialog/ErpTableEditOptionDialog.vue";
import { ITableColumnState } from "@/module/tableColumnState/tableColumnState.service";

export interface IGridCol {
  getGridTableColumnState: () => ITableColumnState[],
  setSnToTableColumnState: (tableColumnStateList: ITableColumnState[]) => ITableColumnState[],
  saveColumnDefine: (tableColumnStates: ITableColumnState[]) => Promise<void>,
  removeColumnDefine: () => Promise<void>
}

export function useTableOptionDialog(option: { gridCol: IGridCol }) {
  return erpDialogFactory(ErpTableEditOptionDialog, option);
}