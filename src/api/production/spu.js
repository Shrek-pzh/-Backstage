import instance from '@/utils/request'

export const tem = () => {
    return instance({
        method: "",
        url: ""
    })
}

// 请求spu列表进行展示
export const reqSpuList = (page, limit, category3Id) => {
    return instance({
        method: "get",
        url: `/admin/product/${page}/${limit}`,
        params: { category3Id }
    })
}

// 请求spu的基本信息 其中包含准确的spu名称以及描述
export const reqSpuInfo = (spuId) => {
    return instance({
        method: "get",
        url: `/admin/product/getSpuById/${spuId}`
    })
}

// 请求基本的品牌列表
export const reqBaseTrademark = () => {
    return instance({
        method: "get",
        url: "/admin/product/baseTrademark/getTrademarkList"
    })
}

// 获取spu基本的销售属性 本接口只固定提供三个
export const reBaseSaleAttrList = () => {
    return instance({
        method: "get",
        url: "/admin/product/baseSaleAttrList"
    })
}

// 获取spu的图片列表
export const reqSpuImgList = (spuId) => {
    return instance({
        method: "get",
        url: `/admin/product/spuImageList/${spuId}`
    })
}

// 添加或是更新spu
export const AddOrUpdateSpu = (spuInfo) => {
    let url = spuInfo.id ? "/admin/product/updateSpuInfo" : "/admin/product/saveSpuInfo"
    console.log(url);
    return instance({
        method: "post",
        url,
        data: spuInfo
    })
}

// 删除对应的spu
export const reqRemoveSpu = (spuId) => {
    return instance({
        method: "delete",
        url: `/admin/product/deleteSpu/${spuId}`
    })
}

// 根据spuid获取sku列表展示
export const reqSkulistbyId = (spuId) => {
    return instance({
        method: "get",
        url: `/admin/product/findBySpuId/${spuId}`
    })
}
const a = {
    "category3Id": 0,
    "description": "string",
    "spuName": "string",
    "tmId": 0,
    "spuImageList": [
        {
            "id": 0,
            "imgName": "string",
            "imgUrl": "string",
            "spuId": 0
        }
    ],
    "spuSaleAttrList": [
        {
            "baseSaleAttrId": 0,
            "id": 0,
            "saleAttrName": "string",
            "spuId": 0,
            "spuSaleAttrValueList": [
                {
                    "baseSaleAttrId": 0,
                    "id": 0,
                    "isChecked": "string",
                    "saleAttrName": "string",
                    "saleAttrValueName": "string",
                    "spuId": 0
                }
            ]
        }
    ],
}