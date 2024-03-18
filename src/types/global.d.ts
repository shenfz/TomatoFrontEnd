import {IApp} from "@/config/app";
import {ITools} from "@/utils/Tools";
import {IFnLpk} from "@/config/lpk";

declare global {
    declare namespace GlobalType {
        type IKey = string | number;
        type IRecord = Record<IKey, any>
    }

    const app: IApp
    const Tools:ITools
    const lpk : IFnLpk
    interface  Window {
        app: IApp;  // 全局app对象，挂载一些全局数据和操作方法
        Tools: ITools; // 全局工具公用方法
        lpk: IFnLpk ;// 全局绑定 语言包支持函数
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