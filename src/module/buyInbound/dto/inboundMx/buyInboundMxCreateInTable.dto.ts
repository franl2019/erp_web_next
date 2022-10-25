import {BuyInboundMxCreateDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxCreate.dto";
import {IBuyInboundMxInTable} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxInTable";
import {IProduct} from "@/module/product/product";

export class BuyInboundMxCreateInTableDto extends BuyInboundMxCreateDto implements IBuyInboundMxInTable {

    packqty: number;
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    amt: number;

    constructor() {
        super();
        this.packqty = 1;
        this.productcode = "";
        this.productname = "";
        this.spec = "";
        this.materials = "";
        this.unit = "";
        this.amt = 0;
    }

    public setProductToMx(product: IProduct) {
        super.setProductToMx(product);
        this.productcode = product.productcode;
        this.productname = product.productname;
        this.spec = product.spec;
        this.materials = product.materials;
        this.unit = product.unit;
        this.packqty = product.packqty;
        return this
    }

    //[产品资料] 格式化到 [进仓单明细]
    public static useFormatProductToInboundMx(product:IProduct,inboundMx:IBuyInboundMxInTable) {
        inboundMx.productid = product.productid;
        inboundMx.productcode = product.productcode;
        inboundMx.productname = product.productname;
        inboundMx.spec = product.spec;
        inboundMx.materials = product.materials;
        inboundMx.unit = product.unit;
        inboundMx.packqty = product.packqty;
    }
}