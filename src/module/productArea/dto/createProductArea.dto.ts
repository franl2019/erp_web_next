export interface ICreateProductAreaDto {
    productareacode: string;
    productareaname: string;
    parentid: number;
}

export class CreateProductAreaDto implements ICreateProductAreaDto{
    productareacode: string = "";
    productareaname: string = "";
    parentid: number = 0;
}