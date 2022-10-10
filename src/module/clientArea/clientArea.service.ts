//客户地区服务
import {useFormatDataTree} from "@/utils";
import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IClientArea, IClientAreaTree, ICreateClientAreaDto, IUpdateClientAreaDto} from "@/module/clientArea/clientArea";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class ClientAreaService {

    //查询客户地区数据
    public async getClientAreaTreeHaveRoot(): Promise<IClientAreaTree[]> {
        const clientAreaList = await this.getClientAreaList();
        const clientAreaTreeData = useFormatDataTree<IClientAreaTree>(clientAreaList, 'clientareaid', 'parentid')
        const clientAreaRootItem: IClientAreaTree = {
            clientareaid: 0,
            clientareacode: "",
            clientareaname: "全部",
            createdAt: new Date(),
            creater: "",
            del_uuid: 0,
            deletedAt: new Date(),
            deleter: "",
            parentid: 0,
            sonflag: 0,
            updatedAt: new Date(),
            updater: "",
            children: [...clientAreaTreeData],
        }

        return [clientAreaRootItem]
    }

    public async getClientAreaTree(): Promise<IClientAreaTree[]> {
        const clientAreaList = await this.getClientAreaList();
        return useFormatDataTree<IClientAreaTree>(clientAreaList, 'clientareaid', 'parentid')
    }

    public async getClientAreaList(): Promise<IClientArea[]> {
        const result = await http_post<IApiResult<IClientArea>>(API_URL.CLIENTAREA_SELECT);
        if (result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询客户地区数据失败"))
        }
    }

    public async getClientAreaListHaveRoot(): Promise<IClientArea[]> {
        const clientAreaList = await this.getClientAreaList()
        const clientAreaRootItem = {
            clientareacode: "",
            clientareaid: 0,
            clientareaname: "无",
            createdAt: new Date(0),
            creater: "",
            del_uuid: 0,
            deletedAt: new Date(0),
            deleter: "",
            parentid: 0,
            sonflag: 1,
            updatedAt: new Date(0),
            updater: "",
        }
        clientAreaList.unshift(clientAreaRootItem);
        return clientAreaList
    }

    public async create(addClientAreaDto: ICreateClientAreaDto): Promise<IApiResult> {
        const result = await http_post<IApiResult>(API_URL.CLIENTAREA_ADD, addClientAreaDto);
        if (result.code === 200) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError(result.msg));
        }
    }

    public async update(updateClientAreaDto: IUpdateClientAreaDto): Promise<IApiResult> {
        const result = await http_post<IApiResult>(API_URL.CLIENTAREA_UPDATE, updateClientAreaDto);
        if (result.code === 200) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }

    public async deleteData(clientAreaId: number): Promise<Boolean> {
        const result = await http_post<IApiResult>(API_URL.CLIENTAREA_DELETE, {clientareaid: clientAreaId});
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }
}