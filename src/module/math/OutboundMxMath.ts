import {bignumber, chain, round} from 'mathjs';
import {SaleOutboundMxCreateInTableDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreateInTable.dto";

export class OutboundMxMath {

    private outboundMx: SaleOutboundMxCreateInTableDto

    constructor(outboundMx: SaleOutboundMxCreateInTableDto) {
        this.outboundMx = outboundMx
    }

    private countOutQty() {
        this.outboundMx.outqty = Number(
            chain(bignumber(this.outboundMx.bzqty))
                .divide(bignumber(this.outboundMx.packqty))
                .done()
        );
    }

    private unCountOutQty() {
        this.outboundMx.outqty = round(
            Number(
                chain(bignumber(this.outboundMx.priceqty))
                    .divide(bignumber(this.outboundMx.otherUnitConversionRate))
                    .done()
            ),4
        )
    }

    private countBzqty() {
        this.outboundMx.bzqty = Number(
            chain(bignumber(this.outboundMx.outqty))
                .multiply(bignumber(this.outboundMx.packqty))
                .done()
        );
    }

    private countPrice() {
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

    private countNetprice() {
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

    private unCountNetprice() {
        this.outboundMx.netprice =
            round(
                Number(
                    chain(bignumber(this.outboundMx.amt))
                        .divide(bignumber(this.outboundMx.priceqty))
                        .done()
                ), 4)
    }

    private countAmt() {
        this.outboundMx.amt =
            round(
                Number(
                    chain(bignumber(this.outboundMx.netprice))
                        .multiply(bignumber(this.outboundMx.priceqty))
                        .done()
                ), 2)
    }

    private countPriceqty() {
        if (this.outboundMx.pricetype === 0) {

            this.outboundMx.priceqty = round(
                Number(
                    chain(bignumber(this.outboundMx.outqty))
                        .multiply(bignumber(this.outboundMx.otherUnitConversionRate))
                        .done()
                ), 4)

        } else if (this.outboundMx.pricetype === 1) {

            this.outboundMx.priceqty =  round(
                Number(
                    chain(bignumber(this.outboundMx.bzqty))
                        .multiply(bignumber(this.outboundMx.otherUnitConversionRate))
                        .done()
                ), 4)
        }
    }

    //计算
    public calculate(colId: string) {
        switch (colId) {
            case "outqty":
                this.countBzqty();
                this.countPriceqty();
                this.countNetprice();
                this.countAmt();
                break
            case "bzqty":
                this.countOutQty();
                this.countPriceqty();
                this.countNetprice();
                this.countAmt();
                break
            case "price":
                this.countNetprice();
                this.countAmt();
                break
            case "agio":
                this.countNetprice();
                this.countAmt();
                break
            case "agio1":
                this.countNetprice();
                this.countAmt();
                break
            case "agio2":
                this.countNetprice();
                this.countAmt();
                break
            case "netprice":
                this.countPrice();
                this.countAmt();
                break
            case "amt":
                this.unCountNetprice();
                this.countPrice();
                break;
            case "floatprice1":
                this.countNetprice();
                this.countAmt();
                break;
            case "floatprice2":
                this.countNetprice();
                this.countAmt();
                break
            case "floatprice3":
                this.countNetprice();
                this.countAmt();
                break
            case "otherUnit":
                this.countPriceqty();
                this.countAmt();
                break
            case "otherUnitConversionRate":
                this.countPriceqty();
                this.countAmt();
                break
            case "priceqty":
                this.unCountOutQty();
                this.countBzqty();
                this.countPriceqty();
                this.countNetprice();
                this.countAmt();
                break
            case "pricetype":
                console.log('pricetype')
                this.countPriceqty();
                this.countNetprice();
                this.countAmt();
                break
            default:
                break
        }
    }
}