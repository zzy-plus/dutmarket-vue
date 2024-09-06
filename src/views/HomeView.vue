<script setup>
import {RouterView, useRouter} from "vue-router";
import {ref, watch} from "vue";
import {Search} from "@element-plus/icons-vue";
import SingleSelector from "@/components/SingleSelector.vue";

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


const dataTest = ref([
  {
    label: 'a',
    value: 1
  },
  {
    label: 'b',
    value: 2
  },
  {
    label: 'c',
    value: 3
  }
])

const testModel = ref('')
const onChange = (v)=>{
  console.log(v)
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

      <div style="padding: 10px"><el-button>类别</el-button></div>

      <SingleSelector :options="dataTest" @onChange="onChange"/>

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
    background-color: orange;
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
