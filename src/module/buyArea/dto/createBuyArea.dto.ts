export interface ICreateBuyAreaDto {
    buyareacode: string;
    buyareaname: string;
    parentid: number;
}

export class CreateBuyAreaDto implements ICreateBuyAreaDto {
    buyareacode: string = "";
    buyareaname: string = "";
    parentid: number = 0;
}