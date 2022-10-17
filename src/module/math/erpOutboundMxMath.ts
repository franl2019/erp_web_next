import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {chain, bignumber, round} from 'mathjs';
import {SaleOutboundMxCreateInTableDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreateInTable.dto";

export class ErpOutboundMxMath {

    private outboundMx: SaleOutboundMxCreateInTableDto
    private readonly colField: string;

    constructor(params: ValueSetterParams) {
        this.outboundMx = params.data
        this.colField = params.column.getColId();
    }

    protected countOutQty() {
        this.outboundMx.outqty = Number(
            chain(bignumber(this.outboundMx.bzqty))
                .divide(bignumber(this.outboundMx.packqty))
                .done()
        );
    }

    protected countBzqty() {
        this.outboundMx.bzqty = Number(
            chain(bignumber(this.outboundMx.outqty))
                .multiply(bignumber(this.outboundMx.packqty))
                .done()
        );
    }

    protected countPrice() {
        this.outboundMx.price =
            round(
                Number(
                chain(bignumber(this.outboundMx.netprice))
                    .subtract(bignumber(this.outboundMx.floatprice3))
                    .subtract(bignumber(this.outboundMx.floatprice2))
                    .subtract(bignumber(this.outboundMx.floatprice1))
                    .divide(bignumber(this.outboundMx.agio2))
                    .divide(bignumber(this.outboundMx.agio1))
                    .divide(bignumber(this.outboundMx.agio))
                    .done()
            ), 4)

    }

    protected countNetprice() {
        this.outboundMx.netprice =
            round(
                Number(
                chain(bignumber(this.outboundMx.price))
                    .multiply(bignumber(this.outboundMx.agio))
                    .multiply(bignumber(this.outboundMx.agio1))
                    .multiply(bignumber(this.outboundMx.agio2))
                    .add(bignumber(this.outboundMx.floatprice1))
                    .add(bignumber(this.outboundMx.floatprice2))
                    .add(bignumber(this.outboundMx.floatprice3))
                    .done()
            ), 4)

    }

    protected unCountNetprice() {
        this.outboundMx.netprice =
            round(
                Number(
                chain(bignumber(this.outboundMx.amt))
                    .divide(bignumber(this.outboundMx.priceqty))
                    .done()
            ), 4)
    }

    protected countAmt() {
        this.outboundMx.amt =
            round(
                Number(
                chain(bignumber(this.outboundMx.netprice))
                    .multiply(bignumber(this.outboundMx.priceqty))
                    .done()
            ), 2)
    }

    private setterOutqty() {
        this.countBzqty();
        this.outboundMx.priceqty = this.outboundMx.outqty;
        this.countNetprice();
        this.countAmt();
    }

    private setterBzqty() {
        this.countOutQty();
        this.outboundMx.priceqty = this.outboundMx.outqty;
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

    private setterFloatPrice1() {
        this.countNetprice();
        this.countAmt();
    }

    private setterFloatPrice2() {
        this.countNetprice();
        this.countAmt();
    }

    private setterFloatPrice3() {
        this.countNetprice();
        this.countAmt();
    }

    //计算
    public calculate() {
        switch (this.colField) {
            case "outqty":
                this.setterOutqty();
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
            case "floatprice1":
                this.setterFloatPrice1();
                break;
            case "floatprice2":
                this.setterFloatPrice2()
                break
            case "floatprice3":
                this.setterFloatPrice3();
                break
            default:
                break
        }
    }
}