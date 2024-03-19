// blog  路由配置信息
import sysCfg from '../config/modelConfig'
import type {RouteRecordRaw} from "vue-router";
import {ROUTER_VIEW_KEY} from "@/utils/constants";

export const initRouters = () => {
    const stPath = `/${sysCfg.moduleName}`;
     // 定义当前模块的路由信息
     const giRoutes:RouteRecordRaw[] = [{
         name: `${sysCfg.moduleName}Index`,  // blogIndex
         path: stPath, // `/blogIndex`
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
            // title: lpk('Blog'),
             requireAuth: false
         },
         component: () => import('../views/Article/articleDetail.vue')
      },{
         name: 'editArticle',
         path: `${stPath}/edit`,
         meta:{
              title: lpk('page.blog.article.edit.Title'),
              requireAuth: true // 需要鉴权
         },
         component: () => import('../views/Article/articleEdit.vue')
     }
     ];
     // 使用app里的接口方法，注册业务路由到全局路由的存储对象中
     app.registerBModRoute(giRoutes)
}


