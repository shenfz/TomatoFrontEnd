import app from "./app"
import Tools from "@/utils/Tools";
import {initLpk,lpk} from "@/config/lpk";
import {getLoginUserInfo} from '@/controller/appCtrl'
import {App} from "vue";
import {initTheme} from "@/config/theme";

// 往 window 上挂载全局变量
// 但是不能随意挂载，需要约束

type IGlobalVarsKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
type IGlobalVars = {
    [key in IGlobalVarsKey]?: any
}

const iGlobalVars:IGlobalVars = {
    app,  // 全局应用对象 包括全局数据和应用方法
    Tools, // 全局工具库对象
    lpk,  // 全局 语言包支持函数
    Ajax, // 全局请求库
}

Object.keys(iGlobalVars).forEach(stKey => {
    (window as any)[stKey as IGlobalVarsKey] = iGlobalVars[stKey as IGlobalVarsKey]
})

export const initApp = async () => {
    // . load info of user who log in before
    await getLoginUserInfo()

    // .主题定制，有以下几种实现方式
    // 1.样式文件，server端取来使用
    // 2.scss变量与scss函数 和 mixin来实现主题定制 [参考assets/styles 下 theme-vars 和 themehandle 俩文件 ]
    //   引用则通过 @include 方法名(参数名) 获得参数, eg: @include bg()
    // 3. 通过css变量来实现主题的定制
    //  参考base-theme,black-theme,blue-theme实现 , 使用则通过引用变量名 eg: var(--theme-color-6);
    initTheme()
    // .load language pkg
    initLpk()  // 加载语言包到缓存

    // .load whole business model
      // > get all entry file, range and init
    const  allEntry:GlobalType.IRecord = import.meta.glob('@/bmod/*/entry.ts',{eager: true})
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
