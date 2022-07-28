import {createApp} from 'vue'
import dialog from '@/components/dialog/selectInfo/account/accountReceivable/selectAccountReceivableDialog.vue'
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    clientid?:number
    accountsReceivableTypeList:number[]
}

function ErpSelectAccountReceivableDialog(option: IDialogOption) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(dialog, {
        unmount: () => {
            app.unmount();
            document.body.removeChild(dom);
        },
        ...option
    });
    app.use(ElementPlus, {
        locale
    });
    app.mount(dom);
}

export default ErpSelectAccountReceivableDialog
