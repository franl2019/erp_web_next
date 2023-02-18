import {BuyInboundMxUpdateDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxUpdate.dto";
import {IBuyInboundMxInTable} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxInTable";

export class BuyInboundMxUpdateInTableDto extends BuyInboundMxUpdateDto implements IBuyInboundMxInTable{
    amt: number;
    materials: string;
    packqty: number;
    productcode: string;
    productname: string;
    spec: string;
    unit: string;

    constructor(buyInboundMxInTable:IBuyInboundMxInTable) {
        super(buyInboundMxInTable);
        this.amt = buyInboundMxInTable.amt;
        this.materials = buyInboundMxInTable.materials;
        this.packqty = buyInboundMxInTable.packqty;
        this.productcode = buyInboundMxInTable.productcode;
        this.productname = buyInboundMxInTable.productname;
        this.spec = buyInboundMxInTable.spec;
        this.unit = buyInboundMxInTable.unit;
    }
}