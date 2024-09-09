<script setup>
import {RouterView, useRouter} from "vue-router";
import {ref, watch, onMounted} from "vue";
import {Search} from "@element-plus/icons-vue";
import SingleSelector from "@/components/SingleSelector.vue";
import {request} from "@/utils/requests.js";
import {useStore} from "@/stores/store.js";

const store = useStore()
const router = useRouter()

const onClickPublish = ()=>{
  router.push('/publish')
}

const goodsData = ref({
  name: '',
  category: -1
})

const newGoodsData = ref({
  name: '',
  category: -1
})

const searchRef = ref()
const onSearch = ()=>{
  goodsData.value = {
    name: newGoodsData.value.name,
    category: newGoodsData.value.category
  }
  searchRef.value.blur()
}

const categorys = ref([])
const getCategoryList = async ()=>{
  const resp = await request.get('/api/category')
  if(resp.data.code === 0){
    let categoryArr = new Array(...resp.data.data)
    categoryArr.unshift({
      name: '全部',
      categoryNum: -1
    })
    categorys.value = categoryArr
    store.setCategory(resp.data.data)
  }
}

onMounted(()=>{
  getCategoryList()
})


const onCategoryChange = (category)=>{
  goodsData.value = {
    name: newGoodsData.value.name,
    category: category
  }
}

</script>

<template>
  <div class="main">
    <div class="menu">
      <div style="padding: 50px 10px 10px 10px">
        <el-input style="width: 100%" v-model="newGoodsData.name" clearable
                  @keydown.enter="onSearch" ref="searchRef"
                  placeholder="搜索 Search"
                  :prefix-icon="Search"
                  @clear="onSearch"/>
      </div>

      <div style="padding: 10px"><el-button @click="onClickPublish">发布</el-button></div>

      <div style="padding: 10px"><el-button>记录</el-button></div>


      <SingleSelector :options="categorys" @onChange="onCategoryChange"/>

    </div>
    <div class="container">
      <RouterView :goodsData="goodsData"/>
    </div>
  </div>

</template>

<style scoped>
  .main{
    height: 100vh;
    width: 100vw;
    background-color: black;
    display: flex;
    flex-direction: row;
  }
  .menu {
    height: 100%;
    width: 20%;
    background-color: #7fb7de;
    display: flex;
    flex-direction: column;
    //justify-content: space-around;
  }
  .container{
    height: 100%;
    width: 80%;
    background-color: #e7e7e7;
  }
</style>

<style>
  body {
    margin: 0;
  }
</style>
