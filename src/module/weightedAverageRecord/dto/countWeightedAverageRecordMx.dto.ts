import {IsDateString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetStartDate} from "@/utils";

export class CountWeightedAverageRecordMxDto {
    @IsDateString()
    inDate:string = useGetStartDate()
}