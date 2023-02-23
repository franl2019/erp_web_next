import {IButtonState} from "@/composables/useButtonState";

export interface ISheetState {
    level1review?: boolean | number;
    level1Review?: boolean | number;
    level2review?: boolean | number;
    level2Review?: boolean | number;
    manualFinishReview?: boolean | number;
    urgentReview?: boolean | number;
    stopReview?: boolean | number;
}

export class ButtonState implements IButtonState {

    public create: boolean;
    public save: boolean;
    public edit: boolean;
    public level1review: boolean;
    public un_level1review: boolean;
    public level2review: boolean;
    public un_level2review: boolean;
    public delete_data: boolean;
    //手动完成
    public manualFinishReview: boolean;
    public unManualFinishReview: boolean;
    //加急审核
    public urgentReview: boolean;
    public unUrgentReview: boolean;
    //终止审核
    public stopReview: boolean;
    public unStopReview: boolean;

    constructor() {
        this.create = true;
        this.save = true;
        this.edit = false;
        this.level1review = false;
        this.un_level1review = false;
        this.level2review = false;
        this.un_level2review = false;
        this.delete_data = false;
        this.manualFinishReview = false;
        this.unManualFinishReview = false;
        this.urgentReview = false;
        this.unUrgentReview = false;
        this.stopReview = false;
        this.unStopReview = false;
    }

    public disableAll() {
        this.save = false;
        this.edit = false;
        this.level1review = false;
        this.un_level1review = false;
        this.level2review = false;
        this.un_level2review = false;
        this.delete_data = false;
        this.manualFinishReview = false;
        this.unManualFinishReview = false;
        this.urgentReview = false;
        this.unUrgentReview = false;
        this.stopReview = false;
        this.unStopReview = false;
    }

    public init() {
        this.disableAll();
        this.create = true;
        this.save = false;
    }

    //更新按钮状态
    public updateButtonState(
        sheetState: ISheetState
    ) {
        const level1review = Boolean(sheetState.level1review || sheetState.level1Review || 0);
        const level2review = Boolean(sheetState.level2review || sheetState.level2Review || 0);
        const stopReview = Boolean(sheetState.stopReview || 0);

        if (
            !level1review && !level2review && !stopReview
        ) {
            this.disableAll();
            this.save = true;
            this.delete_data = true;
            this.level1review = true;
            return this
        } else if (
            level1review && !level2review && !stopReview
        ) {
            this.disableAll();
            this.un_level1review = true;
            this.level2review = true;
            return this
        } else if (
            level1review && level2review && !stopReview
        ) {
            this.disableAll();
            this.un_level2review = true;
            this.stopReview = true;
            return this
        } else if (
            level1review && level2review && stopReview
        ) {
            this.disableAll();
            this.unStopReview = true;
            return this
        } else {
            this.disableAll();
            return this
        }
    }
}