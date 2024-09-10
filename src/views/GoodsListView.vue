<script setup>
import GoodsCart from "@/components/GoodsCart.vue";
import {request} from "@/utils/requests.js";
import {onMounted, ref, watch} from "vue";
import {Msg} from "@/utils/ElMessage.js";
import cfg from "@/config.js";
import {useStore} from "@/stores/store.js";
import {useRouter, useRoute} from "vue-router";


const router = useRouter()
const route = useRoute()
const store = useStore()
const imgDownloadUrl = `${cfg.baseUrl}/common/download?name=`
const {goodsData} = defineProps({
  goodsData: Object
})

watch(()=>goodsData, (value)=>{
  getGoodsList()
})

const curPage = ref(1)
const pageSize = ref(16)
const total = ref(0)
const goodsList = ref([])
const getGoodsList = async ()=>{
  const resp = await request.get(`/api/goods?curPage=${curPage.value}&pageSize=${pageSize.value}
  &name=${goodsData.name}&category=${goodsData.category}`)
  if(resp.data.code === 0){
    goodsList.value = resp.data.data.records
    total.value = resp.data.data.total
  }else{
    Msg.error(resp.data.msg)
  }
}


onMounted(()=>{
  getGoodsList()
})

const showGoodsDetail = (id)=>{
  router.push('/detail/' + id)
}

const onPageChange = ()=>{
  getGoodsList()
}


</script>

<template>
  <div class="list-container">
    <div v-for="goods in goodsList" class="goods-container">
      <GoodsCart :id="goods.id" :name="goods.name" :price="goods.price" :image="imgDownloadUrl + goods.mainImg"
                 @click="showGoodsDetail"/>
    </div>
  </div>
  <div class="pagination-container">
    <el-pagination
        style="position: relative; left: 20px; top: 10px; width: 400px;"
        size="small"
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        v-model:current-page="curPage"
        pager-count="11"
        @current-change="onPageChange"
    />
  </div>

</template>

<style scoped>
  .list-container{
    height: 94%;
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
  .pagination-container{
    box-shadow: 0 -5px 5px rgba(255, 255, 255, 0.48);
    position: relative;
  }
</style>
