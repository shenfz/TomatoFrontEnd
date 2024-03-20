import cookies from 'js-cookie'


const fCachePreventRandom = Math.random() // 防止api请求被缓存的随机数 0  --  1 浮点数
let nCachePreventNum = 0 // 防止随机数重复，声明一个变量进行一个累加

const Tools = {
    showLoadMask(){ // 显示全局遮罩 加载

    },
    hideLoadMask() { // 隐藏遮罩

    },
    addCachePrevent(url:string = ''){// 防止API请求命中本地缓存
        // url 存在 ？
        const nQueryStringFlagIndex = url.indexOf('?')
        // 如果不存在就在url末尾加上 ? ，如果存在就加上 & ,给一个随机数
        url += `${(-1 == nQueryStringFlagIndex? '?': '&')}cp=${(nCachePreventNum++ + fCachePreventRandom)}`
        return url
    },
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