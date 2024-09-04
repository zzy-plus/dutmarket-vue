<script setup>

import {RouterView, useRouter} from "vue-router";

const router = useRouter()


</script>

<template>
  <div class="main">
    <div class="menu">
      <div style="padding: 10px">
        <el-input style="width: 70%"/> <el-button type="primary">搜索</el-button>
      </div>

      <div style="padding: 10px"><el-button>发布</el-button></div>

      <div style="padding: 10px"><el-button>记录</el-button></div>

      <div style="padding: 10px"><el-button>类别</el-button></div>



    </div>
    <div class="container">
      <RouterView/>
    </div>
  </div>

</template>

<style scoped>
  .main{
    height: 100vh;
    width: 100vw;
    background-color: black;
    display: flex;
    flex-direction: row;
  }
  .menu {
    height: 100%;
    width: 20%;
    background-color: orange;
    display: flex;
    flex-direction: column;
    //justify-content: space-around;
  }
  .container{
    height: 100%;
    width: 80%;
    background-color: #e7e7e7;
  }
</style>

<style>
  body {
    margin: 0;
  }
</style>
