// blog  路由配置信息
import sysCfg from '../config/modelConfig'
import type {RouteRecordRaw} from "vue-router";
import {ROUTER_VIEW_KEY} from "@/utils/constants";

export const initRouters = () => {
    const stPath = '/blog';
     // 定义当前模块的路由信息
     const giRoutes:RouteRecordRaw[] = [{
         name: 'blogIndex',  // blogIndex
         path: stPath, // `/blog`
         meta:{
             title: lpk('Blog'),
             requireAuth: false,
             belongToRouterViewKey: ROUTER_VIEW_KEY.Index,
         },
         component: () => import('../views/Index/index.vue')
     },{
         name: 'articleDetail',
         path: `${stPath}/article/detail/:id`, // 动态路由
         meta:{
             title: lpk('page.blog.article.detail.Title'),
             requireAuth: false
         },
         component: () => import('../views/Article/articleDetail.vue')
      },{
         name: 'editArticle',
         path: `${stPath}/article/edit`,
         meta:{
              title: lpk('page.blog.article.edit.Title'),
              requireAuth: true // 需要鉴权
         },
         component: () => import('../views/Article/articleEdit.vue')
     }
     ];
     // 使用app里的接口方法，注册业务路由到全局路由的存储对象中
    console.log("before reg bmod router",giRoutes)
     app.registerBModRoute(giRoutes)
}


