<script setup lang="ts">

import {lpk} from "../../config/lpk";
</script>

<template>
  <div class="index-w">
    <div class="title"> Index.vue</div>
    <router-view>
      <ul class="g-flex-rsbc">
        <li>
          <router-link :to="{name: 'home'}"> {{ lpk('page.index.Title')}}</router-link>

        </li>
        <li>
          <router-link :to="{name: 'my'}"> {{ lpk('page.my.Title')}}</router-link>
        </li>
      </ul>
    </router-view>
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