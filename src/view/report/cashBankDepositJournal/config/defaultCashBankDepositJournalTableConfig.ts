import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_CodeType from "@/components/table/components/renderer/table_CodeType.vue";
import {ICashBankDepositJournal} from "@/module/report/cashBankDepositJournal/cashBankDepositJournal";
import {CashBankDepositJournalService} from "@/module/report/cashBankDepositJournal/cashBankDepositJournal.service";
import {ValueGetterParams} from "ag-grid-community";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const defaultCashBankDepositJournalTableConfig = ref<ITableConfig<ICashBankDepositJournal>>({
    tableName: "defaultCashBankDepositJournalTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {headerName: '出纳账户编号', field: 'accountCode'},
        {headerName: '出纳账户', field: 'accountName'},
        {headerName: '发生日期', field: 'indate', cellRenderer: Table_Date},
        {headerName: '单据类型', field: 'correlationType',cellRenderer:Table_CodeType},
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '往来单位', field: 'correlationPeople'},
        {headerName: '摘要', field: 'reMark'},
        {
            headerName: '期初', field: 'openQty', type: 'numericColumn', valueGetter: (params: ValueGetterParams) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '收入', field: 'debitQty', type: 'numericColumn', valueGetter: (params: ValueGetterParams) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '支出', field: 'creditQty', type: 'numericColumn', valueGetter: (params: ValueGetterParams) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '账户余额', field: 'balanceQty', type: 'numericColumn', valueGetter: (params: ValueGetterParams) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '相关号码', field: 'relatedNumber'},


    ],
    tableService: new CashBankDepositJournalService(),
})