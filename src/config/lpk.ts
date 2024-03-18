// 语言包

import {get, isArray, isEmpty} from 'lodash'
import {LOCALE_OPTIONS} from "@/utils/constants";
import { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'

const stLocaleStorageKeyName = 'locale'  // 本地缓存的语言字段保存key
const tbLpk: Record<string, string | string[]> = {}

// 初始化系统语言环境
export  const initLpk = () => {
    // 通配符的形式取到所有lpk文件内容 json  ， eager=true 表示同步的形式，false为异步，返回异步方法
    mergeLpk(import.meta.glob('@/locales/*',{eager: true}))
}

// 初始化第三方UI库的语言包环境
const initThirdUILpk = () => {
     const tblThirdLpk: GlobalType.IRecord = {
       //  LOCALE_OPTIONS[1]: enUS,

     }
}

// 动态获取当前语言环境
export const getLocale = () => {
    const stDefaultLocale = 'zh_CN'
    let stLanguage = stDefaultLocale
    // 1. 优先从登录者自定义信息获取, lodash.get  按名获取结构里的值
       stLanguage = get(app.getAppCtrl().getLoginUser() as any,'customer.locale')
    // 2. 其次从本地存储中获取
       stLanguage = stLanguage || Tools.LocalStorage.getItem(stLocaleStorageKeyName)
    // 3.最终使用默认语言环境
      stLanguage = stLanguage || stDefaultLocale
    return stLanguage
}

// 定义类型 约束合并lpk需要的 传参类型
type ImportLpkFileType = {
    [path:string]: {
        default: Record<string, string | string[]>
    }
}
//
// type InstanceLpkFileItem = {
//     default: Record<string, string | string[]>
// }

// 合并语言包 ，给业务块UI自己选择使用

/*
*  {
*     'zh_CN.js': {
*           default: {
*                'Index' : '主页'
*            }
*      }
*   },
* *     'en_US.js': {
*           default: {
*                'Index' : '主页'
*            }
*      }
*   }
* */
export const mergeLpk = (importLpkFiles:ImportLpkFileType) => {
    const localesLanguage = getLocale()   // 本地语言环境
    for (const path in importLpkFiles) {
        if (-1 == path.indexOf(localesLanguage)) { // 检查本地加载lpk哪些是无关的，跳过
            continue
        }

       // console.log("001")
        const {default: instanceLpkFileItem} = importLpkFiles[path]
        for (const stLpkKey in instanceLpkFileItem){
            tbLpk[stLpkKey] = instanceLpkFileItem[stLpkKey] //存在导出对象里面
        }
    }

}

export const changeLocale = (newLocale:string)=> {

    if (!LOCALE_OPTIONS.includes(newLocale)){
        return
    }

  // 1. 如果用户已登录 需要调用api更新用户自定义语言环境信息

  // 2. 载本地缓存新的语言包
    Tools.LocalStorage.setItem(stLocaleStorageKeyName,newLocale)
  // 3. refresh page
    document.location.reload()
}

// lpk('key',{index:2 ，default:1}
export type IFnLpk = (key:string,option?:{index?:number,default?:string}) => string
export const lpk:IFnLpk = (key,option = {}) => {
    const mixValue = tbLpk[key]
   // console.log(mixValue)
    if (isArray(mixValue)) {
        if (!mixValue.length){
       //     console.log('002')
            return option.default || key  // 长度为空，返回默认，无默认则返回 key
        }
      //  console.log('003')
        return mixValue[option.index || 0] || option.default ||  key // 索引index，无则取0号位元素，若index越界，则返回key
    }

    // if (isEmpty(mixValue)){
    //     return option.default || key
    // }
    //console.log('004')
    return mixValue || option.default || key
}

