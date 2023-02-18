import {ref} from "vue";

export function useTestComponent() {

    const count = ref(0)

    function test() {
        count.value ++
    }

    return {
        count,
        test
    }
}