import sysConfig,{ISysConfig,ISysBModItem} from "@/config/sysConfig";
import appCtrl from "@/controller/appCtrl";


const app = {
    // 获取配置
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