import {defineStore} from "pinia";
import {ref} from "vue";

export const useStore = defineStore('mystore',()=>{

  const category = ref(undefined)
  const setCategory = (val)=>{
    category.value = val
  }




  return{
    category,
    setCategory,
  }
})





