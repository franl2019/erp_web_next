import {validate} from "class-validator";
import {VerifyParamError} from "@/types/error/verifyParamError";

export async function useVerifyParam(validationObject: any): Promise<boolean> {
    const errors = await validate(validationObject);
    if (errors.length > 0) {
        return Promise.reject(new VerifyParamError("参数格式有误", errors))
    } else {
        return true
    }
}