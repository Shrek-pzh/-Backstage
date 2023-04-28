import request from '@/utils/request'

export const tem = () => {
    return request({
        method: "",
        url: ``
    })
}

// 请求用户列表 可以进行搜索
export const reqUserList = (page, limit, username = "") => {
    return request({
        method: "get",
        url: `/admin/acl/user/${page}/${limit}?username=${username}`
    })
}

// 添加新用户
export const reqAddUser = (data) => {
    return request({
        method: "post",
        url: `/admin/acl/user/save`,
        data
    })
}