import { createApp } from "vue"
import App from './App.vue'
import {initApp,initGlobalComponent} from "@/config/init";

import '@/assets/styles/base-theme.scss'
import '@/assets/styles/blue-theme.scss'
import '@/assets/styles/black-theme.scss'

import 'normalize.css/normalize.css'
import './assets/fronts/iconfont.css'
import './assets/styles/global.scss'
import {initRouter} from "@/router";

(async  () => {

    // 初始化系统基础配置信息【确保加载完成后，创建UI】
    // 全局变量global，语言包lpk ,ajax, tools定义
    // 异步加载基础模块的配置信息
    //   > load system status
    //   > load info of user who log in before
    //

    // ajax============
    //

    // 异步加载业务模块，完成基本的初始化
    await initApp()
    // 初始化UI
    const iApp = createApp(App)
    //注册全局组件
    await initGlobalComponent(iApp)
    // 根组件绑定全局对象
     iApp.config.globalProperties.app = window.app
     iApp.config.globalProperties.tools = window.Tools
     iApp.config.globalProperties.lpk = window.lpk

    // 初始化状态管理和路由，渲染根组件
    // 1. basic route
    // 2. business route
    // 3. 路由守卫
    // 4. keep-alive using
     iApp.use(initRouter()).mount('#app')

})()
