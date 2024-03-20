import sysConfig,{ISysConfig,ISysBModItem} from "@/config/sysConfig";
import appCtrl from "@/controller/appCtrl";
import {RouteRecordRaw} from "vue-router";
import {isArray} from "lodash";

// 存放所有业务模块信息 routes
let giAllBModRoutes:RouteRecordRaw[] = []

interface IBModRouteOperation{
    registerBModRoute(mixRoute:RouteRecordRaw | RouteRecordRaw[]):void
    getAllBModRoute():RouteRecordRaw[]
}

const routerBModRouterOper:IBModRouteOperation = {
    registerBModRoute(mixRoute: RouteRecordRaw | RouteRecordRaw[]) {

        console.log("bmod routers register: ",mixRoute)

        if (!mixRoute){
            return
        }
        if (isArray(mixRoute)){
          giAllBModRoutes = giAllBModRoutes.concat(mixRoute)
            return;
        }

        giAllBModRoutes.push(mixRoute)

    },
    getAllBModRoute(): RouteRecordRaw[] {
        return giAllBModRoutes;
    }
}


const app = {

    // 业务模块路由相关操作 解构
    ...routerBModRouterOper,

    // 获取配置
    // TODO as unknown ?
    getConfig<T>(key: keyof ISysConfig): T{
        return sysConfig[key] as unknown as T
    },
    // 检查业务模块是否开启
    checkBModEnable(bModName:string): boolean {
        // 拿到业务数组
        const bModArray:ISysBModItem[] = app.getConfig<ISysBModItem[]>('bModNames');
        if (bModArray.find(item => item.bName == bModName && item.enable)){
            return true;
        }
        return false;
    },
    getAppCtrl(){
        return appCtrl
    }
}

export type IApp = typeof app;

export default app;