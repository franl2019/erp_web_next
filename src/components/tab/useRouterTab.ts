import {ref, Ref} from "vue";

interface Tab {
    title: string;
    activation: boolean;
    showCloseButton: boolean;
}

type TabMap = Map<string, Tab>

class TabMenu {

    private readonly tabMap: Ref<TabMap>

    constructor() {
        this.tabMap = ref(new Map());
        this.addTab('/controlHome', {
            activation: true, showCloseButton: false, title: "首页"
        })
    }

    public getTabMap() {
        return this.tabMap;
    }

    public activationTab(tabKey: string) {
        const tab = this.getTabMenu(tabKey);
        if (tab) {
            tab.activation = true;
            this.tabMap.value.set(tabKey, tab)

            this.tabMap.value.forEach((tab: Tab, key: string) => {
                if (key !== tabKey) {
                    this.deactivate(key)
                }
            })

            return true
        } else {
            return false
        }
    }

    public addTab(tabKey: string, tab?: Tab) {
        if (!this.activationTab(tabKey)) {
            if (tab) {
                this.setTabMenu(tabKey, tab)
                this.activationTab(tabKey)
            }
        }
    }

    public deleteTab(tabKey: string) {
        if (this.deleteTabMenu(tabKey)) {
            const lastTabKey = this.getTabLastOne()
            if (lastTabKey) {
                this.activationTab(lastTabKey)
                return lastTabKey
            }
        }
    }

    private getTabLastOne() {
        let lastOneTabKey
        this.tabMap.value.forEach((tab: Tab, key: string) => {
            lastOneTabKey = key
        });
        return lastOneTabKey
    }

    private getTabMenu(tabKey: string): Tab | undefined {
        return this.tabMap.value.get(tabKey)
    }

    private setTabMenu(tabKey: string, tab: Tab) {
        this.tabMap.value.set(tabKey, tab);
    }

    private deleteTabMenu(tabKey: string) {
        return this.tabMap.value.delete(tabKey)
    }

    private deactivate(tabKey: string) {
        const tab = this.getTabMenu(tabKey);
        if (tab) {
            tab.activation = false;
            this.tabMap.value.set(tabKey, tab)
            return true
        } else {
            return false
        }
    }
}

const tabMenu = new TabMenu()

export {tabMenu}
