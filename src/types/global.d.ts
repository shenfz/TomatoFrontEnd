import {IApp} from "@/config/app";
import {ITools} from "@/utils/Tools";
import {IFnLpk} from "@/config/lpk";
import {IAjax,IResponse} from "@/utils/ajax";

declare global {
    declare namespace GlobalType {
        type IKey = string | number;
        type IRecord = Record<IKey, any>
    }
    declare namespace BaseAPIType {
        interface IURIItem {
            path: string
            errMsg:string
            urlTransfer?:(path:string,params:IRecord) => string
            paramsTransfer?:(path:string,params:IRecord) => IRecord
        }
        interface IURL {
            [key:string]:IURIItem
        }

        // 泛型默认是IRecord类型
        interface IInitParams<T = IRecord> {
            uri: IURL,
            mapper?:(item: IRecord) => T
        }

        interface IMethods<T>{
            get(params: GlobalType.IRecord): Promise<T>;
            list(params: GlobalType.IRecord): Promise<IListResult<T>>;
            post(params: GlobalType.IRecord): Promise<IResponse>;
            put(params: GlobalType.IRecord): Promise<IResponse>;
            delete(params: GlobalType.IRecord): Promise<IResponse>
        }

        interface IListResult<T = any> {
            total: number
            items: T[]
        }

    }
    const app: IApp
    const Tools:ITools
    const lpk : IFnLpk

    const Ajax:IAjax

    // ReturnType<typeof setTimeout>
    type ITimeout = ReturnType<typeof setTimeout>


    interface  Window {
        app: IApp;  // 全局app对象，挂载一些全局数据和操作方法
        Tools: ITools; // 全局工具公用方法
        lpk: IFnLpk ;// 全局绑定 语言包支持函数
        Ajax:IAjax,// 全局请求
    }

}

//  让 template 中 lpk 不在ts环境下报错
// 该声明必须放置到module中，否则会覆盖全局类型，而不是增强全局类型
declare module 'vue' {
interface ComponentCustomProperties {
    app: IApp;
    Tools:ITools
}
}

export {}