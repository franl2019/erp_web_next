import {IsDateString} from "@/utils/verifyParam/customValidationDecorators";
import {getStartDate} from "@/utils";

export class WeightedAverageRecordL1ReviewDto {
    @IsDateString()
    inDate:string = getStartDate()
}