import app from "./app"
import Tools from "@/utils/Tools";
import {initLpk,lpk} from "@/config/lpk";
import {getLoginUserInfo} from '@/controller/appCtrl'
import {entryInitFn} from "@/bmod/blog/entry";
import {App} from "vue";


// 往 window 上挂载全局变量
// 但是不能随意挂载，需要约束

type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars:IGlobalVars = {
    app,  // 全局应用对象 包括全局数据和应用方法
    Tools, // 全局工具库对象
    lpk,  // 全局 语言包支持函数
}

Object.keys(iGlobalVars).forEach(stKey => {
    (window as  any)[stKey as IGlobalVarsKey] = iGlobalVars[stKey as IGlobalVarsKey]
})

export const initApp = async () => {
    // 1. load info of user who log in before
    await getLoginUserInfo()
    // 2.load language pkg
    initLpk()  // 加载语言包到缓存

    // 3.load whole business model
      // > get all entry file, range and init
    const  allEntry:GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts')
    for (const path in allEntry) {
        const entryFile = allEntry[path]
        // make sure each entry file have init function
        entryFile && entryFile.entryInitFn && await entryFile.entryInitFn()
    }
}

// 注册全局组件
export const initGlobalComponent = async (uiApp: App<Element>) => {
    // 拿到 所有组件 src 目录下的vue组件
    const iALComponents:GlobalType.IRecord = import.meta.glob('@/components/*/src/*.vue',{eager: true })
    // 遍历对象  for in 也可以
    Object.keys(iALComponents).map((path:string) => {
        //  /src/components/Icon/src/icon.vue
       //  console.log(path)
        const pathSplitN = path.split('/')
        //  拿到注册的组件名 倒数第三个元素  eg: Icon
        const stComponentName = path[path.length - 3]
        //  register component name
        uiApp.component(stComponentName,iALComponents[path].default)

    })

}
