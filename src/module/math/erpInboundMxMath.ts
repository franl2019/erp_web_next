import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {bignumber, chain, round} from 'mathjs';
import {IProductionInboundMxTableData} from "@/module/productionInbound/types/IProductionInboundMxTableData";

export class ErpInboundMxMath {

    private inboundMx: IProductionInboundMxTableData
    private readonly colField: string;

    constructor(params: ValueSetterParams) {
        this.inboundMx = params.data
        this.colField = params.column.getColId();
    }

    public calculate() {
        switch (this.colField) {
            case "inqty":
                this.setterInqty();
                break
            case "bzqty":
                this.setterBzqty();
                break
            case "price":
                this.setterPrice();
                break
            case "agio":
                this.setterAgio();
                break
            case "agio1":
                this.setterAgio1();
                break
            case "agio2":
                this.setterAgio2();
                break
            case "netprice":
                this.setterNetprice();
                break
            case "amt":
                this.setterAmt();
                break;
            default:
                break
        }
    }

    protected countInqty() {
        this.inboundMx.inqty = Number(
            chain(bignumber(this.inboundMx.bzqty))
                .divide(bignumber(this.inboundMx.packqty))
                .done()
        );
    }

    protected countBzqty() {
        this.inboundMx.bzqty = Number(
            chain(bignumber(this.inboundMx.inqty))
                .multiply(bignumber(this.inboundMx.packqty))
                .done()
        );
    }

    protected countPrice() {
        this.inboundMx.price =
            round(Number(
                chain(bignumber(this.inboundMx.netprice))
                    .divide(bignumber(this.inboundMx.agio2))
                    .divide(bignumber(this.inboundMx.agio1))
                    .divide(bignumber(this.inboundMx.agio))
                    .done()
            ), 4)

    }

    protected countNetprice() {
        this.inboundMx.netprice =
            round(
                Number(
                    chain(bignumber(this.inboundMx.price))
                        .multiply(bignumber(this.inboundMx.agio))
                        .multiply(bignumber(this.inboundMx.agio1))
                        .multiply(bignumber(this.inboundMx.agio2))
                        .done()
                ), 4)
    }

    protected unCountNetprice() {
        this.inboundMx.netprice =
            round(
                Number(
                    chain(bignumber(this.inboundMx.amt))
                        .divide(bignumber(this.inboundMx.priceqty))
                        .done()
                ), 4);
    }

    protected countAmt() {
        this.inboundMx.amt =
            round(
                Number(
                    chain(bignumber(this.inboundMx.netprice))
                        .multiply(bignumber(this.inboundMx.priceqty))
                        .done()
                ), 2);
    }

    private setterInqty() {
        this.countBzqty();
        this.inboundMx.priceqty = this.inboundMx.inqty;
        this.countNetprice();
        this.countAmt();
    }

    private setterBzqty() {
        this.countInqty();
        this.inboundMx.priceqty = this.inboundMx.inqty;
        this.countNetprice();
        this.countAmt();
    }

    private setterPrice() {
        this.countNetprice();
        this.countAmt();
    }

    private setterAgio() {
        this.countNetprice();
        this.countAmt();
    }

    private setterAgio1() {
        this.countNetprice();
        this.countAmt();
    }

    private setterAgio2() {
        this.countNetprice();
        this.countAmt();
    }

    private setterNetprice() {
        this.countPrice();
        this.countAmt();
    }

    private setterAmt() {
        this.unCountNetprice();
        this.countPrice();
    }
}