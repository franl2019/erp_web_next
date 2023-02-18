import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {bignumber, chain, round} from 'mathjs';

export class AccountInComeAmountMxEditMath {

    private accountInComeAmountMx: IAccountInComeAmountMx;
    private params: ValueSetterParams;

    constructor(params: ValueSetterParams) {
        this.accountInComeAmountMx = params.data;
        this.params = params
    }

    //计算
    public calculate() {
        const colId = this.params.column.getColId()
        switch (colId) {
            case 'amount':
                this.amount_calculate();
                break;
            case 'exchangeRate':
                this.exchangeRate_calculate();
                break;
            case 'accountsReceivable':
                this.accountsReceivable_calculate();
                break;
            default:
                break
        }
    }

    public refreshCells() {
        //刷新本行
        this.params.api.refreshCells({
            rowNodes: [this.params.node!]
        });
    }

    //金额计算
    private amount_calculate() {
        this.accountInComeAmountMx.accountsReceivable =
            round(
                Number(
                    chain(bignumber(this.accountInComeAmountMx.amount))
                        .multiply(bignumber(this.accountInComeAmountMx.exchangeRate))
                        .done()
                )
                , 4)
    }

    //汇率计算
    private exchangeRate_calculate() {
        this.accountInComeAmountMx.accountsReceivable =
            round(
                Number(
                    chain(bignumber(this.accountInComeAmountMx.amount))
                        .multiply(bignumber(this.accountInComeAmountMx.exchangeRate))
                        .done()
                )
                , 4);
    }

    //应收账款金额计算
    private accountsReceivable_calculate() {
        this.accountInComeAmountMx.amount =
            round(
                Number(
                    chain(bignumber(this.accountInComeAmountMx.accountsReceivable))
                        .divide(bignumber(this.accountInComeAmountMx.exchangeRate))
                        .done()
                )
                , 4);

    }
}