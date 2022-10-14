import {IsDateString} from "@/utils/verifyParam/customValidationDecorators";
import {getStartDate} from "@/utils";

export class CountWeightedAverageRecordMxDto {
    @IsDateString()
    inDate:string = getStartDate()
}