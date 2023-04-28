import instance from '@/utils/request'

export const tem = () => {
    return instance({
        method: "",
        url: ""
    })
}

// 获取spu的图片列表
export const reqSpuImgList = (spuId) => {
    return instance({
        method: "get",
        url: `/admin/product/spuImageList/${spuId}`
    })
}

// 获取spu销售属性列表
export const reqSpuSaleAttrlist = (spuId) => {
    return instance({
        method: "get",
        url: `/admin/product/spuSaleAttrList/${spuId}`
    })
}

// 获取SKU平台属性列表
export const reqAttrInfolist = (category1Id, category2Id, category3Id) => {
    return instance({
        method: "get",
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}

// 添加sku列表请求
export const AddOrUpdateSku = (skuInfo) => {
    return instance({
        method: "post",
        url: "/admin/product/saveSkuInfo",
        data: skuInfo
    })
}

// 请求sku的展示列表
export const reqSkuList = (page, limit) => {
    return instance({
        method: "get",
        url: `/admin/product/list/${page}/${limit}`
    })
}

// sku上架请求
export const reqonSale = (skuId) => {
    return instance({
        method: "get",
        url: `/admin/product/onSale/${skuId}`
    })
}

// sku上架请求
export const reqcancelSale = (skuId) => {
    return instance({
        method: "get",
        url: `/admin/product/cancelSale/${skuId}`
    })
}

// sku上架请求
export const reqdelSku = (skuId) => {
    return instance({
        method: "delete",
        url: `/admin/product/deleteSku/${skuId}`
    })
}

// 根据id请求sku详细信息进行展示
export const reqSkuDetail = (skuId) => {
    return instance({
        method: "get",
        url: `/admin/product/getSkuById/${skuId}`
    })
}