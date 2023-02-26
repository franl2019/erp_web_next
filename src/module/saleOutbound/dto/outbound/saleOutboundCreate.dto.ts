import {useGetToday} from "@/utils";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {CodeType} from "@/types/CodeType";
import {IsDateString, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {IsDateStringOrNull} from "@/utils/verifyParam/customValidationDecorators/IsDateStringOrNull";

export class SaleOutboundCreateDto implements IOutbound {

    outboundid: number = 0;
    @IsString()
    outboundcode: string = "";
    outboundtype: number = CodeType.XS;
    @IsDateString()
    outdate: string = useGetToday();
    @IsDateStringOrNull()
    deliveryDate: string = "";
    @IsString()
    moneytype: string = "";
    @IsString()
    relatednumber: string = "";
    @IsString()
    remark1: string = "";
    @IsString()
    remark2: string = "";
    @IsString()
    remark3: string = "";
    @IsString()
    remark4: string = "";
    @IsString()
    remark5: string = "";
    printcount: number = 0;
    level1review: number = 0;
    level1name: string = "";
    level1date: Date | null = null;
    level2review: number = 0;
    level2name: string = "";
    level2date: Date | null = null;
    creater: string = "";
    createdAt: Date | null = null;
    updater: string = "";
    updatedAt: Date | null = null;
    operateareaid: number = 0;
    warehouseid: number = 0;
    clientid: number = 0;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";

    clientname: string = "";
}