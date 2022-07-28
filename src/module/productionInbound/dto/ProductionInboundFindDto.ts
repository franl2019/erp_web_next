import {IProductionInboundFindDto} from "@/module/productionInbound/types/IProductionInboundService";
import {getEndDate, getStartDate} from "@/utils";

export class ProductionInboundFindDto implements IProductionInboundFindDto {
    warehouseids: number[] = [];
    operateareaids: number[] = [];
    inboundid: number = 0;
    search: string = "";
    page: number = 0;
    pagesize: number = 0;
    startDate: string = getStartDate();
    endDate: string = getEndDate();
    clientid: number = 0;
    inboundcode: string = "";
    inboundtype: number = 2;
    relatednumber: string = "";
}