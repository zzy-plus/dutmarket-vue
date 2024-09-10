import {defineStore} from "pinia";
import {ref} from "vue";

export const useStore = defineStore('mystore',()=>{

  const category = ref(undefined)
  const setCategory = (val)=>{
    category.value = val
  }

  const myInfo = ref(undefined)
  const setMyInfo = (val)=>{
    myInfo.value = val
  }

  const curPage = ref(1)
  const setCurPage = (val)=>{
    curPage.value = val
  }



  return{
    category,
    setCategory,
    myInfo,
    setMyInfo,
    curPage,
    setCurPage,
  }
})





