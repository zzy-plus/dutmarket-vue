<script setup>
import {ref} from "vue";
const props = defineProps({
  id: String,
  image: String,
  name: String,
  price: Number
})

const emit = defineEmits(['click'])

const onClick = ()=>{
  emit('click', props.id)
}

</script>

<template>
  <div class="base" @click="onClick">
    <el-image :src="props.image" :fit="'cover'" class="img"/>
    <div class="footer">
      <div style="font-size: 16px; font-weight: bold; color: black; white-space: nowrap; overflow: hidden">
        {{props.name}}
      </div>
      <div style="font-size: 18px; font-weight: bold; color: #ff5810; margin-top: 5px">
        ￥{{props.price}}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .base{
    height: 310px;
    width: 250px;
    background-color: #ffffff;
    box-shadow: 3px 10px 5px 1px rgba(0, 0, 0, 0.3);
    &:hover{
      box-shadow: 3px 10px 5px 2px rgba(255, 114, 14, 0.5);
    }
  }
  .img{
    height: 234px;
    width: 234px;
    position: relative;
    left: 8px;
    top: 8px;
  }
  .footer{
    height: 70px;
    width: 250px;
    background-color: #c6e6e7;
    position: relative;
    top: 10px;
    padding: 5px;
    box-sizing: border-box;
  }

</style>