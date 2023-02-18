import {h, render} from "vue";
import {v4 as uuidV4} from 'uuid';


export function erpDialogFactory<T>(component: any, option: any):Promise<T> {
    return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        container.id = uuidV4();
        const vNode = h(component, {
            unmount: () => {
                render(null, container);
                document.body.removeChild(container);
            },
            ...option,
            resolve_dialog:resolve,
            reject_dialog:reject,
        })
        render(vNode, container);
        document.body.appendChild(container);
    })
}