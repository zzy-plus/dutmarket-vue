<script setup>
import GoodsCart from "@/components/GoodsCart.vue";
import {request} from "@/utils/requests.js";
import {onMounted, ref, watch} from "vue";
import {Msg} from "@/utils/ElMessage.js";
import cfg from "@/config.js";
import {useStore} from "@/stores/store.js";

const store = useStore()
const imgDownloadUrl = `${cfg.baseUrl}/common/download?name=`
const {goodsData} = defineProps({
  goodsData: Object
})

watch(()=>goodsData, (value)=>{
  getGoodsList()
})

const curPage = ref(1)
const pageSize = ref(30)
const goodsList = ref([])
const getGoodsList = async ()=>{
  const resp = await request.get(`/api/goods?curPage=${curPage.value}&pageSize=${pageSize.value}
  &name=${goodsData.name}&category=${goodsData.category}`)
  if(resp.data.code === 0){
    goodsList.value = resp.data.data.records
  }else{
    Msg.error(resp.data.msg)
  }
}

const getCategoryList = async ()=>{
  const resp = await request.get('/api/category')
  if(resp.data.code === 0){
    store.setCategory(resp.data.data)
  }
}

onMounted(()=>{
  getGoodsList()
  getCategoryList()
})

const onMclick = (id)=>{
  console.log(id)
}

</script>

<template>
  <div class="list-container">
    <div v-for="goods in goodsList" class="goods-container">
      <GoodsCart :id="goods.id" :name="goods.name" :price="goods.price" :image="imgDownloadUrl + goods.mainImg"
                 @click="onMclick"/>
    </div>
  </div>
  <div style="height: 50px; background-color: red"></div>

</template>

<style scoped>
  .list-container{
    height: 90%;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: rgba(197, 196, 193, 0);
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .goods-container{
    margin: 10px;
  }
</style>
