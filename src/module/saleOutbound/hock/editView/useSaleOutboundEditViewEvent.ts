import {IClient} from "@/module/client/client";
import {
    saleOutboundOption,
    useSaleOutboundEditViewHock
} from "@/module/saleOutbound/hock/editView/useSaleOutboundEditViewHock";
import ErpSelectInventoryDialog from "@/components/dialog/selectInfo/selectInventory/SelectInventoryDialog";
import {IFindInventory} from "@/module/inventory/FindInventory";
import ErpDialog from "@/components/dialog/dialog";
import {OutboundSaleDto} from "@/module/saleOutbound/dto/outboundSale.dto";
import {OutboundSaleService} from "@/module/saleOutbound/service/outboundSale.service";
import {CellEditingStartedEvent} from "ag-grid-community";
import {VerifyParamError} from "@/error/verifyParamError";
import router from "@/router";
import {useRouterPage} from "@/utils";

export function useSaleOutboundEditViewEvent(option: saleOutboundOption) {

    //销售单单头服务
    const outboundService = new OutboundSaleService();
    const {
        formatInventoryListToOutboundMx,
        initPage,
        clearMx,
        getOutboundMx,
        setOutboundSetPrintId,
        addOutboundMx,
        updateTableAmtTotal,
    } = useSaleOutboundEditViewHock(option);

    const {outboundHead, state, outboundMxTableRef_hock} = option;

    //选择客户
    function selectedClientEvent(client: IClient) {
        outboundHead.value.clientname = client.clientname;
        outboundHead.value.clientid = client.clientid;
    }

    //取消选择客户
    function unSelectedClientEvent() {
        outboundHead.value.clientname = "";
        outboundHead.value.clientid = 0;
        clearMx()
    }

    function unSelectWarehouse() {
        clearMx()
    }

    //增加明细按钮
    function clickedAddOutboundMxButton() {
        if (outboundHead.value.clientid === 0) {
            return Promise.reject(new VerifyParamError('请先选择客户'))
        }

        if (outboundHead.value.warehouseid === 0) {
            return Promise.reject(new VerifyParamError('请先选择仓库'))
        }
        ErpSelectInventoryDialog({
            clientid: outboundHead.value.clientid,
            warehouseid: outboundHead.value.warehouseid,
            //回调返回选中库存
            ok: (inventories: IFindInventory[]) => {
                //添加到明细
                addOutboundMx(formatInventoryListToOutboundMx(inventories));
            }
        })
    }

    //删除明细
    async function clickedDeleteOutboundMxButton(): Promise<void> {
        const removeData = outboundMxTableRef_hock.value?.getGridApi().getSelectedRows();
        outboundMxTableRef_hock.value?.getGridApi().applyTransaction({remove: removeData});
        updateTableAmtTotal();
    }

    async function getCreateDto() {
        outboundMxTableRef_hock.value?.getGridApi().stopEditing();

        if (!outboundHead.value.clientid || outboundHead.value.clientid === 0) {
            return Promise.reject(new VerifyParamError("请选择客户"));
        }

        if (!outboundHead.value.warehouseid || outboundHead.value.warehouseid === 0) {
            return Promise.reject(new VerifyParamError("请选择仓库"));
        }

        if (outboundHead.value.clientid === 0) {
            return Promise.reject(new VerifyParamError("请选择客户"))
        }


        if (outboundHead.value.warehouseid === 0) {
            return Promise.reject(new VerifyParamError("请选择仓库"))
        }

        //获取明细
        const outboundMx = setOutboundSetPrintId(getOutboundMx());

        //组合单据对象
        const outbound = new OutboundSaleDto();
        outbound.setHead(outboundHead.value);
        outbound.setOutboundMx(outboundMx);

        if (outbound.outboundMx.length <= 0) {
            return Promise.reject(new VerifyParamError("请填写明细"));
        }

        return outbound
    }

    //保存按钮
    async function clickedSaveButton(): Promise<void> {

        const outbound = await getCreateDto();
        //根据页面状态新增或修改
        if (state.value.outboundid === 0) {
            const result = await outboundService.create(outbound);
            state.value.outboundid = <number>result.createResult?.id
            const route = router.resolve({
                name:'editOutbound',
                query:{
                    outboundid:<number>result.createResult?.id
                }
            })
            useRouterPage(route.fullPath,route.meta.title as string);
            window.close();
        } else {
            await outboundService.update(outbound);
        }

        await clearMx();
        await initPage();


    }

    //审核出仓单按钮
    async function clickedL1Review() {

        //区分新增的审核还是编辑的审核
        if (state.value.outboundid === 0) {
            const outbound = await getCreateDto();
            ErpDialog({
                title: "提示",
                message: `是否保存并审核`,
                ok: async () => {
                    const result = await outboundService.create_l1Review(outbound);
                    await clearMx();
                    state.value.outboundid = <number>result.createResult?.id
                    await initPage();
                }
            })
        } else {
            const outbound = await getCreateDto();
            const {outboundcode} = outbound;
            ErpDialog({
                title: "提示",
                message: `是否审核,单号:${outboundcode}`,
                ok: async () => {
                    await outboundService.updateAndL1Review(outbound);
                    await clearMx();
                    await initPage();
                }
            })
        }
    }

    //撤审出仓单按钮
    async function clickedUnL1Review() {
        const {outboundid, outboundcode} = outboundHead.value;
        ErpDialog({
            title: "提示",
            message: `是否撤审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.unL1Review({outboundid});
                await clearMx();
                await initPage();
            }
        })
    }

    //审核出仓单按钮
    async function clickedL2Review() {
        const {outboundid, outboundcode} = outboundHead.value;
        ErpDialog({
            title: "提示",
            message: `是否财审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.l2Review({outboundid});
                await clearMx();
                await initPage();
            }
        })
    }

    //撤审出仓单按钮
    async function clickedUnL2Review() {
        const {outboundid, outboundcode} = outboundHead.value;
        ErpDialog({
            title: "提示",
            message: `是否撤审财审,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.unL2Review({outboundid});
                await clearMx();
                await initPage();
            }
        })
    }

    async function clickedDeleteData() {
        const {outboundid, outboundcode} = outboundHead.value;
        ErpDialog({
            title: "提示",
            message: `是否删除,单号:${outboundcode}`,
            ok: async () => {
                await outboundService.delete_data({outboundid});
                window.close();
            }
        })
    }

    //编辑完成值发生变化
    function cellValueChangedEvent() {
        updateTableAmtTotal();
    }

    //底部栏禁止编辑
    function cellEditingStartedEvent(event: CellEditingStartedEvent) {
        if (event.node.rowPinned) {
            event.api.stopEditing(true);
        }
    }

    return {
        selectedClientEvent,
        unSelectedClientEvent,
        unSelectWarehouse,
        cellValueChangedEvent,
        cellEditingStartedEvent,
        clickedSaveButton,
        clickedL1Review,
        clickedUnL1Review,
        clickedL2Review,
        clickedUnL2Review,
        clickedDeleteData,
        clickedAddOutboundMxButton,
        clickedDeleteOutboundMxButton,
    }
}