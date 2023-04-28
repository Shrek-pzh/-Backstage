import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'

// 注意！！！要在router.js文件中进入 store进行应用，
// 就必须将 import router from './router'写在 import store from './store'上面。否则引入的 store为 undefined
// import router from './router'
// import store from './store'

// 相反的：要在 store文件中引入 router进行应用，
// 就必须将 import store from './store'写在 import router from './router'上面。否则引入的 router 为 undefined
import router from './router'

import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

// ********以下为非模板内容引入*******
// 引入数据请求接口
import API from '@/api'
Vue.prototype.$API = API

// 注册程序员的全局组件
import sangjiNav from '@/components/sangJiNav'
import hintButton from '@/components/HintButton'

Vue.component(sangjiNav.name, sangjiNav)
Vue.component(hintButton.name, hintButton)


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {

    }
})
