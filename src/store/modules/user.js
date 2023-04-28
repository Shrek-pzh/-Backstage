import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes, asyncRoutes, anyRoutes } from '@/router'

import cloneDeep from 'lodash/cloneDeep'

import router from '@/router/index'
// console.log("111", router); // 是否为 undefined取决于main.js两个文件引入的顺序

// 定义方法 作用：根据权限过滤异步路由
const asyncRouterFilter = (asyncRoutes, routes) => {
    return asyncRoutes.filter(item => {
        //数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1 
        if (routes.indexOf(item.name) !== -1) {
            //递归:别忘记还有2、3、4、5、6级路由
            if (item.children && item.children.length) { item.children = asyncRouterFilter(item.children, routes) }
            return true
        }
    })
}
// 定义方法 作用：重置state
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        routes: [],
        buttons: [],
        // 过滤得到的异步路由
        resultasyncroutes: [],
        // 根据角色权限最终展示的全部路由，之所以写在state中，是可以响应式提供给路由导航栏进行遍历
        resultAllRoutes: []
    }
}

export const send = () => {
    if (state.resultAllRoutes.length == 0) return 55
}
const state = getDefaultState()

const mutations = {

    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, params) => {
        state.token = params
    },
    // 此处已经根据不同角色获取了权限，所以直接根据权限在这个函数中处理即将展示的路由
    SET_USERINFO: (state, params) => {
        state.name = params.name
        state.avatar = params.avatar
        state.routes = params.routes
        state.buttons = params.buttons

        // 过滤获得的异步路由
        state.resultasyncroutes = asyncRouterFilter(cloneDeep(asyncRoutes), state.routes)
        // 最终所有的路由 通过数组拼接方法获得最终所有路由
        state.resultAllRoutes = constantRoutes.concat(state.resultasyncroutes, anyRoutes)

        // ！！注意 addRoutes会覆盖原静态设置的路由
        // 最终的路由路径必须利用 addRoutes方法进行添加，否则即便有相应路径进行跳转时也无法被找到
        state.resultAllRoutes.forEach(item => {
            router.addRoute(item)
        })
    },
    GETROUTES(state) {
        console.log(852);
        return state.resultAllRoutes
    }
}

const actions = {
    GETROUTES({ commit }) {
        console.log(852);
        return 11
    },
    // user login
    async Login({ commit }, userInfo) {
        const { username, password } = userInfo
        let { data } = await login({ username: username.trim(), password: password })
        commit('SET_TOKEN', data)
        setToken(data.token)
        return "ok"
    },

    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                // 传入数据包括用户名称、头像、角色权限、按钮权限

                commit("SET_USERINFO", data)

                // 计算所有动态路由，依靠promise对象返回到路由守卫中重新进行路由添加
                const allroutes = asyncRouterFilter(cloneDeep(asyncRoutes), data.routes);
                const resultAllRoutes = constantRoutes.concat(allroutes, anyRoutes)
                resolve(resultAllRoutes)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

