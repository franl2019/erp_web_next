import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IFindInventory} from "@/module/inventory/FindInventory";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {FindInventoryDto} from "@/module/inventory/dto/FindInventory.dto";
export class InventoryService {

    public async find(finDto: FindInventoryDto) {
        const result = await http_post<IApiResult<IFindInventory>>(API_URL.INVENTORY_SELECT, finDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询库存失败"))
        }
    }
}