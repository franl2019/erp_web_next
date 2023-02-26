import {Ref} from "vue";
import {ITableRef} from "@/components/table/type";

export function useErpTable<T>(
    erpTable:Ref<ITableRef | undefined>
) {
    
    async function deleteAllData() {
        await erpTable.value?.getGridApi().setRowData([]);
    }
    
    async function setData(data:T[]) {
        await erpTable.value?.getGridApi().applyTransaction({add: data});
    }
    
    async function selectRow(rowId:number | string) {
        await erpTable.value?.getGridApi().getRowNode(String(rowId))?.setSelected(true);
    }

    async function getSelectedRows():Promise<T[]>{
        const selectRows = await erpTable.value?.getGridApi().getSelectedRows()
        return selectRows !== undefined ? selectRows : []
    }

    async function getSelectedRow() {
        const dataList = await getSelectedRows();
        if(dataList.length > 0){
            return dataList[0]
        }else{
            return null
        }
    }
    
    return{
        deleteAllData,
        setData,
        selectRow,
        getSelectedRows,
        getSelectedRow
    }
    
}