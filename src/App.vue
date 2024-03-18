<script setup lang="ts">
import Tools from "./utils/Tools";
import {lpk} from "@/config/lpk";

Tools.LocalStorage.setItem('testKey','testVal')
console.log(lpk('Index'))
</script>

<template>
  <div>
   {{ app.getConfig('baseURL') }}
    {{ Tools.LocalStorage.getItem('testKey') }}
    {{lpk('Index')}}
   <Icon icon="icon-time"></Icon>
  </div>

  <div>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="success">成功按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>


  </div>

</template>

<style scoped>

</style>
