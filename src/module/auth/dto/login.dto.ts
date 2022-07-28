import {IsString} from "class-validator";
import {useVerifyParam} from "@/utils/validate";

export class LoginDto {
    @IsString()
    usercode: string

    @IsString()
    password: string


    constructor(usercode: string, password: string) {
        this.usercode = usercode;
        this.password = password;
    }

    public async Validation() {
        await useVerifyParam(this);
    }
}