import instance from '@/utils/request'

// 请求logo展示数据
export const reqlogoList = (page, limit) => {
    return instance({
        method: "get",
        url: `/admin/product/baseTrademark/${page}/${limit}`
    })
}

// 移除logo请求
export const reqremovelogo = (id) => {
    return instance({
        method: "delete",
        url: `/admin/product/baseTrademark/remove/${id}`
    })
}

// 新增logo请求 参数不带id，由服务器生成
/* 
data={
  "id": 0,
  "logoUrl": "string",
  "tmName": "string"
}
*/
export const reqAddlogo = (data) => {
    return instance({
        method: "post",
        url: "/admin/product/baseTrademark/save",
        data
    })
}

// 修改logo请求 参数需要携带id
export const reqUpdatalogo = (data) => {
    return instance({
        method: "put",
        url: "/admin/product/baseTrademark/update",
        data
    })
}
export const tem = () => {
    return instance({
        method: "",
        url: ""
    })
}