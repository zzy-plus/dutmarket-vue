<script setup>

import GoodsCart from "@/components/GoodsCart.vue";

const onMclick = (id)=>{
  console.log(id)
}

</script>

<template>
  <div class="list-container">
    <GoodsCart id="111" name="名称名称名称名称名称名称名称名称名称名称名称名称" price="100" image="http://localhost:8080/common/download?name=login_back.jpg"
      @click="onMclick"/>
  </div>

</template>

<style scoped>
  .list-container{
    height: 100%;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgba(197, 196, 193, 0);
  }
</style>
