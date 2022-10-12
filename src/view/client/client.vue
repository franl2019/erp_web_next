<template>
  <erp-left-right-page-box :is-visible-left="isVisibleLeft">
    <template #left>
      <client-area @clickedClientAreaTreeNode="clickedClientAreaTreeNode"></client-area>
    </template>
    <template #right>
      <erp-title>
        <template v-slot:input>
          <erp-is-use-select v-model="findClientDto.useflag" class="md:w-28" @change="onSearchClient">
          </erp-is-use-select>
          <erp-input-round v-model="findClientDto.search" class="md:w-52" placeholder="输入客户名称搜索"
                           @keyup.enter="onSearchClient">
          </erp-input-round>
        </template>
        <erp-button v-if="buttonShowState.create" @click="onClickedAddDialog">新增</erp-button>
        <erp-button v-if="buttonShowState.edit" @click="onClickedEditDialog">修改</erp-button>
        <erp-button v-if="buttonShowState.level1review" type="success" @click="onClickedLevel1Review">审核</erp-button>
        <erp-button v-if="buttonShowState.un_level1review" type="danger" @click="onClickedUnLevel1Review">撤审
        </erp-button>
        <erp-button v-if="buttonShowState.level2review" type="success" @click="onClickedLevel2Review">财务审核
        </erp-button>
        <erp-button v-if="buttonShowState.un_level2review" type="danger" @click="onClickedUnLevel2Review">财务撤审
        </erp-button>
        <erp-button v-if="buttonShowState.delete_data" type="danger" @click="onClickedDelete">删除</erp-button>
      </erp-title>

      <erp-table ref="clientTableRef"
                 :find-dto="findClientDto"
                 :getRowNodeId="getRowNodeId"
                 :table-state="defaultClientTableState"
                 @selection-changed="onSelectRow">
      </erp-table>
    </template>
  </erp-left-right-page-box>

  <add-client-dialog v-if="isShowAddClientDialog" :dto="clientNewDto" @clickedCancel="onClickedAddDialog"
                     @clickedConfirm="onClickedAdd">
  </add-client-dialog>

  <edit-client-dialog v-if="isShowEditClientDialog" :dto="clientTableSelect" @clickedCancel="onClickedEditDialog"
                      @clickedConfirm="onClickedEdit"></edit-client-dialog>

</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import AddClientDialog from "@/view/client/component/addClientDialog.vue";
import EditClientDialog from "@/view/client/component/editClientDialog.vue";
import ErpIsUseSelect from "@/components/select/ErpIsUseSelect.vue";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import ClientArea from "@/view/clientArea/clientArea.vue"
import {defaultClientTableState} from "@/view/client/tableConfig/defaultClientTableState";
import {defineComponent, onMounted, ref, watch} from "vue";
import {Client, IClient} from "@/module/client/client";
import type {ITableRef} from "@/components/table/type";
import {SelectionChangedEvent} from "ag-grid-community";
import {getButtonState, IButtonState} from "@/composables/useInfoButtonState";
import ErpDialog from "@/components/dialog/dialog";
import {ClientService} from "@/module/client/client.service";
import {FindClientDto, IFindClientDto} from "@/module/client/dto/findClient.dto";
import {User_operatearea_mxService} from "@/module/user_operatearea_mx/user_operatearea_mx.service";
import {IClientAreaTree} from "@/module/clientArea/clientArea";

