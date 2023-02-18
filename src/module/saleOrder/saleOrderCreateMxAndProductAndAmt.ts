import {SaleOrderCreateMxDto} from "@/module/saleOrder/dto/mx/saleOrderCreateMx.dto";
import {IProduct} from "@/module/product/product";
import {bignumber, chain, round} from "mathjs";
import {ISaleOrderMxAndProductAndAmt} from "@/module/saleOrder/saleOrderMx";

export class SaleOrderCreateMxAndProductAndAmt extends SaleOrderCreateMxDto implements ISaleOrderMxAndProductAndAmt {
    spec: string = "";
    materials: string = "";
    packqty: number = 0;
    unit: string = "";
    packunit: string = ""
    createdAt: Date | null = null;
    creater: string = "";
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    height: number = 0;
    length: number = 0;
    level1date: Date | null = null;
    level1name: string = "";
    level1review: number = 0;
    level2date: Date | null = null;
    level2name: string = "";
    level2review: number = 0;
    m3: number = 0;
    productareaid: number = 0;
    productcode: string = "";
    productname: string = "";
    remark6: string = "";
    remark7: string = "";
    remark8: string = "";
    remark9: string = "";
    remark10: string = "";
    updatedAt: Date | null = null;
    updater: string = "";
    useflag: number = 0;
    warehouseid: number = 0;
    width: number = 0;

    amt:number = 0;

    constructor() {
        super();
    }

    selectedProduct(product:IProduct){
        this.productid = product.productid;
        this.productcode = product.productcode;
        this.productname = product.productname;
        this.packqty = product.packqty;
        this.packunit = product.packunit;
        this.unit = product.unit;
        this.spec = product.spec;
        this.materials = product.materials;
        this.width = product.width;
        this.height = product.height;
        this.m3 = product.m3;
        this.otherUnitConversionRate = 1;

        this.kz_productCode = product.productcode;
        this.kz_productName = product.productname;
        this.kz_materials_d = product.materials;
        this.kz_spec = product.spec;
    }

    setValue(saleOrderMxAndProductAndAmt: ISaleOrderMxAndProductAndAmt) {
        super.setValue(saleOrderMxAndProductAndAmt);
        this.selectedProduct(saleOrderMxAndProductAndAmt);
    }

    private countOutQty() {
        this.outqty = Number(
            chain(bignumber(this.bzqty))
                .divide(bignumber(this.packqty))
                .done()
        );
    }

    private unCountOutQty() {
        this.outqty = round(
            Number(
                chain(bignumber(this.priceqty))
                    .divide(bignumber(this.otherUnitConversionRate))
                    .done()
            ),4
        )
    }

    private countBzqty() {
        this.bzqty = Number(
            chain(bignumber(this.outqty))
                .multiply(bignumber(this.packqty))
                .done()
        );
    }

    private countPrice() {
        this.price =
            round(
                Number(
                    chain(bignumber(this.netprice))
                        .subtract(bignumber(this.floatprice3))
                        .subtract(bignumber(this.floatprice2))
                        .subtract(bignumber(this.floatprice1))
                        .divide(bignumber(this.agio2))
                        .divide(bignumber(this.agio1))
                        .divide(bignumber(this.agio))
                        .done()
                ), 4)

    }

    private countNetprice() {
        this.netprice =
            round(
                Number(
                    chain(bignumber(this.price))
                        .multiply(bignumber(this.agio))
                        .multiply(bignumber(this.agio1))
                        .multiply(bignumber(this.agio2))
                        .add(bignumber(this.floatprice1))
                        .add(bignumber(this.floatprice2))
                        .add(bignumber(this.floatprice3))
                        .done()
                ), 4)
    }

    private unCountNetprice() {
        this.netprice =
            round(
                Number(
                    chain(bignumber(this.amt))
                        .divide(bignumber(this.priceqty))
                        .done()
                ), 4)
    }

    private countAmt() {
        this.amt =
            round(
                Number(
                    chain(bignumber(this.netprice))
                        .multiply(bignumber(this.priceqty))
                        .done()
                ), 2)
    }

    private countPriceqty() {
        if (this.pricetype === 0) {

            this.priceqty = round(
                Number(
                    chain(bignumber(this.outqty))
                        .multiply(bignumber(this.otherUnitConversionRate))
                        .done()
                ), 4)

        } else if (this.pricetype === 1) {

            this.priceqty =  round(
                Number(
                    chain(bignumber(this.bzqty))
                        .multiply(bignumber(this.otherUnitConversionRate))
                        .done()
                ), 4)
        }
    }

    //重新计算列
    public recountCol(colId: string) {
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
                this.countPriceqty();
                this.countNetprice();
                this.countAmt();
                break
            default:
                break
        }
    }
}