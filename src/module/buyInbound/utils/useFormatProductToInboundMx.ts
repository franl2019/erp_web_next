import {IProduct} from "@/module/product/product";


//[产品资料] 格式化到 [进仓单明细]
export function useFormatProductToInboundMx(product:IProduct,inboundMx:any) {
    inboundMx.productid = product.productid;
    inboundMx.productcode = product.productcode;
    inboundMx.productname = product.productname;
    inboundMx.spec = product.spec;
    inboundMx.materials = product.materials;
    inboundMx.unit = product.unit;
    inboundMx.packqty = product.packqty;
}