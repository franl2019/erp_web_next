import moment from "moment";
import {Router} from "vue-router";
import {DirectiveBinding} from "@vue/runtime-core";
import useErpDialog from "@/components/dialog/useErpDialog";
import {CodeType} from "@/types/CodeType";
import router from "@/router";
import {config} from "@/config/env";
import {tabMenu} from "@/components/router_tab/useRouterTab";

export function useLocalStorageSave(key: string, value: string): void {
    window.localStorage.setItem(key, value)
}

//Get localStorage
export function useLocalStorageGet(key: string): string {
    return window.localStorage.getItem(key) || ''
}

//格式化树形数据
export function useFormatDataTree<T>(data: any, id: string, pid: string): T[] {
    let _data = JSON.parse(JSON.stringify(data));
    return _data.filter((p: { [x: string]: number; children: any; }) => {
        const _arr = _data.filter((c: { [x: string]: number; }) => p[id] === c[pid]);
        _arr.length && (p.children = _arr)
        return p[pid] === 0
    })
}

//禁用空格和回车
export function useDisableKey(isDisable: boolean) {
    if (isDisable) {
        document.onkeydown = (event) => {
            if (event.key === " " || event.key === "Enter") {
                return false
            }
        }
    } else {
        document.onkeydown = function () {
        }
    }
}

//获取今天日期
export function useDateFormat(date:any): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

//获取今天日期
export function getToday(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

//获取开始日期
export function getStartDate(): string {
    return moment().startOf("month").format('YYYY-MM-DD HH:mm:ss');
}

//获取结束日期
export function getEndDate(): string {
    return moment().endOf("month").format('YYYY-MM-DD HH:mm:ss');
}

export function useRouterPage(fullPath: string, title: string) {
    if (config.mode === "WEB") {
        router.push(fullPath).then(
            () => {
                tabMenu.addTab({
                    key: fullPath,
                    activation: false,
                    showCloseButton: true,
                    title
                })
            }
        )
    } else if (config.mode === "ELECTRON") {
        // const {ipcRenderer} = require("electron");
        router.push(fullPath).then(
            () => {
                tabMenu.addTab({
                    key: fullPath,
                    activation: false,
                    showCloseButton: true,
                    title
                })
            }
        )
    }
}

export function useRouterReportToSheet(router: Router, option: { correlationId: number; correlationType: CodeType; correlationCode: string }) {
    if (option.correlationId > 0) {
        switch (option.correlationType) {

            case CodeType.accountInCome: {
                const route = router.resolve({
                    name: "accountInComeEdit",
                    query: {
                        accountInComeId: String(option.correlationId)
                    }
                })
                useRouterPage(route.fullPath, route.meta.title as string)
            }
                break

            case CodeType.accountExpenditure: {
                const route = router.resolve({
                    name: "accountExpenditureEdit",
                    query: {
                        accountExpenditureId: String(option.correlationId)
                    }
                })
                useRouterPage(route.fullPath, route.meta.title as string)
            }
                break

            case CodeType.HXD: {
                const route = router.resolve({
                    name: 'accountsVerifySheetEdit',
                    query: {
                        accountsVerifySheetId: String(option.correlationId)
                    }
                })
                useRouterPage(route.fullPath, route.meta.title as string)
            }
                break

            case CodeType.XS: {
                const route = router.resolve({
                    name: "editOutbound", query: {
                        outboundid: String(option.correlationId)
                    }
                });
                useRouterPage(route.fullPath, route.meta.title as string)
            }
                break

            case CodeType.buyInbound: {
                const route = router.resolve({
                    name: 'editBuyInbound',
                    query: {
                        inboundcode: option.correlationCode
                    }
                });
                useRouterPage(route.fullPath, route.meta.title as string)
            }
                break


            default:
                break
        }
    }
}

export function debounce(fn: any, delay: number = 300) {
    let t: NodeJS.Timeout | null = null
    return () => {

        if (t) {
            clearTimeout(t)
        }

        //等待1秒后将 t 置为 null，在这1秒内如果再点击事件就会去到if(t)的执行
        t = setTimeout(async () => {
            await fn()
            t = null
        }, delay)
    }
}

export const v_douClick = {
    name: 'debounceClick',
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el: any, binding: DirectiveBinding) {
        // 下面会介绍各个参数的细节
        el.addEventListener('click', debounce(binding.value))
    },
    // 在元素被插入到 DOM 前调用
    beforeMount() {
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted() {
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate() {
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated() {
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount() {
    },
    // 绑定元素的父组件卸载后调用
    unmounted() {
    }
}

export const v_reqClick = {
    name: 'reqClick',
    // 在绑定元素的 attribute 前
    // 或事件监听器应用前调用
    created(el: any, binding: DirectiveBinding) {
        // 下面会介绍各个参数的细节
        el.addEventListener('click', async () => {
            el.disabled = true
            binding.value().then(() => {
                el.disabled = false;
            }, (err: any) => {
                el.disabled = false;
                useErpDialog({
                    title: "错误提示",
                    message: (err as Error).message,
                    closeBtnVisible: false
                })
            }).catch((err: any) => {
                el.disabled = false;
                useErpDialog({
                    title: "错误提示",
                    message: (err as Error).message,
                    closeBtnVisible: false
                })
            })
        })
    },
    // 在元素被插入到 DOM 前调用
    beforeMount() {
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted() {
    },
    // 绑定元素的父组件更新前调用
    beforeUpdate() {
    },
    // 在绑定元素的父组件
    // 及他自己的所有子节点都更新后调用
    updated() {
    },
    // 绑定元素的父组件卸载前调用
    beforeUnmount() {
    },
    // 绑定元素的父组件卸载后调用
    unmounted() {
    }
}
