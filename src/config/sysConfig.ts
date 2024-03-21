
// 系统配置信息

export interface ISysConfig {
    baseURL : string    // http://localhost:port
    bModNames: ISysBModItem[]
}

export interface ISysBModItem {
    bName:string      // 模块名
    enable:boolean
}

const iSysConf: ISysConfig = {
    baseURL: 'https://localhost:9999',
    bModNames: [{bName:'blog',enable:true}]
}


export default iSysConf