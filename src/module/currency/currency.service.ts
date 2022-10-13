import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {ICurrency} from "@/module/currency/currency";
import {CurrencyCreateDto} from "@/module/currency/dto/currencyCreate.dto";
import {CurrencyEditDto} from "@/module/currency/dto/currencyEdit.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class CurrencyService {

    public async find() {
        const result = await useHttpPost<IApiResult<ICurrency>>(API_URL.CURRENCY_SELECT);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询币种失败"));
        }
    }

    public async create(createDto: CurrencyCreateDto) {
        const result = await useHttpPost<IApiResult>(API_URL.CURRENCY_ADD, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("创建币种失败"));
        }
    }

    public async update(updateDto: CurrencyEditDto) {
        const result = await useHttpPost<IApiResult>(API_URL.CURRENCY_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新币种失败"));
        }
    }

    public async delete_data(currencyId: number) {
        const result = await useHttpPost<IApiResult>(API_URL.CURRENCY_DELETE, {currencyid: currencyId});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除币种失败"));
        }
    }
}