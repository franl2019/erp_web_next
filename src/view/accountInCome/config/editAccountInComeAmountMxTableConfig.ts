import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {AccountInComeAmountMxService} from "@/module/accountInCome/accountInComeAmountMx.service";
import Table_renderer_account from "@/components/table/components/renderer/table_renderer_account.vue";
import Table_renderer_currency from "@/components/table/components/renderer/table_renderer_currency.vue";
import Table_select_account from "@/components/table/components/editor/table_select_account_auth.vue";
import Table_select_currency from "@/components/table/components/editor/table_select_currency.vue";
import {onlyNumberValueSetter} from "@/components/table/valueSetter/onlyNumberValueSetter";
import {AccountInComeAmountMxEditMath} from "@/module/accountInCome/math/accountInComeAmountMxEdit.math";


export const editAccountInComeAmountMxTableConfig = ref<ITableState<IAccountInComeAmountMx>>({
    tableName: "editAccountInComeAmountMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
    },
    columnDefaults: [
        {
            rowDrag: true,
            editable: false
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false
        },
        {
            headerName: '出纳账户',
            field: 'accountId',
            cellRendererFramework: Table_renderer_account,
            cellEditorFramework: Table_select_account,
            editable: true
        },
        {
            headerName: '收款金额', field: 'amount', valueSetter: (params) => {
                const isSetter: boolean = onlyNumberValueSetter(params)
                const accountInComeAmountMxEditMath = new AccountInComeAmountMxEditMath(params);
                accountInComeAmountMxEditMath.calculate();
                accountInComeAmountMxEditMath.refreshCells();
                return isSetter
            }, editable: true
        },
        {
            headerName: '币种',
            field: 'currencyid',
            cellRendererFramework: Table_renderer_currency,
            cellEditorFramework: Table_select_currency,
            editable: true
        },
        {
            headerName: '汇率', field: 'exchangeRate',
            valueSetter: (params) => {
                const isSetter: boolean = onlyNumberValueSetter(params)
                const accountInComeAmountMxEditMath = new AccountInComeAmountMxEditMath(params);
                accountInComeAmountMxEditMath.calculate();
                accountInComeAmountMxEditMath.refreshCells();
                return isSetter
            }, editable: true
        },
        {
            headerName: '应收金额', field: 'accountsReceivable',
            valueSetter: (params) => {
                const isSetter: boolean = onlyNumberValueSetter(params)
                const accountInComeAmountMxEditMath = new AccountInComeAmountMxEditMath(params);
                accountInComeAmountMxEditMath.calculate();
                accountInComeAmountMxEditMath.refreshCells();
                return isSetter
            }, editable: true
        },
        {headerName: '付款人', field: 'payer', editable: true},
        {headerName: '付款账户', field: 'paymentAccount', editable: true},
        {headerName: '结算方式', field: 'settlementMethod',editable:true},
        {headerName: '备注', field: 'reMack1', editable: true},
        {headerName: '备注2', field: 'reMack2', editable: true},
        {headerName: '备注3', field: 'reMack3', editable: true},
    ],
    tableService: new AccountInComeAmountMxService(),
})