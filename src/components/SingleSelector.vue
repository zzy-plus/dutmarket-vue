<script setup>
import {ref} from "vue";

const emit = defineEmits(['onChange'])
const {options} = defineProps({
  options: Array
})

const curSelect = ref('')
const onClick = (e)=>{
  if(curSelect !== e.label){
    emit('onChange', e.value)
  }
  curSelect.value = e.label
}




</script>

<template>

  <div style="width: 80px">
    <div v-for="item in options" @click="onClick(item)" :class="curSelect === item.label? 'selected': 'un-selected'">
      Label: {{item.label}}
    </div>
  </div>

</template>

<style scoped>
.selected{
  background-color: red;
}
.un-selected{
  background-color: white;
}
</style>