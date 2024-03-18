// 系统主题定义
import {THEME_OPTIONS} from "@/utils/constants";
import {get, now} from "lodash";
// save to local storage , key name
const stThemeStorageName:string = 'theme'
// default theme name
const stDefaultThemeName:string = THEME_OPTIONS[0]
// 当前用户使用的主题
let nowCustomerUsingTheme:any = ''

// 初始化系统主题
export const initTheme = () => {
  changeTheme(getTheme(),false)
}

export const changeTheme = (newThemeName:string,needSave:boolean) => {
    if (!THEME_OPTIONS.find(item => item == newThemeName)){
        // 设置主题不存在 或者 same
        return
    }

    // if  user login before, use api for fresh new theme
    document.documentElement.setAttribute('data-theme',nowCustomerUsingTheme)
    // save new theme to local storage
      // do not need to save or new theme same as nowTheme,return
    if (!needSave || newThemeName == nowCustomerUsingTheme){
        return;
    }

    nowCustomerUsingTheme = newThemeName
    Tools.LocalStorage.setItem(stThemeStorageName,nowCustomerUsingTheme)
}


export const getTheme = () => {
    if (nowCustomerUsingTheme){
        return nowCustomerUsingTheme
    }
    const iLoginUser = app.getAppCtrl().getLoginUser()
     // get theme from login user info firstly
     nowCustomerUsingTheme = get(iLoginUser,'userMeta.theme')
     nowCustomerUsingTheme = nowCustomerUsingTheme || Tools.LocalStorage.getItem(stDefaultThemeName)

     nowCustomerUsingTheme = nowCustomerUsingTheme || stDefaultThemeName

}