import {IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {ICreateProductDto} from "@/module/product/dto/createProduct.dto";
import {IUpdateProductDto} from "@/module/product/dto/updateProduct.dto";
import {IProduct} from "@/module/product/product";
import {VerifyParamError} from "@/error/verifyParamError";
export class ProductService {

    public async find(findDto: IFindProductDto) {
        const result = await http_post<IApiResult<IProduct>>(API_URL.PRODUCT_SELECT, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询产品资料失败"))
        }
    }

    public async create(createDto: ICreateProductDto) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_ADD, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("新增产品资料，保存失败"))
        }
    }

    public async update(updateDto: IUpdateProductDto) {
        updateDto.packqty = Number(updateDto.packqty);
        updateDto.m3 = Number(updateDto.m3);
        updateDto.length = Number(updateDto.length);
        updateDto.width = Number(updateDto.width);
        updateDto.height = Number(updateDto.height);
        const result = await http_post<IApiResult>(API_URL.PRODUCT_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新产品资料，保存失败"))
        }
    }

    public async delete_data(productid: number) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_DELETE, {productid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除产品资料失败"))
        }
    }

    public async level1Review(productid: number) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_LEVEL1REVIEW, {productid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("审核产品资料失败"))
        }
    }


    public async unLevel1Review(productid: number) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_UN_LEVEL1REVIEW, {productid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("撤审产品资料失败"))
        }
    }

    public async level2Review(productid: number) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_LEVEL2REVIEW, {productid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("财务审核产品资料失败"))
        }
    }

    public async unLevel2Review(productid: number) {
        const result = await http_post<IApiResult>(API_URL.PRODUCT_UN_LEVEL2REVIEW, {productid});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("财务撤审产品资料失败"))
        }
    }
}