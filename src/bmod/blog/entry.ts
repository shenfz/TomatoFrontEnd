// ===================> blog business model
// note: each business mod need an entry.ts file
//       each entry.ts must have an init function
import {initRouters} from "@/bmod/blog/routers";
import modelConfig from "./config/modelConfig";


export const entryInitFn = async () => {

    console.log('entry function execute')
    // check the business model enabled,if  disable ,return it
    if (!app.checkBModEnable(modelConfig.moduleName)){
        return
    }
    console.log('bmod enabled')
    // init  lpk from business model
    app.getAppCtrl().mergeLpk(import.meta.glob('./locales/*',{eager:true}))
   //  console.log(lpk('Blog'))
     // init business model config information

    // init status manager

    // init router
    initRouters()
}

export {}