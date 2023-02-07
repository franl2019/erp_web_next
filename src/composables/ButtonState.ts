import {IButtonState} from "@/composables/useButtonState";

export class ButtonState implements IButtonState{

    public create:boolean;
    public edit:boolean;
    public level1review:boolean;
    public un_level1review:boolean;
    public level2review:boolean;
    public un_level2review:boolean;
    public delete_data:boolean;

    constructor() {
        this.create = true;
        this.edit = false;
        this.level1review = false;
        this.un_level1review = false;
        this.level2review = false;
        this.un_level2review = false;
        this.delete_data = false;
    }

    public init(){
        this.create = true;
        this.edit = false;
        this.level1review = false;
        this.un_level1review = false;
        this.level2review = false;
        this.un_level2review = false;
        this.delete_data = false;
    }

    //更新按钮状态
    public updateButtonState(level1review: boolean | number = false, level2review: boolean | number = false): void {
        level1review = Boolean(level1review);
        level2review = Boolean(level2review);
        if (
            !level1review &&
            !level2review
        ) {
            this.create = true;
            this.edit = true;
            this.level1review = true;
            this.un_level1review = false;
            this.level2review = false;
            this.un_level2review = false;
            this.delete_data = true;
        } else if (
            level1review &&
            !level2review
        ) {
            this.create = true;
            this.edit = true;
            this.level1review = false;
            this.un_level1review = true;
            this.level2review = true;
            this.un_level2review = false;
            this.delete_data = false;
        } else if (
            level1review &&
            level2review
        ) {
            this.create = true;
            this.edit = true;
            this.level1review = false;
            this.un_level1review = false;
            this.level2review = false;
            this.un_level2review = true;
            this.delete_data = false;
        } else {
            this.create = true;
            this.edit = false;
            this.level1review = false;
            this.un_level1review = false;
            this.level2review = false;
            this.un_level2review = false;
            this.delete_data = false;
        }
    }
}