export default defineComponent({
  name:"client",
  components: {
    ErpTitle,
    ErpInputRound,
    ErpButton,
    ErpIsUseSelect,
    ErpTable,
    AddClientDialog,
    EditClientDialog,
    ErpLeftRightPageBox,
    ClientArea
  },
  setup() {
    const isVisibleLeft = ref(true);

    //客户表格组件ref
    const clientTableRef = ref<ITableRef>();
    onMounted(async () => {
      await clientTableRef.value?.initTableData();
    })

    //控制dialog显示
    const isShowAddClientDialog = ref(false);
    const isShowEditClientDialog = ref(false);

    const clientTableSelect = ref<IClient>(new Client());//客户表格选择的客户资料

    //表格行id设置
    function getRowNodeId(data: IClient) {
      return data.clientid;
    }

    const buttonShowState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: false,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    //观察客户资料的选中
    watch(clientTableSelect, (value) => {
      //根据选中客户审核状态，更改按钮显示状态
      buttonShowState.value = getButtonState(value.level1review, value.level2review)
    })

    //根据ClientID选中列表行
    function clientidSelectRow(id: number) {
      clientTableRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
    }

    const clientNewDto = ref<IClient>(new Client());


    //获取用户默认操作区域权限Id
    async function findDefaultUserOperateAreaId(): Promise<number> {
      const user_operatearea_mxService = new User_operatearea_mxService();
      const defaultUserOperateAreaMx = await user_operatearea_mxService.findDefaultUserOperateArea()
      return defaultUserOperateAreaMx.operateareaid
    }

    //客户资料搜索框回车事件
    async function onSearchClient() {
      await clientTableRef.value?.initTableData();
      buttonShowState.value = getButtonState();
    }

    //客户表格行点击事件
    function onSelectRow(event: SelectionChangedEvent) {
      const selectRows = JSON.parse(JSON.stringify(event.api.getSelectedRows()));
      clientTableSelect.value = selectRows[0];
    }

    //显示新增客户dialog
    async function onClickedAddDialog() {
      await initClientNewDto();
      isShowAddClientDialog.value = !isShowAddClientDialog.value;
    }

    //显示编辑客户dialog
    function onClickedEditDialog() {
      isShowEditClientDialog.value = !isShowEditClientDialog.value;
    }

    async function initClientNewDto() {
      clientNewDto.value = new Client();
      clientNewDto.value.operateareaid = await findDefaultUserOperateAreaId();
    }

    function clickedClientAreaTreeNode(clientArea: IClientAreaTree) {
      findClientDto.value.clientareaid = clientArea.clientareaid;
      onSearchClient()
    }

    //查询客户资料Dto
    const findClientDto = ref<IFindClientDto>(new FindClientDto());


    //客户资料服务
    const clientService = new ClientService();

    //点击新增按钮事件
    async function onClickedAdd() {
      if (clientTableSelect.value) {
        await clientService.add(clientNewDto.value);
        await clientTableRef.value?.initTableData();
        await initClientNewDto();
        isShowAddClientDialog.value = !isShowAddClientDialog.value;
      }
    }

    //点击修改按钮事件
    async function onClickedEdit() {
      if (clientTableSelect.value.clientid) {
        await clientService.update(clientTableSelect.value);
        isShowEditClientDialog.value = !isShowEditClientDialog.value;
        await clientTableRef.value?.initTableData();
        buttonShowState.value = getButtonState();
        clientidSelectRow(clientTableSelect.value.clientid);
      }
    }

    //点击审核按钮
    async function onClickedLevel1Review() {
      if (clientTableSelect.value.clientid) {
        ErpDialog({
          title: "是否审核",
          message: `客户编号:${clientTableSelect.value.clientcode},客户名称:${clientTableSelect.value.clientname}`,
          ok: async () => {
            const clientid = clientTableSelect.value.clientid;
            await clientService.level1Review(clientid);
            await clientTableRef.value?.initTableData();
            clientidSelectRow(clientid);
          }
        })
      }
    }

    //点击撤审按钮
    async function onClickedUnLevel1Review() {
      if (clientTableSelect.value.clientid) {
        ErpDialog({
          title: "是否撤审",
          message: `客户编号:${clientTableSelect.value.clientcode},客户名称:${clientTableSelect.value.clientname}`,
          ok: async () => {
            const clientid = clientTableSelect.value.clientid;
            await clientService.unLevel1Review(clientid);
            await clientTableRef.value?.initTableData();
            clientidSelectRow(clientid);
          }
        })
      }
    }

    //点击财务审核按钮
    async function onClickedLevel2Review() {
      if (clientTableSelect.value.clientid) {
        ErpDialog({
          title: "是否财务审核",
          message: `客户编号:${clientTableSelect.value.clientcode},客户名称:${clientTableSelect.value.clientname}`,
          ok: async () => {
            const clientid = clientTableSelect.value.clientid;
            await clientService.level2Review(clientid);
            await clientTableRef.value?.initTableData();
            clientidSelectRow(clientid);
          }
        })
      }
    }

    //点击撤销财务审核按钮
    async function onClickedUnLevel2Review() {
      if (clientTableSelect.value.clientid) {
        ErpDialog({
          title: "是否撤销财务审核",
          message: `客户编号:${clientTableSelect.value.clientcode},客户名称:${clientTableSelect.value.clientname}`,
          ok: async () => {
            const clientid = clientTableSelect.value.clientid;
            await clientService.unLevel2Review(clientid);
            await clientTableRef.value?.initTableData();
            clientidSelectRow(clientid);
          }
        })
      }
    }

    //点击删除按钮事件
    async function onClickedDelete() {
      if (clientTableSelect.value.clientid) {
        ErpDialog({
          title: "是否删除",
          message: `客户编号: ${clientTableSelect.value.clientcode},客户名称: ${clientTableSelect.value.clientname}`,
          ok: async () => {
            const clientid = clientTableSelect.value.clientid;
            await clientService.delete_data(clientid);
            await clientTableRef.value?.initTableData();
            buttonShowState.value = getButtonState();
          }
        })
      }
    }

    return {
      defaultClientTableState,
      isVisibleLeft,
      clientTableRef,
      isShowAddClientDialog,
      isShowEditClientDialog,
      clientTableSelect,
      getRowNodeId,
      buttonShowState,
      clientNewDto,
      onSearchClient,
      onSelectRow,
      onClickedAddDialog,
      onClickedEditDialog,
      clickedClientAreaTreeNode,
      findClientDto,
      onClickedAdd,
      onClickedEdit,
      onClickedLevel1Review,
      onClickedUnLevel1Review,
      onClickedLevel2Review,
      onClickedUnLevel2Review,
      onClickedDelete,
    };
  },
});
</script>