import {createApp} from 'vue'
import dialog, {IAccountsPayableDialog} from '@/components/dialog/selectInfo/selectAccountsPayable/SelectAccountsPayableDialog.vue'
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

function ErpSelectAccountsPayableDialog(option: IAccountsPayableDialog) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const app = createApp(dialog, {
        unmount: async () => {
            await app.unmount();
            await document.body.removeChild(dom);
        },
        ...option
    });
    app.use(ElementPlus, {
        locale
    });
    app.mount(dom);
}

export default ErpSelectAccountsPayableDialog
