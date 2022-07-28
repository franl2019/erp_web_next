import {OutboundSaleService} from "@/module/saleOutbound/service/outboundSale.service";
import {Ref} from "vue";
import {ISaleOutboundFindTable} from "@/module/saleOutbound/outboundSale";
import {OutboundMxSaleService} from "@/module/saleOutbound/service/outboundMxSale.service";
import {ITableRef} from "@/components/table/type";
import {IFindInventory} from "@/module/inventory/FindInventory";
import {IOutboundMxTableData, OutboundMxSaleTableData} from "@/module/saleOutbound/outboundMxSaleTableData";
import * as mathjs from 'mathjs';
import {FindOutboundSaleDto} from "@/module/saleOutbound/dto/findOutboundSale.dto";
import {FindOutboundMxSaleDto} from "@/module/saleOutbound/dto/findOutboundMxSale.dto";
import {SaleOutboundMxTableTotal} from "@/module/saleOutbound/SaleOutboundMxTableTotal";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {VerifyParamError} from "@/error/verifyParamError";


const {chain, bignumber, round} = mathjs;

export interface pageState {
    outboundid: number;
    title: string;
    exitMessage: string;
    warehouseid: number;
    edit: boolean;
}

export interface saleOutboundOption {
    updateButtonState: Function
    outboundHead: Ref<ISaleOutboundFindTable>;
    state: Ref<pageState>;
    outboundMxTableRef_hock: Ref<ITableRef | undefined>
}

let rowIdCount: number = 0;

export function useSaleOutboundEditViewHock(option: saleOutboundOption) {

    //销售单单头服务
    const outboundService = new OutboundSaleService();
    //销售单明细服务
    const outboundMxService = new OutboundMxSaleService();

    const {outboundHead, state, outboundMxTableRef_hock, updateButtonState} = option;


    //初始页面，根据state.outboundid 0新增 !0编辑
    async function initPage(): Promise<void> {

        if (state.value.outboundid === 0) {
            state.value.title = "新增销售单";
            state.value.exitMessage = "是否取消新增销售单"
            state.value.edit = true;
            if (outboundHead.value) {
                outboundHead.value.warehouseid = Number(state.value.warehouseid);
            }

        } else {
            //查询单头
            const findHeadDto = new FindOutboundSaleDto();
            findHeadDto.outboundid = state.value.outboundid;
            findHeadDto.startDate = '';
            findHeadDto.endDate = '';
            const saleOutboundHeadData = await outboundService.find(findHeadDto);
            if (saleOutboundHeadData.length > 1) {
                return Promise.reject(new VerifyParamError('单头数量异常,联系管理员!!'))
            }

            //读取单头
            outboundHead.value = saleOutboundHeadData[0];


            //读取明细
            const findMxDto = new FindOutboundMxSaleDto();
            findMxDto.outboundid = state.value.outboundid;
            const outboundMxList = await outboundMxService.find(findMxDto);

            addOutboundMx(outboundMxList);

            state.value.title = "编辑销售单";
            state.value.exitMessage = "是否取消编辑销售单";

            //判断是否可以编辑
            state.value.edit = outboundHead.value.level1review === 0 && outboundHead.value.level2review === 0;

            //更新按钮状态
            updateButtonState(outboundHead.value.level1review, outboundHead.value.level2review);

            updateTableAmtTotal()
        }
    }

    function clearMx() {
        outboundMxTableRef_hock.value?.getGridApi().setRowData([])
    }

    function formatInventoryListToOutboundMx(inventories: IFindInventory[]): IOutboundMxTableData[] {
        const addItems: IOutboundMxTableData[] = [];
        inventories.forEach(inventory => {
            const outboundMxTableData: IOutboundMxTableData = new OutboundMxSaleTableData();
            outboundMxTableData.printid = 0;
            outboundMxTableData.productid = inventory.productid;
            outboundMxTableData.productcode = inventory.productcode;
            outboundMxTableData.productname = inventory.productname;
            outboundMxTableData.unit = inventory.unit;
            outboundMxTableData.spec = inventory.spec;
            outboundMxTableData.materials = inventory.materials;
            outboundMxTableData.materials_d = inventory.materials_d;
            outboundMxTableData.spec_d = inventory.spec_d;
            outboundMxTableData.remark = inventory.remark;
            outboundMxTableData.remarkmx = inventory.remarkmx;
            outboundMxTableData.packqty = inventory.packqty;
            outboundMxTableData.outqty = Number(inventory.qty);
            outboundMxTableData.priceqty = Number(inventory.qty);
            outboundMxTableData.bzqty = Number(round(chain(bignumber(inventory.qty)).divide(bignumber(inventory.packqty)).done(), 4));
            //仓库
            outboundMxTableData.warehouseid = inventory.warehouseid;
            outboundMxTableData.warehousename = inventory.warehousename;
            //客户
            outboundMxTableData.clientid = inventory.clientid;
            outboundMxTableData.clientcode = inventory.clientcode;
            outboundMxTableData.clientname = inventory.clientname;
            addItems.push(outboundMxTableData);
        })
        return addItems;
    }

    //set mx table id
    function getRowNodeId(data: IOutboundMxTableData) {
        return data.printid
    }

    //获取明细
    function getOutboundMx(): IOutboundMxTableData[] {
        const outboundMxTableDataList: IOutboundMxTableData[] = [];
        outboundMxTableRef_hock.value?.getGridApi().forEachNode((rowNode) => {
            outboundMxTableDataList.push(rowNode.data);
        })
        return outboundMxTableDataList
    }



    //增加明细
    function addOutboundMx(addItems: IOutboundMxTableData[]) {
        for (let i = 0; i < addItems.length; i++) {
            rowIdCount = rowIdCount + 1
            addItems[i].printid = rowIdCount;
        }
        outboundMxTableRef_hock.value?.getGridApi().applyTransaction({add: addItems});
    }

    function getOutboundMxSumAmt(): number {
        let sumAmt = 0;
        const outboundMxs = getOutboundMx();
        for (let i = 0; i < outboundMxs.length; i++) {
            if (!isNaN(outboundMxs[i].amt)) {
                sumAmt = Number(
                    round(
                        chain(bignumber(sumAmt))
                            .add(bignumber(outboundMxs[i].amt))
                            .done()
                        , 2)
                );
            }
        }
        return sumAmt;
    }

    function updateTableAmtTotal() {
        const bottomRow = new SaleOutboundMxTableTotal();
        bottomRow.amt = getOutboundMxSumAmt();
        outboundMxTableRef_hock.value?.getGridApi().setPinnedBottomRowData([
            bottomRow
        ]);
    }

    function setOutboundSetPrintId(outboundMxList: IOutboundMx[]) {
        for (let i = 0; i < outboundMxList.length; i++) {
            outboundMxList[i].printid = i + 1
        }
        return outboundMxList
    }

    return {
        initPage,
        clearMx,
        formatInventoryListToOutboundMx,
        getOutboundMx,
        setOutboundSetPrintId,
        getRowNodeId,
        addOutboundMx,
        updateTableAmtTotal,
    }
}