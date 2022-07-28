import {createApp} from 'vue'
import dialog from '@/components/dialog/selectInfo/account/accountPayable/selectAccountPayableDialog.vue'
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    buyid:number;
    accountsPayableTypeList:number[];
}

function ErpSelectAccountPayableDialog(option: IDialogOption) {
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

export default ErpSelectAccountPayableDialog
