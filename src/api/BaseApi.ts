// 基础API CRUD 方法暴露
// 返回对象，在在其他api对象中进行解构，使其继承方法
import {get} from 'lodash'
import {IResponse} from "@/utils/ajax";

type TUrlAndParamTransferFn = (methodType:string,uriItem:BaseAPIType.IURIItem,params:GlobalType.IRecord) => {url:string,params:GlobalType.IRecord}

const transferUrlAndParams:TUrlAndParamTransferFn = (methodType = 'get', uriItem, params = {}) =>{
    let url = uriItem.path
    if (methodType == 'get' || 'delete' == methodType){
        const stIdName = 'id'
        url = url.replace(`:${stIdName}`,get(params,stIdName))
    }

    uriItem.urlTransfer && (url = uriItem.urlTransfer(url,params))
    uriItem.paramsTransfer && (params = uriItem.paramsTransfer(url,params))
    return {
    url,
    params
}

}

export default {
  initApi<T = any ,R = BaseAPIType.IMethods<T>>(initParams: BaseAPIType.IInitParams<T>):R{
     return {
         get(params:GlobalType.IRecord):Promise<T> {
                // 构造的请求里面 {id: 2}
                // path = /user/:id 需要把 :id 替换成这里的id
                // 最终成为  http://xxx/user/2 才能被后端捕获

                 return Ajax.get({
                     ...transferUrlAndParams('get',get(initParams,'uri.get'),params),
                   //  url: get(initParams,'uri.get.path').replace(`:${replaceIDName}`,get(params,replaceIDName)),
                    // params,
                 }).then( response => {
                     return initParams.mapper?initParams.mapper(response.data): response.data as T
                 }).catch((e) => {
                      // 需要流程终止 throw
                     Tools.processApiError(get(initParams,'uri.get.errMsg',''),e)
                     return {} as T
                 })
         },
         list(params:GlobalType.IRecord):Promise<BaseAPIType.IListResult<T>> {
                 const iResult:BaseAPIType.IListResult<T> = {
                   total: 0,
                   items: []
                 }
                return Ajax.get<T>({
                    url: get(initParams,'uri.list.path'),
                    params,
                }).then(res => {
                    const { total,items = [] } = res.data as BaseAPIType.IListResult<T>;
                     iResult.total = total
                     iResult.items = initParams.mapper?items.map(item => {
                        return  initParams.mapper(item)
                     }):items;
                    return iResult
                }).catch((e) =>{
                  Tools.processApiError(get(initParams,'url.list.errMsg',''),e)
                    return iResult
                })
         },
         post(params:GlobalType.IRecord):Promise<IResponse>{
             return Ajax.post({
                 url: get(initParams,'uri.post.path'),
                 params
             }).catch((e) => {
                 Tools.processApiError(get(initParams,'uri.post.errMsg',''),e)
                 return {} as IResponse
             })
         },
         put(params:GlobalType.IRecord):Promise<IResponse>{
             return Ajax.put({
                 url: get(initParams,'uri.put.path'),
                 params
             }).catch((e) => {
                 Tools.processApiError(get(initParams,'uri.put.errMsg',''),e)
                 return {} as IResponse
             })
         },
         delete(params:GlobalType.IRecord):Promise<IResponse>{
             // user/:id
             const replaceIDName = 'id'
             return Ajax.delete<T>({
                 ...transferUrlAndParams('delete',get(initParams,'uri.delete'),params),
             }).then( response => {
                //  Tools.showSucceed()
                 return {} as IResponse
             }).catch((e) => {
                 // 需要流程终止 throw
                 Tools.processApiError(get(initParams,'uri.delete.errMsg',''),e)
                 return {} as IResponse
             })
         }
     } as R
 }
}
