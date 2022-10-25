import {h, render} from "vue";


export function useErpDialogDemo<T>(component: any, option: T):Promise<any> {
    return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        render(h(component, {
            unmount: () => {
                render(null, container);
                document.body.removeChild(container);
            },
            ...option,
            resolve_dialog:resolve,
            reject_dialog:reject,
        }), container);
        document.body.appendChild(container);
    })
}