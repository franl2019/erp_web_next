import {IProductArea} from "@/module/productArea/productArea";

class ProductAreaCache {
    private cacheList:IProductArea[] = []

    public getCache(){
        return JSON.parse(JSON.stringify(this.cacheList)) as IProductArea[]
    }

    public setCache(productArea:IProductArea[]){
        this.cacheList = productArea;
    }
}

const productAreaCache = new ProductAreaCache();

export default productAreaCache