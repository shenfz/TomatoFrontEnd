<script setup lang="ts">/**
 * @package:
 * @Function:      动态管理 内容是否active
 * @author:        shenfz
 * @description:   keep-alive
 * @date:         2024/3/20 4:17
 * @version:      v1.0.0
 * @email         1328919715@qq.com
 */
import {useRoute} from "vue-router";
import {get} from 'lodash'
// define options

// type define
interface IKeepAliveRouterView {
  giExcludeName: string[]
}

// init
const iState = reactive<IKeepAliveRouterView>({
  giExcludeName:[]
})

const { giExcludeName } = toRefs(iState)
// 监听当前页面内容是否 有需要keep-alive的内容
// meta.keepAlive 在设置路由的时候 传入
watch(useRoute(),(newValue,oldValue) =>{
   if (false == get(newValue,'meta.keepAlive',true)){
     // 1.从 meta里面去取cmpName 即 组件名  ，缺点比较繁琐，且需要设置meta成员
    // const stCmpName = get(newValue,'meta.cmpName','') as string
    // 2.从vue层面的成员中取组件名  __name里面包含特殊字符，[]包起来
     const stCmpName = get(newValue.matched[newValue.matched.length -1],'components.default.["__name"]','') as string

     if (stCmpName && -1 == iState.giExcludeName.indexOf(stCmpName)){
       iState.giExcludeName.push(stCmpName)
     }
   }
})

</script>

<template>
 <router-view v-slot="{ Component }">
   <keep-alive :exclude="giExcludeName">
    <component :is="Component">
    </component>
   </keep-alive>
 </router-view>
</template>

<style lang="scss" scoped>

</style>