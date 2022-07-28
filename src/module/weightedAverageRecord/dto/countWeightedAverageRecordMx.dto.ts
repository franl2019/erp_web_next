import {IsDateString} from "class-validator";
import {getStartDate} from "@/utils";

export class CountWeightedAverageRecordMxDto {
    @IsDateString()
    inDate:string = getStartDate()
}