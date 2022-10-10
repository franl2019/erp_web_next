import img_home from "@/assets/home.svg";
import img_sales from "@/assets/sale.svg";
import img_buyInbound from "@/assets/buyInbound.svg";
import img_setting from "@/assets/setting.svg";
import img_missing from "@/assets/missing.svg";
import img_account from "@/assets/account.svg";
import img_warehouse from "@/assets/warehouse.svg";

export interface IMenuConfig {
    menuId: number,
    title: string,
    path: string,
    style?: string,
    menuMx?: IMenuConfig[]
}

const menuConfigs: IMenuConfig[] = [
    {
        menuId: 1001,
        title: "首页",
        path: "controlHome",
        style: img_home,
    },
    {
        menuId: 1002,
        title: "销售管理",
        path: "saleHome",
        style: img_sales,
    },
    {
        menuId: 1003,
        title: "采购管理",
        path: "buyHome",
        style: img_buyInbound,
    },
    {
        menuId: 1004,
        title: "仓库管理",
        path: "warehouseHome",
        style: img_warehouse,
    },
    {
        menuId: 1005,
        title: "资金管理",
        path: "moneyHome",
        style: img_account,
    },
    {
        menuId: 1006,
        title: "基础资料管理",
        path: "baseInfoHome",
        style: img_missing,
    },
    {
        menuId: 1007,
        title: "系统设置",
        path: "systemHome",
        style: img_setting,
    }
]

export default menuConfigs;