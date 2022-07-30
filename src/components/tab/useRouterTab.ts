import {ref, Ref} from "vue";

export interface Tab {
    key: string;
    title: string;
    activation: boolean;
    showCloseButton: boolean;
}

export class TabMenu {

    private readonly tabList: Ref<Tab[]>

    constructor(tab: Ref<Tab[]>) {
        this.tabList = tab;
        this.addTab({
            key:'/controlHome', activation: true, showCloseButton: false, title: "首页"
        })
    }

    private static deactivate(tab: Tab) {
        tab.activation = false
    }

    private static activation(tab: Tab) {
        tab.activation = true;
    }

    public getTabMap() {
        return this.tabList;
    }

    //激活tab
    public activationTab(tabKey: string): boolean {
        const tab = this.findOne(tabKey);
        if (tab) {
            TabMenu.activation(tab)

            //停用其他tab
            this.tabList.value.forEach((tab: Tab) => {
                if (tab.key !== tabKey) {
                    TabMenu.deactivate(tab)
                }
            })

            return true
        } else {
            return false
        }
    }

    public closeTab(tabKey: string) {
        const tab = this.findOne(tabKey);
        if (tab) {
            this.delete(tabKey);
            //关闭激活状态的tab才返回
            if(tab.activation) return this.findLastOne()
        }
    }

    public addTab(tab: Tab) {
        const findTab = this.findOne(tab.key)
        if (findTab == undefined) this.tabList.value.push(tab)

        //添加后激活
        this.activationTab(tab.key);
    }

    private findLastOne() {
        const lastIndex = this.tabList.value.length
        if(lastIndex > 0){
            return this.tabList.value[lastIndex-1]
        }else{
            return null
        }
    }

    private findOne(tabKey: string): Tab | undefined {
        for (let i = 0; i < this.tabList.value.length; i++) {
            if (tabKey === this.tabList.value[i].key) return this.tabList.value[i]
        }
    }

    private delete(tabKey: string): boolean {
        let deleteIndex: number | undefined
        for (let i = 0; i < this.tabList.value.length; i++) {
            if (tabKey === this.tabList.value[i].key) deleteIndex = i
        }

        if (deleteIndex !== undefined) {
            this.tabList.value.splice(deleteIndex, 1);
            return true
        } else {
            return false
        }
    }
}

export const tabMenu = new TabMenu(ref([]));