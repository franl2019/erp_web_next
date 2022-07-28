export interface IButtonState {
    create: boolean;
    edit: boolean;
    level1review: boolean;
    un_level1review: boolean;
    level2review: boolean;
    un_level2review: boolean;
    delete_data: boolean;
}

export function getButtonState(level1review?: number, level2review?: number): IButtonState {
    const buttonState = "" + level1review + level2review
    switch (buttonState) {
        case "00":
            return {
                create: true,
                edit: true,
                level1review: true,
                un_level1review: false,
                level2review: false,
                un_level2review: false,
                delete_data: true
            };
        case "10":
            return {
                create: true,
                edit: true,
                level1review: false,
                un_level1review: true,
                level2review: true,
                un_level2review: false,
                delete_data: false
            };
        case "11":
            return {
                create: true,
                edit: true,
                level1review: false,
                un_level1review: false,
                level2review: false,
                un_level2review: true,
                delete_data: false
            };
        default:
            return {
                create: true,
                edit: false,
                level1review: false,
                un_level1review: false,
                level2review: false,
                un_level2review: false,
                delete_data: false
            };
    }
}