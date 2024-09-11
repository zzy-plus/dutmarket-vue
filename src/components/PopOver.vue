<script setup>
import {ref} from "vue";

const show = ref(false)

</script>

<template>

  <div class="div-style" @mouseenter="show = true" @mouseleave="show=false">
     <transition name="fade">
       <div v-if="show" class="content">
         <slot name="content"></slot>
       </div>
     </transition>
    <slot><div style="height: 50px; width: 50px; background-color: #ff5810"/></slot>
  </div>

</template>

<style scoped>

.div-style{
  position: relative;
}
.content{
  position: absolute;
  right: 0;
  transform: translateY(-100%);
  width: fit-content;
}
.fade-enter-active, .fade-leave-active{
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to{
  opacity: 0;
}


</style>