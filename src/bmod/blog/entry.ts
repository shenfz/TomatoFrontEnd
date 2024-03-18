// ===================> blog business model
// note: each business mod need an entry.ts file
//       each entry.ts must have an init function
import blogConfig from "./config/modelConfig";
export  const businessModelName = 'blog'

const blogModuleName = blogConfig.module

export const entryInitFn = async () => {
    // check the business model enabled,if  disable ,return it
    if (!app.checkBModEnable(blogModuleName)){
        return
    }
    // init  lpk from business model
    app.getAppCtrl().mergeLpk(import.meta.glob('./locale/*',{eager:true}))
    console.log(lpk('blog'))
     // init business model config information

    // init status manager

    // init router

}

export {}