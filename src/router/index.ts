// basic route,collect all route

import type {Router, RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import {get} from "lodash";
import {LOGIN_PATH, ROUTER_VIEW_KEY} from "@/utils/constants";

// 拓展属性，希望可以往children路由里面push
// 原RouteRecordRaw  的child属性是只读的
type RouteRecordRawExt = RouteRecordRaw & {children?:RouteRecordRawExt[]}

let giAllRoutes:RouteRecordRawExt[] = []

export const initRouter = ():Router => {
    // 配置基础条目
    let routes:RouteRecordRawExt[] = [
        {path: '/',redirect:'/Index'},
        {
            path:'/Index',
            name:'index',
            component: () => import('@/views/Index/index.vue'),
            meta:{
                title:lpk('page.index.Title'),
                requireAuth:false,
                hostRouterViewKey: ROUTER_VIEW_KEY.Index,
            },
            children: [
                {
                    path: '', // 空路径，第一个显示
                    name: 'home',
                    component: () => import('@/views/Index/home.vue'),
                    meta: {
                        requireAuth: false,
                    }
                },
                {
                    path: '/my',
                    name: 'my',
                    component: () => import('@/views/Index/my.vue'),
                    meta: {
                        title: lpk('page.my.title'),
                        requireAuth: false,
                        keepAlive:false,   // 页面内容保存
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/login.vue'),
            meta: {
                title: lpk('page.login.Title'),
                requireAuth: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/Login/register.vue'),
            meta:{
                requireAuth: false,
                title: lpk('page.register.Title')
            }
        }

    ]

    // 聚合业务模块路由信息  bmod/xxx/route/
    routes = routes.concat(app.getAllBModRoute())

   // console.log("all routes=> ",routes)
    // 塞入捕获 404 路由
    routes.push({
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/notFound.vue') })
   // 路由集合组装完成，引用给全局变量
    giAllRoutes = routes

    // 进行主从路由拼装
    giAllRoutes.map(item => DoRange(item,giAllRoutes))

   // console.log('routes',giAllRoutes)
   // 基础路由，后续动态路由可以拿到iRouter再处理
    const iRouter = createRouter(
        {
            history: createWebHistory(),// 路由导航
            routes: routes, // 具体路由实体
        }
    )

    // 路由守卫
    // 1.创建后
    // 设置对应路由的页面顶部title
    iRouter.afterEach((to,from) => {
        const title = get(to,'meta.title','TomatoTsAndGo');
        if (title){
            document.title = title as string
        }
    })
   // 2.创建之前
    //
    iRouter.beforeEach((to,from,next) => {
        // 获取登录者的ID
        const stLoginUserId = get(app.getAppCtrl().getLoginUser(),'id',0) as number
        // 根据登录状态，从matched拿到匹配到路由的数组（包括父子级路由），挨个进行鉴权标识确认
        if (stLoginUserId == 0 && to.matched.some(record => false != get(record,'meta.requireAuth'))){
            // 该路由数组需要鉴权，且未登录，直接跳转到 登录界面
            next({
                path: LOGIN_PATH, // 需要跳转到的路由  /Login
                query: {redirect: to.fullPath} // 自定义redirect参数，登录成功后，可以做跳转，且跳转到先前想访问的页面
            })
            return;
        }

        // 已登录,但是还是访问登录页面,就跳转到主页
        if (stLoginUserId && to.path == LOGIN_PATH){
            next('/')
            return
        }
       // 都未命中，几乎不能，直接放行
        next()
    })


    return iRouter
}

function DoRange(hostRouteRecord:RouteRecordRawExt,giRoute:RouteRecordRawExt[]){
  // 1.拿到目标路由组的标识，通过此标识去遍历寻找它的从属路由
    // belongToRouterViewKey 从
    // hostRouterViewKey 主
    const  stHostKeyVal = get(hostRouteRecord,'meta.hostRouterViewKey',"")
    // 2.先进行值确认，和路由长度确认
     // 当 主路由 标志信息空 或 聚合的路由集合为空，直接跳过
    if (stHostKeyVal == "" || !giRoute){
        return
    }

    // 3. 开始遍历
    for (let i = 0;i<giRoute.length;){
        const item = giRoute[i]
         // 因为路由是全集合到一块的，遇到本身时候，跳过
        if (hostRouteRecord == item){
            i++
            continue;
        }
        // 主从标志匹配时，从路由归属给主路由，同时清除从集合中剔除该从路由
        if(stHostKeyVal == get(item,'meta.belongToRouterViewKey',"")){
             // 判断主路由的孩子路由集合是否声明，否则置空
            hostRouteRecord.children = hostRouteRecord.children || []
            hostRouteRecord.children.push(item)
            // 剔除
            giRoute.splice(i,1)

        }else{
            // 路由item没有标识或者标识信息不匹配，继续从item的孩子路由进行查找，进行递归
            if (item.children){
                DoRange(hostRouteRecord,item.children)
            }
            i++
        }
    }
}