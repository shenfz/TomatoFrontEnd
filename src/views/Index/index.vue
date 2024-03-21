<script setup lang="ts">

import {lpk} from "@/config/lpk";
import userAPI from '@/api/userApi'

// 事件
onMounted( async () => {
   const iUser = await userAPI.get({id:2})
   console.log('iUser',iUser)
   const iUserList = await userAPI.list({nPageSize:2})
    console.log('iUserList',iUserList)
})

</script>

<template>
  <div class="index-w">
    <div class="title"> Index.vue </div>
    <keep-alive-router-view></keep-alive-router-view>
      <ul class="g-flex-rsbc">
        <li>
          <router-link :to="{name: 'home'}"> {{ lpk('page.index.Title')}}</router-link>
        </li>
        <li>
          <router-link :to="{name: 'blogIndex'}"> {{ lpk('Blog')}}</router-link>
        </li>
        <li>
          <router-link :to="{name: 'my'}"> {{ lpk('page.my.Title')}}</router-link>
        </li>
      </ul>
  </div>
</template>

<style scoped>
  .index-w{
    background-color: #41c4f8;
    .title{
       margin: 30px;
    }
  }
</style>