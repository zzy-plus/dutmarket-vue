<script setup>
import {RouterView, useRouter} from "vue-router";
import {ref, watch, onMounted} from "vue";
import {Search} from "@element-plus/icons-vue";
import SingleSelector from "@/components/SingleSelector.vue";
import {request} from "@/utils/requests.js";
import {useStore} from "@/stores/store.js";
import {Setting} from "@element-plus/icons-vue";

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
  getMyInfo()
})

const myInfo = ref({})
const getMyInfo = async ()=>{
  if(store.myInfo){
    myInfo.value = store.myInfo
  }else {
    const resp = await request.get('/api/user/myInfo')
    if(resp.data.code === 0){
      store.setMyInfo(resp.data.data)
      myInfo.value = resp.data.data
    }
  }
}

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
      <div>
        <div style="padding: 20px 20px 10px 20px">
          <div class="publish-btn" @click="onClickPublish">我要发布</div>
        </div>

        <div style="padding: 15px 10px 10px 10px">
          <el-input style="width: 100%" v-model="newGoodsData.name" clearable
                    @keydown.enter="onSearch" ref="searchRef"
                    placeholder="搜索 Search"
                    :prefix-icon="Search"
                    @clear="onSearch"/>
        </div>

        <div style="padding: 10px"><el-button>记录</el-button></div>


        <SingleSelector :options="categorys" @onChange="onCategoryChange"/>
      </div>


      <div class="my-info">
        <div><el-avatar :size="26" :src="circleUrl" /></div>
        <div class="user-label">
          {{myInfo.nickname}}
        </div>
        <el-icon size="23" color="black"><Setting/></el-icon>

      </div>

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
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.44) 3px 0 3px 0;
    position: relative;
  }
  .publish-btn{
    background-color: #ffffff;
    border: 1px solid #8f8f8f;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5), 0 0 5px rgba(255, 255, 255, 0.5);
    padding: 8px;
    font-size: 16px;
    font-weight: bold;
    color: #8c939d;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.5s ease, box-shadow 0.5s ease, background-color 0.5s ease;
    &:hover{
      transform: scale(1.1);
      background-color: #43e587; /* 改变背景颜色 */
      box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4); /* 添加阴影效果 */
      color: #ff7410;
    }
  }
  .container{
    height: 100%;
    width: 80%;
    background-color: #e7e7e7;
  }
  .my-info{
    background-color: #8c939d;
    bottom: 0;
    width: 100%;
    height: 45px;
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .user-label{
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-left: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>

<style>
  body {
    margin: 0;
  }
</style>
