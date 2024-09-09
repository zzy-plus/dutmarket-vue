<script setup>
import {ref} from "vue";
import {Box} from "@element-plus/icons-vue";

const emit = defineEmits(['onChange'])
const {options} = defineProps({
  options: Array
})

const curSelect = ref('')
const onClick = (e)=>{
  if(curSelect.value !== e.name){
    emit('onChange', e.categoryNum)
  }
  curSelect.value = e.name
}




</script>

<template>

  <div style="box-shadow: rgba(161,46,0,0.68) 0 2px 4px 0, rgba(255,255,255,0.68) 0 -2px 3px 0">
    <div v-for="item in options" @click="onClick(item)" :class="curSelect === item.name? 'selected': 'un-selected'">
      <el-icon style="margin-right: 10px"><Box /></el-icon>{{item.name}}
    </div>
  </div>

</template>

<style scoped>
.selected{
  background-color: #ff7c2b;
  color: white;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 18px;
  padding-left: 10px;
  border: 2px white inset;
  cursor: pointer;
}
.un-selected{
  background-color: #2275c7;
  color: white;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  font-size: 18px;
  padding-left: 10px;
  cursor: pointer;
}

.un-selected:hover{
  border: 1px orange inset;
}
</style>