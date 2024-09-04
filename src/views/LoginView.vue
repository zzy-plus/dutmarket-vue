<script setup>


import LoginDialog from "@/components/LoginDialog.vue";
</script>

<template>
  <div class="login-back"/>

  <LoginDialog/>


</template>

<style scoped>
.login-back {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/login_back.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1
}

</style>
