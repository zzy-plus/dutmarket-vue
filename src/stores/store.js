import {defineStore} from "pinia";
import {ref} from "vue";

export const useStore = defineStore('mystore',()=>{
  const pwd = ref(undefined)
  const setPwd = (val)=>{
    pwd.value = val
  }




  return{
    pwd,
    setPwd,
  }
})





