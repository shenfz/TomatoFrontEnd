
// 当前登录者 信息
import modUserAPI,{MainUserInfo} from "@/api/userApi";
import {changeLocale,mergeLpk} from "@/config/lpk";
import {LOGIN_TOKEN} from "@/utils/constants";


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

export default {
    // get log in user info
    getLoginUser() {
         return iLoginUser
    },
    // lpk method load in appCtrl
    changeLocale,
    mergeLpk
}