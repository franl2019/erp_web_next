export interface IUpdateProductAreaDto {
    productareaid: number;
    productareacode: string;
    productareaname: string;
    parentid: number;
}

export class UpdateProductAreaDto implements IUpdateProductAreaDto {
    productareaid: number = 0;
    productareacode: string = "";
    productareaname: string = "";
    parentid: number = 0;
}