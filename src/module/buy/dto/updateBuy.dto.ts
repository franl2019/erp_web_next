export interface IUpdateBuyDto {
    buyid: number;
    buycode: string;
    buyname: string;
    contactperson: string;
    salesman: string;
    ymrep: string;
    phone_no: string;
    tel_no: string;
    email: string;
    address: string;
    moneytype: string;
    useflag: number;
    accountspayabletype: number;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
    remark6: string;
    remark7: string;
    remark8: string;
    remark9: string;
    remark10: string;
    buyareaid: number;
    operateareaid: number;
}

export class UpdateBuyDto implements IUpdateBuyDto{
    buyid: number = 0;
    buycode: string = "";
    buyname: string = "";
    contactperson: string = "";
    salesman: string = "";
    ymrep: string = "";
    phone_no: string = "";
    tel_no: string = "";
    email: string = "";
    address: string = "";
    moneytype: string = "";
    useflag: number = 0;
    accountspayabletype: number = 0;
    remark1: string = "";
    remark2: string = "";
    remark3: string = "";
    remark4: string = "";
    remark5: string = "";
    remark6: string = "";
    remark7: string = "";
    remark8: string = "";
    remark9: string = "";
    remark10: string = "";
    buyareaid: number = 0;
    operateareaid: number = 0;
}