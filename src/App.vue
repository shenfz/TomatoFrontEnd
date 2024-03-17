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

  </div>

</template>

<style scoped>

</style>
