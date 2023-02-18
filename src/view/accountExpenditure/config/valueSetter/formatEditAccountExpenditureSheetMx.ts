import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import useErpDialog from "@/components/dialog/useErpDialog";

export function formatEditAccountExpenditureSheetMx(params: ValueSetterParams): boolean {
        const colId:string = params.column.getColId()

        if(isNaN(Number(params.newValue)) || Number(params.newValue) < 0){
            return false
        }

        switch (colId) {
            case 'amountsThisVerify':
                if(params.data.amountsNotVerify < params.data.amountsMantissa + Number(params.newValue)){
                    useErpDialog({
                        title:'错误',
                        message:`'未核销金额' 不能大于 '冲尾数金额' 和 '本次核销金额' 的合计`,
                        closeBtnVisible:false
                    })
                    return false
                }
                break;
            case 'amountsMantissa':
                if(params.data.amountsNotVerify < params.data.amountsMantissa + Number(params.newValue)){
                    useErpDialog({
                        title:'错误',
                        message:`'未核销金额' 不能大于 '冲尾数金额' 和 '本次核销金额' 的合计`,
                        closeBtnVisible:false
                    })
                    return false
                }
                break;
            default:
                break;
        }

        //给单元格赋值
        params.data[colId] = Number(params.newValue);


    return false
}