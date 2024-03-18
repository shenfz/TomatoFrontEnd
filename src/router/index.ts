// basic route,collect all route

import type {Router, RouteRecordRaw} from "vue-router";
import {createRouter, createWebHistory} from "vue-router";
import {get} from "lodash";

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
                requireAuth:false
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
            path: '/regist',
            name: 'regist',
            component: () => import('@/views/Login/regist.vue'),
            meta:{
                requireAuth: false,
                title: lpk('page.regist.Title')
            }
        }

    ]

    // 捕获 404
  routes.push({
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/notFound.vue') })


    const iRouter = createRouter(
        {
            history: createWebHistory(),// 路由导航
            routes: routes, // 具体路由实体
        }
    )
    // 路由守卫  设置对应路由的页面顶部title
    iRouter.afterEach((to,from) => {
        const title = get(to,'meta.title','TomatoTsAndGo');
        if (title){
            document.title = title as string
        }
    })

    return iRouter
}