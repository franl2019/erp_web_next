import {computed, Ref} from "vue";

export  function useOperateAreaSelect(FindDto: Ref<{ operateareaids: number[] }>) {

    //操作区域id 计算属性
    const operateAreaId = computed({
        get: () => {
            if (FindDto.value.operateareaids.length === 0) {
                return 0
            } else {
                return FindDto.value.operateareaids[0];
            }
        }, set: val => {
            if (val === 0) {
                FindDto.value.operateareaids = [];
            } else {
                FindDto.value.operateareaids = [val];
            }
        }
    })

    return {
        operateAreaId
    }
}