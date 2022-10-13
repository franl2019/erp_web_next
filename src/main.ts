import {createApp} from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import {v_douClick, v_reqClick} from "@/utils";
import useErpDialog from "@/components/dialog/useErpDialog";

const app = createApp(App)

app.use(router);
app.use(ElementPlus, {
    locale
});

app.directive(v_douClick.name, v_douClick);
app.directive(v_reqClick.name, v_reqClick);

app.mount('#app');

app.config.errorHandler = (err: any) => {
    // ErpDialog({
    //     title: "错误提示",
    //     message: (err as Error).message,
    //     closeBtnVisible: false
    // })
    if (err.errorType === 'verifyParamError') {
        useErpDialog({
            title: "错误提示",
            message: (err as Error).message,
            closeBtnVisible: false
        })
    }
}