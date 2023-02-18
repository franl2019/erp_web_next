import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {ICreateProductAreaDto} from "@/module/productArea/dto/createProductArea.dto";
import {IProductArea, IProductAreaTree, ProductArea, ProductAreaTree} from "@/module/productArea/productArea";
import {useFormatDataTree} from "@/utils";
import {IUpdateProductAreaDto} from "@/module/productArea/dto/updateProductArea.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";

export class ProductAreaService {

    public async find() {
        const result = await useHttpPost<IApiResult<IProductArea>>(API_URL.PRODUCTAREA_SELECT);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询产品类别失败"))
        }
    }

    public async getProductAreaTree() {
        const productAreas = await this.find();
        return useFormatDataTree<IProductAreaTree>(productAreas, "productareaid", "parentid");
    }

    public async getProductAreaTreeHaveRootNode() {
        const productAreas = await this.find();
        const productAreaTreeList = useFormatDataTree<IProductAreaTree>(productAreas, "productareaid", "parentid");
        const productAreaTree = new ProductAreaTree();
        productAreaTree.productareaname = '全部';
        productAreaTree.children = productAreaTreeList;
        return [productAreaTree]
    }

    public async getProductAreaHaveRoot() {
        const productAreaList = await this.find();
        const rootNode = new ProductArea();
        rootNode.productareaname = "无";
        productAreaList.unshift(rootNode)
        return productAreaList;
    }

    public async create(createDto: ICreateProductAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.PRODUCTAREA_ADD, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("新增产品类别，保存失败"))
        }
    }

    public async update(updateDto: IUpdateProductAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.PRODUCTAREA_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新产品类别，保存失败"))
        }
    }

    public async delete_data(productareaid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.PRODUCTAREA_DELETE, {
            productareaid: productareaid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除产品类别失败"))
        }
    }
}