import {ref} from "vue";

export interface IButtonState {
    create: boolean;
    edit: boolean;
    level1review: boolean;
    un_level1review: boolean;
    level2review: boolean;
    un_level2review: boolean;
    delete_data: boolean;
}

//按钮状态
export function useButtonState() {

    const buttonShowState = ref<IButtonState>({
        create: true,
        edit: false,
        level1review: true,
        un_level1review: false,
        level2review: false,
        un_level2review: false,
        delete_data: false
    });

    //更新按钮状态
    function updateButtonState(level1review?: number, level2review?: number): void {
        const buttonState = "" + level1review + level2review
        switch (buttonState) {
            case "00":
                buttonShowState.value = {
                    create: true,
                    edit: true,
                    level1review: true,
                    un_level1review: false,
                    level2review: false,
                    un_level2review: false,
                    delete_data: true
                };
                break;
            case "10":
                buttonShowState.value = {
                    create: true,
                    edit: true,
                    level1review: false,
                    un_level1review: true,
                    level2review: true,
                    un_level2review: false,
                    delete_data: false
                };
                break;
            case "11":
                buttonShowState.value = {
                    create: true,
                    edit: true,
                    level1review: false,
                    un_level1review: false,
                    level2review: false,
                    un_level2review: true,
                    delete_data: false
                };
                break;
            default:
                buttonShowState.value = {
                    create: true,
                    edit: false,
                    level1review: false,
                    un_level1review: false,
                    level2review: false,
                    un_level2review: false,
                    delete_data: false
                };
                break;
        }
    }

    return {
        buttonShowState,
        updateButtonState
    }
}