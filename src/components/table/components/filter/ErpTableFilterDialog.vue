<template>
  <erp-form-dialog
      title="筛选"
      v-bind="$attrs"
      @clickedClose="close"
      @clickedConfirm="save"
  >
    <template #button>
      <erp-button :type="'danger'" class="w-full sm:w-auto" @click="reset">重置</erp-button>
    </template>
    <erp-form>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('outboundcode')"
          lg-col="4"
          md-col="4"
          name="单号">
        <erp-input-round ref="outboundcodeRef" v-model="findDtoDeepClone.outboundcode"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('inboundcode')"
          lg-col="4"
          md-col="4"
          name="单号">
        <erp-input-round ref="inboundcodeRef" v-model="findDtoDeepClone.inboundcode"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('clientname')"
          lg-col="4"
          md-col="4"
          name="客户名称">
        <erp-input-round ref="clientnameRef" v-model="findDtoDeepClone.clientname"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('buyname')"
          lg-col="4"
          md-col="4"
          name="供应商名称">
        <erp-input-round ref="buynameRef" v-model="findDtoDeepClone.buyname"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('startDate')&&findDtoDeepClone.hasOwnProperty('endDate')"
          lg-col="4" md-col="4" name="查询日期">
        <erp-range-date
          v-model:start-date="findDtoDeepClone.startDate"
          v-model:end-date="findDtoDeepClone.endDate"
          style="width:100%"
          @change="test(findDtoDeepClone)"
        ></erp-range-date>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('operateareaids')"
          lg-col="4" md-col="4" name="操作区域">
        <erp-operate-area-auth-select
            v-model="operateAreaId"
            :have-root-node="true">
        </erp-operate-area-auth-select>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('warehouseids')"
          lg-col="4"
          md-col="4" name="仓库"
      >
        <erp-warehouse-auth-select-have-root v-model="warehouseid"></erp-warehouse-auth-select-have-root>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('ymrep')" name="业务员"
          lg-col="4" md-col="4" >
        <erp-input-round ref="ymrepRef" v-model="findDtoDeepClone.ymrep"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          lg-col="4" md-col="4"
          v-if="findDtoDeepClone.hasOwnProperty('relatednumber')" name="相关单号">
        <erp-input-round
            v-model="findDtoDeepClone.relatednumber"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('moneytype')"
          lg-col="4" md-col="4" name="结算方式">
        <erp-input-round v-model="findDtoDeepClone.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          lg-col="4" md-col="4"
          v-if="findDtoDeepClone.hasOwnProperty('remark1')"
          name="备注1">
        <erp-input-round
            ref="remark1Ref" v-model="findDtoDeepClone.remark1"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          lg-col="4" md-col="4"
          v-if="findDtoDeepClone.hasOwnProperty('remark2')"
          name="备注2">
        <erp-input-round
            ref="remark2Ref"
            v-model="findDtoDeepClone.remark2"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          lg-col="4" md-col="4"
          v-if="findDtoDeepClone.hasOwnProperty('remark3')"
          name="备注3">
        <erp-input-round ref="remark3Ref" v-model="findDtoDeepClone.remark3"></erp-input-round>
      </erp-form-item>
      <erp-form-item
          lg-col="4" md-col="4"
          v-if="findDtoDeepClone.hasOwnProperty('remark4')"
          name="备注4">
        <erp-input-round
            ref="remark4Ref"
            v-model="findDtoDeepClone.remark4">
        </erp-input-round>
      </erp-form-item>
      <erp-form-item
          v-if="findDtoDeepClone.hasOwnProperty('remark5')"
          lg-col="4" md-col="4"
          name="备注5">
        <erp-input-round
            ref="remark5Ref"
            v-model="findDtoDeepClone.remark5">
        </erp-input-round>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, PropType, ref, unref} from 'vue';
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {ElDatePicker} from 'element-plus';
import ErpButton from "@/components/button/ErpButton.vue";
import ErpRangeDate from "@/components/date/ErpRangeDate.vue";

