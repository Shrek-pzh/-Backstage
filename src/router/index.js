import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 注意！！不能在router中进行异步路由的过滤，因为这是角色登录后才能进行的操作，在store中操作最为合适
import store from '../store/index'
// console.log(store); // 是否为 undefined取决于main.js两个文件引入的顺序

import Cookies from 'js-cookie'
const TokenKey = 'shrek_token'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 要实现不同角色登录获取不同权限，路由必须进行拆分：常量路由、异步路由、任意路由
// 1、常量路由:就是不关用户是什么角色，都可以看见的路由
// 2、异步理由:不同的用户（角色），需要过滤筛选出的路由，称之为异步路由。有的用户可以看见测试管理、有的看不见
// 3、任意路由：当路径出现错误的时候重定向404

export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    // 首页路由、展示可视化数据
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    // 原模板路由 form
    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: 'Form', icon: 'form' }
            }
        ]
    },

    // // 原模板路由 nested
    // {
    //     path: '/nested',
    //     component: Layout,
    //     redirect: '/nested/menu1',
    //     name: 'Nested',
    //     meta: {
    //         title: 'Nested',
    //         icon: 'nested'
    //     },
    //     children: [
    //         {
    //             path: 'menu1',
    //             component: () => import('@/views/nested/menu1/index'), // Parent router-view
    //             name: 'Menu1',
    //             meta: { title: 'Menu1' },
    //             children: [
    //                 {
    //                     path: 'menu1-1',
    //                     component: () => import('@/views/nested/menu1/menu1-1'),
    //                     name: 'Menu1-1',
    //                     meta: { title: 'Menu1-1' }
    //                 },
    //                 {
    //                     path: 'menu1-2',
    //                     component: () => import('@/views/nested/menu1/menu1-2'),
    //                     name: 'Menu1-2',
    //                     meta: { title: 'Menu1-2' },
    //                     children: [
    //                         {
    //                             path: 'menu1-2-1',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //                             name: 'Menu1-2-1',
    //                             meta: { title: 'Menu1-2-1' }
    //                         },
    //                         {
    //                             path: 'menu1-2-2',
    //                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //                             name: 'Menu1-2-2',
    //                             meta: { title: 'Menu1-2-2' }
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     path: 'menu1-3',
    //                     component: () => import('@/views/nested/menu1/menu1-3'),
    //                     name: 'Menu1-3',
    //                     meta: { title: 'Menu1-3' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'menu2',
    //             component: () => import('@/views/nested/menu2/index'),
    //             name: 'Menu2',
    //             meta: { title: 'menu2' }
    //         }
    //     ]
    // },

    // // 原模板路由 links
    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //             meta: { title: 'External Link', icon: 'link' }
    //         }
    //     ]
    // },

]

// 异步路由，角色权限控制
export const asyncRoutes = [
    // 产品路由 包含品牌管理、spu管理、sku管理、平台属性管理
    {
        name: "Product",
        path: "/production",
        component: Layout,
        meta: { title: "商品管理", icon: "el-icon-star-on" },
        children: [
            {
                name: "Trademark",
                path: "trademark",
                component: () => import("@/views/product/tradeMark"),
                meta: { title: "品牌管理" }
            },
            {
                name: "Attr",
                path: "attr",
                component: () => import("@/views/product/Attr"),
                meta: { title: "平台商品属性管理" }
            },
            {
                name: "Spu",
                path: "spu",
                component: () => import("@/views/product/Spu"),
                meta: { title: "Spu管理" }
            },
            {
                name: "Sku",
                path: "sku",
                component: () => import("@/views/product/Sku"),
                meta: { title: "Sku管理" }
            },
        ]
    },
    // 权限管理路由
    {
        name: "Acl",
        path: "/acl",
        redirect: "/acl/user",
        component: Layout,
        meta: { title: "权限管理", icon: "el-icon-user-solid" },
        children: [
            {
                name: "User",
                path: "user",
                component: () => import("@/views/acl/user"),
                meta: { title: "用户管理" }
            },
            {
                name: "Role",
                path: "role/list",
                component: () => import("@/views/acl/role"),
                meta: { title: "角色管理" }
            },
            {
                name: "RoleAuth",
                path: "role/auth/:id",
                component: () => import("@/views/acl/role/auth.vue"),
                meta: { title: "角色授权" },
                // 将本路由在导航栏隐藏
                hidden: true,

            },
            {
                name: "RoleAuth",
                path: "permission",
                component: () => import("@/views/acl/permission"),
                meta: { title: "菜单管理" }
            },

        ]
    },
]

// 任意路由 意外路由路径跳转 404页面
export const anyRoutes = [
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

// 注意！！this.$router.options 可以获得 new Router()传入的配置对象
const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    //注册的路由是‘死的’，‘活的’路由如果根据不同用户（角色）可以展示不同菜单
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

let AuthInit = true
router.beforeEach(async (to, from, next) => {
    // 如果跳转登录路由 直接放行
    if (to.path == "/login") {
        next()
    }
    // 否则进行cookies判断，没有cookies跳转登录  有cookies判断是否为页面刷新，页面刷新则需要重新添加路由
    else {
        if (Cookies.get(TokenKey)) {
            if (AuthInit) {
                try {
                    // 标识位 保证页面只在页面刷新的时候添加一次路由
                    AuthInit = false
                    // 获取所有路由进行动态添加
                    const all = await store.dispatch("user/getInfo")
                    all.forEach(element => {
                        router.addRoute(element)
                    });
                    // 如果 addRoute 并未完成，路由守卫会一层一层的执行执行，直到 addRoute 完成，找到对应的路由
                    next({ ...to, replace: true })
                } catch (error) {
                    // cookies失效，需要重新登录
                    // 退出登录，重置信息
                    await store.dispatch("user/logout")
                    next("/login")
                }
            }
            else next()
        } else next('/login')
    }

})
export default router
