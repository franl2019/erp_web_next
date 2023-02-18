export interface IFindBuyDto {
    buyareaid: number;
    search: string;
    page: number;
    pagesize: number;
    useflag:number;
}

export class FindBuyDto implements IFindBuyDto{
    buyareaid: number = 0;
    search: string = "";
    page: number = 0;
    pagesize: number = 0;
    useflag:number = 1;
}