export default defineComponent({
  name: "ErpTableFilterDialog",
  components: {
    ErpRangeDate,
    ErpButton,
    ElDatePicker,
    ErpWarehouseAuthSelectHaveRoot,
    ErpOperateAreaAuthSelect,
    ErpInputRound,
    ErpFormItem,
    ErpForm,
    ErpFormDialog
  },
  props: {
    resolve_dialog: {
      type: Function as PropType<(findDto: any) => void>,
      required: true,
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true,
    },
    unmount: {
      type: Function,
      required: true,
      default: () => {
      }
    },
    findDto: {
      type: Object as PropType<any>
    },
    defaultFindDto: {
      type: Object as PropType<any>
    },
    colId: {
      type: String,
      default: ""
    },
    colValue: {
      type: String,
      default: ""
    },
  },
  setup(props) {
    const findDtoDeepClone = ref(JSON.parse(JSON.stringify(props.findDto)));
    const {operateAreaId} = useOperateAreaSelect(findDtoDeepClone);
    const {warehouseid, setDefaultAllWarehouse} = useWarehouseSelect(findDtoDeepClone);

    onMounted(async () => {
      await nextTick(() => {
        setDefaultFocus();
      });
      setColValue();
      setDefaultAllWarehouse();
    })

    const outboundcodeRef = ref();
    const inboundcodeRef = ref();
    const clientnameRef = ref();
    const buynameRef = ref();
    const ymrepRef = ref();
    const remark1Ref = ref();
    const remark2Ref = ref();
    const remark3Ref = ref();
    const remark4Ref = ref();
    const remark5Ref = ref();

    function setDefaultFocus() {
      const {colId} = props;
      const inputRef = {
        outboundcode: outboundcodeRef,
        inboundcode: inboundcodeRef,
        clientname: clientnameRef,
        buyname: buynameRef,
        ymrep:ymrepRef,
        remark1:remark1Ref,
        remark2:remark2Ref,
        remark3:remark3Ref,
        remark4:remark4Ref,
        remark5:remark5Ref,
      }
      switch (colId) {
        case 'outboundcode':
          inputRef.outboundcode.value.getNode().focus();
          break;
        case 'inboundcode':
          inputRef.inboundcode.value.getNode().focus();
          break;
        case 'clientname':
          inputRef.clientname.value.getNode().focus();
          break;
        case 'buyname':
          inputRef.buyname.value.getNode().focus();
          break;
        case 'ymrep':
          inputRef.ymrep.value.getNode().focus();
          break;
        case 'remark1':
          inputRef.remark1.value.getNode().focus();
          break;
        case 'remark2':
          inputRef.remark2.value.getNode().focus();
          break;
        case 'remark3':
          inputRef.remark3.value.getNode().focus();
          break;
        case 'remark4':
          inputRef.remark4.value.getNode().focus();
          break;
        case 'remark5':
          inputRef.remark5.value.getNode().focus();
          break;
        default:
          break
      }
    }


    function setColValue() {
      const {colId, colValue} = props;
      if (colId && findDtoDeepClone.value.hasOwnProperty(colId)) {
        findDtoDeepClone.value[colId] = colValue;
      }
    }

    function save() {
      if (props.hasOwnProperty('resolve_dialog')) {
        props.resolve_dialog(unref(findDtoDeepClone));
        props.unmount();
      }
    }

    function close() {
      if (props.hasOwnProperty('resolve_dialog')) {
        props.reject_dialog();
        props.unmount();
      }
    }

    function reset() {
      if (props.hasOwnProperty('defaultFindDto')) {
        for (const defaultFindDtoKey in props.defaultFindDto) {
          if (findDtoDeepClone.value.hasOwnProperty(defaultFindDtoKey)) {
            findDtoDeepClone.value[defaultFindDtoKey] = props.defaultFindDto[defaultFindDtoKey];
          }
        }
      }

      if (props.hasOwnProperty('resolve_dialog')) {
        props.resolve_dialog(unref(findDtoDeepClone));
        props.unmount();
      }
    }

    function test(value:any) {
      console.log(value.startDate)
    }

    return {
      test,
      save,
      close,
      reset,
      warehouseid,
      operateAreaId,
      findDtoDeepClone,
      outboundcodeRef,
      inboundcodeRef,
      clientnameRef,
      buynameRef,
      ymrepRef,
      remark1Ref,
      remark2Ref,
      remark3Ref,
      remark4Ref,
      remark5Ref,
    }
  }
})
</script>