import {SaleOutboundMxCreateDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreate.dto";
import {IFindInventory} from "@/module/inventory/FindInventory";
import {bignumber, chain, round} from "mathjs";

export class SaleOutboundMxCreateInTableDto extends SaleOutboundMxCreateDto {

    warehousename: string;
    clientcode: string;
    clientname: string;
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

    constructor(inventory: IFindInventory) {
        super({
            agio: 1,
            agio1: 1,
            agio2: 1,
            bzprice: 0,
            floatprice1: 0,
            floatprice2: 0,
            floatprice3: 0,
            inventoryid:0,
            netprice: 0,
            outboundid: 0,
            price: 0,
            pricetype: 0,
            printid: 0,
            productid: inventory.productid,
            materials_d: inventory.materials_d,
            spec_d: inventory.spec_d,
            remark: inventory.remark,
            remarkmx: inventory.remarkmx,
            outqty: Number(inventory.qty),
            priceqty: Number(inventory.qty),
            bzqty: round(
                Number(
                    chain(bignumber(inventory.qty))
                        .divide(bignumber(inventory.packqty))
                        .done()
                ), 4),
            //仓库
            warehouseid: inventory.warehouseid,
            //客户
            clientid: inventory.clientid

        });
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

    }
}