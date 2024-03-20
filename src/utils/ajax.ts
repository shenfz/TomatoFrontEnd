// ajax  封装
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import axios from "axios";
import qs from 'qs'
import { LOGIN_TOKEN} from "@/utils/constants";
import {data} from "autoprefixer";
import {get} from "lodash";

// define extend type from AxiosRequestConfig
export interface AxiosRequestConfigExt extends AxiosRequestConfig {
    reqParams:AxiosRequestConfigExt,  // 请求参数
    showLoading?: boolean, // 是否显示loading提示
    bIsNeedCachePrevent?:boolean//  是否加上防缓存的cp随机数
    bIsNeedJsonStringify?:boolean // 是否需要json.stringify
    bIsNeedQSStringify?:boolean // 是否需要qs.stringify
    force401ToLoginPage?:boolean // 401是否强制跳转到登录界面

}

export  interface IResponse<T = any>{
    code:number,
    msg:string,
    data: T,
}

// 设置axios 默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;charset=utf-8'

// timerLoading保存计时句柄，方便清除
let timerLoading: ITimeout

// 定义该模内的全局变量： axios新实例
const axiosNewInstance:AxiosInstance = axios.create({
    baseURL: app.getConfig('baseURL'),
    timeout: 10000, // 10s
})

// ==============================  Ajax 封装
const ajaxMethods = ['GET','POST','PUT','DELETE','PATCH']
// 定义每次请求的响应处理
axiosNewInstance.interceptors.response.use((res:AxiosResponse<IResponse>) => {
    // 1.请求未报异常处理
     // 清除loading计时器，且隐藏loading
      clearTimeout(timerLoading)
      Tools.showLoadMask()
     // 2.获取响应内容 , 以及外界调用请求传入的参数
    const {status,data,config} = res
    // config 是传参，且类型是拓展过的 AxiosRequestConfig ，因此可以用断言
    const {reqParams } = config as AxiosRequestConfigExt
    const { force401ToLoginPage = false } = reqParams
    // 3.处理状态码
    if (200 == status){
       if (401 == data.code && force401ToLoginPage){
           // 满足 未登录且需强制跳转登录页
           app.getAppCtrl().redirectToLogin()
           return
       }else if (data.code >= 400 && data.code <= 404 || data.code == 500){
           //TODO 协商后端处理状态码 做对应处理
           return Promise.reject(data)
       }
    }else{
        return Promise.reject(data)
    }
},(error) => {
    // 抛错
    // 1.清除loading计时器，且隐藏loading
    clearTimeout(timerLoading)
    Tools.hideLoadMask()
    // 2. TODO 解析错误 ，包装 ,要与后台对应
    let {msg ='Request Error',response} = error
    const stErrMsg = get(response,'data.msg',msg)
    return Promise.reject({msg: stErrMsg})
})

// 定义常用请求方法


 const Ajax = {
    // Promise指定类型，ts会反推类型，return出去的就相匹配
    request<T = any>(method:string,reqParams:AxiosRequestConfigExt):Promise<IResponse<T>>{
        // 获取请求参数
        let {
            url,
            params,
            headers = {},
            timeout,
            showLoading = true,
            bIsNeedCachePrevent,
            bIsNeedJsonStringify,
            bIsNeedQSStringify,
            force401ToLoginPage
        } = reqParams

        // 显示加载过程
        if (showLoading){
            // 先清除之前的,reset
            clearTimeout(timerLoading)
            timerLoading = setTimeout(() =>{
                Tools.showLoadMask()
            },200) // 200ms 后显示遮罩，如果请求在200ms内完成，则不显示

        }
        // 判断是否加缓存处理
        if(bIsNeedCachePrevent !== false){
            url = Tools.addCachePrevent(url);
        }
        // 内容处理
        bIsNeedJsonStringify && (params = JSON.stringify(params))
        bIsNeedQSStringify && (params = qs.stringify(params))

        // 设置登录token,存在则压入认证头
        const stLoginToken = Tools.Cookie.getItem(LOGIN_TOKEN)
        stLoginToken && (headers.Authorization = `Bearer ${stLoginToken}`)
        // 构造请求参数
        const iSendRequestParams:AxiosRequestConfigExt = {
            reqParams,
            url,
            method:(ajaxMethods.indexOf(method) > -1 ?method:'GET'), // 判断方法合规，不合规则默认GET
            [method === 'GET'?'params':'data']:params, //TODO 参数决断？ 当请求为GET 就使用params,否则 data
            headers: Object.assign({},headers), // TODO Object的使用
        }
        // 设置超时
        timeout && (iSendRequestParams.timeout = timeout)
        // 新实例 结合构造的请求参数 ，发起请求
        return axiosNewInstance.request(reqParams)
    }
}

export type IAjax = typeof Ajax