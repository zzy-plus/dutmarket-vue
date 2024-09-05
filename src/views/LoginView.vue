<script setup>

// function deleteCookie(name) {
//   document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
// }
import LoginDialog from "@/components/LoginDialog.vue";


</script>

<template>
  <div class="login-back"/>
  <div class="login-container">
    <LoginDialog/>
  </div>



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

.login-container{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(0, -50%);
}

</style>
