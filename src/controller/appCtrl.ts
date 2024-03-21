
// 当前登录者 信息
import modUserAPI,{MainUserInfo} from "@/api/userApi";
import {changeLocale,mergeLpk} from "@/config/lpk";
import {LOGIN_PATH, LOGIN_TOKEN} from "@/utils/constants";
import {changeTheme} from "@/config/theme";


let iLoginUser:MainUserInfo = {} as MainUserInfo

// load logon user info
export const getLoginUserInfo = async ()=> {
    // check cookies
    if (Tools.Cookie.getItem(LOGIN_TOKEN)){
        // > exist user,get it,maybe need request from backend
        iLoginUser = await modUserAPI.getSelfInfo()
        console.log('login user info',iLoginUser)
    }
}

// redirect to login page


export default {
    // get log in user info
    getLoginUser() {
         return iLoginUser
    },
    redirectToLogin() {
        // 清理登录者信息和token
        iLoginUser = {} as MainUserInfo
        Tools.Cookie.removeItem(LOGIN_TOKEN)
        document.location.href = LOGIN_PATH
    },
    // lpk method load in appCtrl
    changeLocale,
    mergeLpk,
    changeTheme
}