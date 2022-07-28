import {IsDateString} from "class-validator";
import {getStartDate} from "@/utils";

export class WeightedAverageRecordL1ReviewDto {
    @IsDateString()
    inDate:string = getStartDate()
}