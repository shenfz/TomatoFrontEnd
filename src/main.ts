import { createApp } from "vue"
import App from './App.vue'
import {initApp} from "@/config/init";
// import 'normalize.css/normalize.css'
// import './assets/fonts/font.css'
// import './assets/styles/global.scss'

(async  () => {

    // 初始化系统基础配置信息【确保加载完成后，创建UI】

    // 1.全局变量global，语言包lpk ,ajax, tools定义
    // 2.异步加载基础模块的配置信息
    //   > load system status
    //   > load info of user who login before

    // 3.异步加载业务模块，完成基本的初始化
     initApp()
    // 初始化UI
    const iApp = createApp(App)
    //注册全局组件

    // 根组件绑定全局对象
     iApp.config.globalProperties.app = window.app
     iApp.config.globalProperties.tools = window.Tools
     iApp.config.globalProperties.lpk = window.lpk

    // 初始化状态管理和路由，渲染根组件
     iApp.mount('#app')

})()
