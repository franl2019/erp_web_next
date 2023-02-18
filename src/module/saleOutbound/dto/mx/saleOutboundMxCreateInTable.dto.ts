import {SaleOutboundMxCreateDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreate.dto";
import {IFindInventory} from "@/module/inventory/FindInventory";
import {bignumber, chain, round} from "mathjs";

export class SaleOutboundMxCreateInTableDto extends SaleOutboundMxCreateDto {

    clientcode: string;
    clientname: string;

    warehousename: string;

    productcode: string;
    productname: string;
    materials: string;
    spec: string;
    unit: string;
    packunit: string;
    packqty: number;
    m3: number;
    length: number;
    width: number;
    height: number;

    amt: number;


    constructor() {
        super();
        this.clientcode = "";
        this.clientname = "";
        this.warehousename = "";
        this.productcode = "";
        this.productname = "";
        this.materials = "";
        this.spec = "";
        this.unit = "";
        this.packunit = "";
        this.packqty = 0;
        this.m3 = 0;
        this.length = 0;
        this.width = 0;
        this.height = 0;
        this.amt = 0;
    }

    public selectInventory(inventory: IFindInventory) {
        this.kz_materials = inventory.materials;
        this.kz_materials_d = inventory.materials_d;
        this.kz_productCode = inventory.productcode;
        this.kz_productName = inventory.productname;
        this.kz_remark = inventory.remark;
        this.kz_spec = inventory.spec;
        this.kz_spec_d = inventory.spec_d;

        //!!!
        this.otherUnit = "";
        this.otherUnitConversionRate = 1;


        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
        this.returnGoodsQty = 0;
        this.agio = 1;
        this.agio1 = 1;
        this.agio2 = 1;
        this.bzprice = 0;
        this.floatprice1 = 0;
        this.floatprice2 = 0;
        this.floatprice3 = 0;
        this.inventoryid = 0;
        this.netprice = 0;
        this.outboundid = 0;
        this.price = 0;
        this.pricetype = 0;
        this.printid = 0;
        this.productid = inventory.productid;
        this.materials_d = inventory.materials_d;
        this.spec_d = inventory.spec_d;
        this.batchNo = inventory.batchNo;
        this.remark = inventory.remark;
        this.remarkmx = inventory.remarkmx;
        this.outqty = Number(inventory.qty);
        this.priceqty = Number(inventory.qty);
        this.bzqty = round(
            Number(
                chain(bignumber(inventory.qty))
                    .divide(bignumber(inventory.packqty))
                    .done()
            ), 4);
        //仓库
        this.warehouseid = inventory.warehouseid;
        //客户
        this.clientid = inventory.clientid;
        this.inventoryid = inventory.inventoryid;
        this.productcode = inventory.productcode;
        this.productname = inventory.productname;
        this.clientcode = inventory.clientcode;
        this.clientname = inventory.clientname;
        this.unit = inventory.unit;
        this.spec = inventory.spec;
        this.materials = inventory.materials;
        this.warehousename = inventory.warehousename;
        this.packqty = inventory.packqty;
        this.packunit = inventory.packunit;
        this.m3 = inventory.m3;
        this.length = inventory.length;
        this.width = inventory.width;
        this.height = inventory.height;
        //金额
        this.amt = 0;
        return this
    }
}