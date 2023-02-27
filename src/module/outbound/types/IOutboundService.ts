import {sheetCompleteState} from "@/utils/axios";

export interface IOutboundService<DataType> {
    find:(dto:any)=>Promise<DataType[]>;
    findOne:(dto:any)=>Promise<DataType>;
    create:(dto:any)=>Promise<DataType>;
    update:(dto:any)=>Promise<DataType>;
    createAndL1Review:(dto:any)=>Promise<DataType>;
    updateAndL1Review:(dto:any)=>Promise<DataType>;
    l1Review:(outboundId:number)=>Promise<boolean>;
    unL1Review:(outboundId:number)=>Promise<boolean>;
    l2Review:(outboundId:number)=>Promise<boolean>;
    unL2Review:(outboundId:number)=>Promise<boolean>;
    findSheetState:(dto:any)=>Promise<sheetCompleteState>;
    delete_data:(outboundId:number)=>Promise<boolean>
}