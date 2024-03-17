import cookies from 'js-cookie'

const Tools = {
    Router: { // 路由操作

    },
    Store:{  // 状态管理

    },
    LocalStorage:{ //本地存储
       setItem(key:string,value:any){
           localStorage.setItem(key,JSON.stringify(value))
       },
        getItem(key:string):any{
           const val = localStorage.getItem(key)
            try {
                return JSON.parse(val as string)
            }catch (e) {
                return val
            }
        },
        removeItem(key:string){
           localStorage.removeItem(key)
        }
    },
    Cookie:{
            setItem(key:string,value:any){
                cookies.set(key,value,{expires:30})
            },
            getItem(key:string,defaultValue?:any){
                const val = cookies.get(key) || defaultValue
                try{
                    return JSON.parse(val)
                }catch (e) {
                    return val
                }
            },
            removeItem(key: string) {
                cookies.remove(key)
            }
    },
    Time:{ // 日期时间

    },
    Dom: { //元素操作

    }

}

export type ITools = typeof Tools;
export default Tools;