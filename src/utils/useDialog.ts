import {h, render} from "vue";


export function useDialogDemo<T>(component:any,option:T) {
    const container = document.createElement('div');
    render(h(component, {
        unmount: () => {
            render(null, container);
            document.body.removeChild(container);
        },
        ...option
    }), container);
    document.body.appendChild(container);
}