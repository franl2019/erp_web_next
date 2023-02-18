import {computed, Ref} from "vue";
import {WarehouseService} from "@/module/warehouse/warehouse.service";

export  function useWarehouseSelect(FindDto: Ref<{ warehouseids: number[] }>) {
    //选择仓库
    const warehouseid = computed({
        get: () => {
            if(FindDto.value.warehouseids.length === 0){
                return 0
            }else {
                return FindDto.value.warehouseids[0];
            }
        },
        set: (val) => {
            if(val === 0){
                FindDto.value.warehouseids = [];
            }else{
                FindDto.value.warehouseids = [val];
            }
        }
    })

    //设置默认查询仓库
    async function setDefaultWarehouse() {
        const warehouseService = new WarehouseService();
        const warehouse = await warehouseService.find_auth_default();
        warehouseid.value = warehouse.warehouseid;
    }

    function setDefaultAllWarehouse() {
        warehouseid.value = 0;
    }


    return {
        warehouseid,
        setDefaultWarehouse,
        setDefaultAllWarehouse
    }
}