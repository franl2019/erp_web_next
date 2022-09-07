import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {API_URL} from "@/api/url";
import {useVerifyParam} from "@/utils/validate";
import {ProductOtherUnitCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitCreate.dto";
import {ProductOtherUnitUpdateDto} from "@/module/productOtherUnit/dto/productOtherUnitUpdate.dto";
import {ProductOtherUnitDeleteDto} from "@/module/productOtherUnit/dto/productOtherUnitDelete.dto";

export class ProductOtherUnitService {

    public async find(findDto: ProductOtherUnitFindDto) {
        await useVerifyParam(findDto);
        const result = await http_post<IApiResult<IProductOtherUnit>>(API_URL.PRODUCT_OTHER_UNIT_FIND,findDto);
        if (result.code === 200 && result.data) {
            return result.data
        }else{
            return Promise.reject(new Error('查询产品辅助单位失败'))
        }
    }

    public async create(createDto:ProductOtherUnitCreateDto){
        await useVerifyParam(createDto);
        const result = await http_post<IApiResult>(API_URL.PRODUCT_OTHER_UNIT_CREATE,createDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('新增产品辅助单位失败'))
        }
    }

    public async update(updateDto:ProductOtherUnitUpdateDto){
        await useVerifyParam(updateDto);
        const result = await http_post<IApiResult>(API_URL.PRODUCT_OTHER_UNIT_UPDATE,updateDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('更新产品辅助单位失败'))
        }
    }

    public async delete_data(deleteDto:ProductOtherUnitDeleteDto){
        await useVerifyParam(deleteDto);
        const result = await http_post<IApiResult>(API_URL.PRODUCT_OTHER_UNIT_DELETE,deleteDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('删除产品辅助单位失败'))
        }
    }

}