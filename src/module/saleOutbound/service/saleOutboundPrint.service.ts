export class SaleOutboundPrintService {

    public async find(): Promise<any> {
        return [{
            productcode: '100002',
            productname: "产品名称",
            spec: "规格规格规格规格规格规格规格规",
            materials: "用料"
        }]
    }

}