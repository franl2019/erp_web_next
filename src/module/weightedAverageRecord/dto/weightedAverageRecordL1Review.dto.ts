import {IsDateString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetStartDate} from "@/utils";

export class WeightedAverageRecordL1ReviewDto {
    @IsDateString()
    inDate:string = useGetStartDate()
}