import instance from '@/utils/request'

export const tem = () => {
    return instance({
        method: "",
        url: ""
    })
}

// 无参数 获取一级目录
export const reqCategory1 = () => {
    return instance({
        method: "get",
        url: "/admin/product/getCategory1"
    })
}

// 通过1级选项的id 获取二级目录
export const reqCategory2 = (category1Id) => {
    return instance({
        method: "get",
        url: `/admin/product/getCategory2/${category1Id}`
    })
}

// 通过2级选项的id 获取三级目录
export const reqCategory3 = (category2Id) => {
    return instance({
        method: "get",
        url: `/admin/product/getCategory3/${category2Id}`
    })
}

// 根据三级id获取商品属性列表
export const reqAttrList = ({ category1Id, category2Id, category3Id }) => {
    return instance({
        method: "get",
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}

// 发送添加获修改属性值的请求
export const reqAddOrUpdateAttrVal = (AttrInfo) => {
    return instance({
        method: "post",
        url: "/admin/product/saveAttrInfo",
        data: AttrInfo
    })
}

// 删除某一属性
export const delAttr = (attrId) => {
    return instance({
        method: "delete",
        url: `/admin/product/deleteAttr/${attrId}`
    })
}