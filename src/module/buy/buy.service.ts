import {http_post, IApiResult} from "@/api/axios";
import {IBuy} from "@/module/buy/buy";
import {API_URL} from "@/api/url";
import {IFindBuyDto} from "@/module/buy/dto/findBuy.dto";
import {ICreateBuyDto} from "@/module/buy/dto/createBuy.dto";
import {IUpdateBuyDto} from "@/module/buy/dto/updateBuy.dto";
import {VerifyParamError} from "@/error/verifyParamError";
export class BuyService {
    public async findOne(buyid:number): Promise<IBuy> {
        const result = await http_post<IApiResult<IBuy>>(API_URL.BUY_FIND_ONE, {buyid});
        if (result.code === 200 && result.data && result.data.length>0) {
            return result.data[0];
        } else {
            return Promise.reject(new VerifyParamError("查询单个供应商资料失败"));
        }
    }

    public async find(findDto: IFindBuyDto): Promise<IBuy[]> {
        const result = await http_post<IApiResult<IBuy>>(API_URL.BUY_SELECT, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询供应商资料失败"));
        }
    }

    public async create(createDto: ICreateBuyDto) {
        const result = await http_post<IApiResult>(API_URL.BUY_ADD, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("新增供应商资料失败"));
        }
    }

    public async update(updateDto: IUpdateBuyDto) {
        const result = await http_post<IApiResult>(API_URL.BUY_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新供应商资料失败"));
        }
    }

    public async level1Review(buyid: number) {
        const result = await http_post<IApiResult>(API_URL.BUY_LEVEL1REVIEW, {
            buyid: buyid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("审核供应商资料失败"));
        }
    }

    public async unLevel1Review(buyid: number) {
        const result = await http_post<IApiResult>(API_URL.BUY_UN_LEVEL1REVIEW, {
            buyid: buyid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("撤审供应商资料失败"));
        }
    }

    public async level2Review(buyid: number) {
        const result = await http_post<IApiResult>(API_URL.BUY_LEVEL2REVIEW, {
            buyid: buyid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("财务审核供应商资料失败"));
        }
    }

    public async unLevel2Review(buyid: number) {
        const result = await http_post<IApiResult>(API_URL.BUY_UN_LEVEL2REVIEW, {
            buyid: buyid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("财务撤审供应商资料失败"));
        }
    }

    public async delete_data(buyid: number) {
        const result = await http_post<IApiResult>(API_URL.BUY_DELETE, {buyid: buyid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除供应商资料失败"));
        }
    }

}