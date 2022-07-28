import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {ValueGetterParams} from "ag-grid-community";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {IPsiMonthReport} from "@/module/report/psiMonthReport/psiMonthReport";
import {PsiMonthReportService} from "@/module/report/psiMonthReport/psiMonthReport.service";
import {toFixed4} from "@/components/table/valueGetter/toFixed4";

export const defaultPsiMonthReportTableConfig = ref<ITableState<IPsiMonthReport>>({
    tableName: "defaultPsiMonthReportTableConfig",
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

        {headerName: '产品编号', field: 'productcode'},
        {headerName: '产品名称', field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '单位', field: 'unit'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},

        {
            headerName: '上月结余',
            headerClass:'groupTitleClass',
            children: [
                {
                    headerName: '数量',
                    field: 'qty_lastMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return toFixed4(params.data[params.colDef.field!])
                    }
                },
                {
                    headerName: '单价',
                    field: 'weightedAveragePrice_lastMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                },
                {
                    headerName: '金额',
                    field: 'amount_lastMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                }
            ]
        },


        {
            headerName: '本月购进',
            headerClass:'groupTitleClass',
            children: [
                {
                    headerName: '数量',
                    field: 'qty_buy_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return toFixed4(params.data[params.colDef.field!])
                    }
                },
                {
                    headerName: '单价',
                    field: 'price_buy_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                },
                {
                    headerName: '金额',
                    field: 'amount_buy_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                }
            ]
        },

        {
            headerName: '本月发出',
            headerClass:'groupTitleClass',
            children: [
                {
                    headerName: '数量',
                    field: 'qty_saleCost_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return toFixed4(params.data[params.colDef.field!])
                    }
                },
                {
                    headerName: '单价',
                    field: 'price_saleCost_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                },
                {
                    headerName: '金额',
                    field: 'amount_saleCost_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                }
            ]
        },

        {
            headerName: '本月结余',
            headerClass:'groupTitleClass',
            children: [
                {
                    headerName: '数量',
                    field: 'balanceQty_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return toFixed4(params.data[params.colDef.field!])
                    }
                },
                {
                    headerName: '单价',
                    field: 'weightedAveragePrice_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                },
                {
                    headerName: '金额',
                    field: 'balanceAmount_thisMonth',
                    type: 'numericColumn',
                    valueGetter: (params: ValueGetterParams) => {
                        return amountInThousands(toFixed2(params.data[params.colDef.field!]))
                    }
                }
            ]
        }


    ],
    tableService: new PsiMonthReportService(),
})