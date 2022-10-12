import {createApp} from 'vue'
import SelectClientDialog from '@/components/dialog/selectInfo/client/SelectClientDialog.vue'
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function ErpSelectClientDialog(option: IDialogOption) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(SelectClientDialog, {
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

