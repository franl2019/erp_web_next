import {createApp} from 'vue'
import dialog from './ErpDialog.vue'

export interface IErpDialogOption {
    unmount?: Function;
    title?: string;
    message: string;
    ok?:Function;
    close?: Function;
    okBtnVisible?:boolean;
    closeBtnVisible?:boolean;
}

function ErpDialog(option: IErpDialogOption) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(dialog, {
        unmount: () => {
            app.unmount();
            document.body.removeChild(dom);
        },
        ...option
    });
    app.mount(dom);
}

export default ErpDialog
