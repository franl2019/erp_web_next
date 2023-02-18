export interface IUpdateBuyAreaDto {
    buyareaid:number;
    buyareacode: string;
    buyareaname: string;
    parentid: number;
}

export class UpdateBuyAreaDto implements IUpdateBuyAreaDto{
    buyareacode: string = "";
    buyareaid: number = 0;
    buyareaname: string = "";
    parentid: number = 0;
}