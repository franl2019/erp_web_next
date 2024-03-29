import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {BuyArea, BuyAreaTree, IBuyArea, IBuyAreaTree} from "@/module/buyArea/buyArea";
import {ICreateBuyAreaDto} from "@/module/buyArea/dto/createBuyArea.dto";
import {IUpdateBuyAreaDto} from "@/module/buyArea/dto/updateBuyArea.dto";
import {useFormatDataTree} from "@/utils";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class BuyAreaService {
    public formatBuyAreaListToTreeData(buyAreaList: IBuyArea[]) {
        return useFormatDataTree<IBuyAreaTree>(buyAreaList, "buyareaid", "parentid");
    }

    public formatBuyAreaListToTreeDataHaveRoot(buyAreaList: IBuyArea[]) {
        const treeData =  useFormatDataTree<IBuyAreaTree>(buyAreaList, "buyareaid", "parentid");
        const rootNode = new BuyAreaTree();
        rootNode.buyareaname = '全部'
        rootNode.children = treeData;
        return [rootNode]
    }

    public async getBuyAreas() {
        const result = await useHttpPost<IApiResult<IBuyArea>>(API_URL.BUYAREA_SELECT);
        if (result.code === 200&&result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询供应商地区失败"))
        }
    }

    //包含根节点
    public async getBuyAreasIncludeRoot() {
        const result = await useHttpPost<IApiResult<IBuyArea>>(API_URL.BUYAREA_SELECT);
        if (result.code === 200 && result.data) {
            const rootNode = new BuyArea();
            rootNode.buyareaname = "根节点";
            result.data.unshift(rootNode);
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询供应商地区失败"))
        }
    }

    public async create(createDto: ICreateBuyAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.BUYAREA_ADD, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("新增供应商地区资料失败"))
        }
    }

    public async update(updateDto: IUpdateBuyAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.BUYAREA_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新供应商地区资料失败"))
        }
    }

    public async delete_data(buyAreaId: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUYAREA_DELETE, {buyareaid: buyAreaId});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除供应商地区资料失败"))
        }
    }
}