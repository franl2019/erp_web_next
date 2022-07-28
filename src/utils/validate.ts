import {validate} from "class-validator";
import {VerifyParamError} from "@/error/verifyParamError";

export async function useVerifyParam(obj: object): Promise<void> {
    const errors = await validate(obj);
    if (errors.length > 0) {
        console.log(errors)
        return Promise.reject(new VerifyParamError("参数格式有误", errors))
    }
}