<script setup>

import {RouterView, useRouter} from "vue-router";

const router = useRouter()


</script>

<template>
  <div style="background: orange; height: 40px; padding: 10px">
    测试：
    <el-button @click="router.push('/list')">切换到商品列表页面</el-button>
    <el-button @click="router.push('/detail')">切换到商品详情页面</el-button>
  </div>
  <RouterView/>
</template>
