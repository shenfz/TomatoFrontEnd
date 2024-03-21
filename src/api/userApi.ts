// logon user main information
import baseApi from './BaseApi'
import {get} from 'lodash'

export interface MainUserInfo{
    id:number
    name:string
}

const userInitApiReqParams:BaseAPIType.IInitParams = {
    uri:{
        get: {
            path:'/data_get.json',
            errMsg:'err.user.load',
            urlTransfer(path:string,item:GlobalType.IRecord):string{
                return path
            }, // url 转换
            paramsTransfer(path:string,item:GlobalType.IRecord):GlobalType.IRecord{
                return item
            }
        },
        list: {path:'/data_list.json',errMsg:'err.user.list'},

    },
    // mapper作为转换器，传入，类似于处理方法
    mapper(item:GlobalType.IRecord):MainUserInfo{
        return {
            // 从后端返回内容里面 根据字段名 取值，赋给
            id: get(item,'id'),
            name: get(item,'name')
        }
    },

}

export default {
    ...baseApi.initApi<MainUserInfo,Pick<BaseAPIType.IMethods<MainUserInfo>,'get' | 'list'>>(userInitApiReqParams),
    getSelfInfo(): Promise<MainUserInfo>{
         return Promise.resolve({
             id: 1,
             name: 'Tim'
         })
    }
}