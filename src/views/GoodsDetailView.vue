<script setup>
import {useRouter, useRoute} from "vue-router";
import {ref, onMounted, watch} from "vue";
import {request} from "@/utils/requests.js";
import {Msg} from "@/utils/ElMessage.js";
import {Back} from "@element-plus/icons-vue";
import {useStore} from "@/stores/store.js";

const router = useRouter()
const route = useRoute()
const store = useStore()

const goodsData = ref({})
const getGoodsById = async () => {
  const id = route.params.id
  const resp = await request.get(`/api/goods/detail?id=${id}`)
  if (resp.data.code !== 0) {
    Msg.error(resp.data.msg)
    return
  }
  goodsData.value = resp.data.data
}

const images = ref([])
const getImages = () => {
  if (goodsData.value.images === '') return
  images.value = goodsData.value.images.split(';')
}

onMounted(() => {
  getGoodsById()
})

watch(() => goodsData, () => {
  getImages()
}, {deep: true})

const initialIndex = ref(null)
const urlList = ref([])
const openImageViewer = (imgName) => {
  urlList.value = ['/api/common/download?name=' + imgName]
  initialIndex.value = 0
}

const backToList = ()=>{
  router.push('/list')
}

</script>

<template>
  <el-button type="primary" :icon="Back" class="btn" @click="backToList">
    返回
  </el-button>
  <div class="images-container">
    <el-image v-for="img in images"
              :src="'/api/common/download?name=' + img"
              fit="cover" class="el-img"
              @click="openImageViewer(img)"/>
  </div>

  <div class="goods-detail">
    <div style="width: fit-content">{{goodsData.name}}</div>
  </div>

  <el-image-viewer :url-list="urlList" @close="initialIndex = null" v-if="initialIndex !== null"/>
</template>

<style scoped>
.el-img{
  height: 150px;
  width: 150px;
  margin: 5px;
  transition: transform 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.66) 2px 2px 5px 0;
  &:hover{
    z-index: 100;
    transform: scale(1.2);
  }
}
.images-container{
  position: relative;
  left: 50%;
  width: fit-content;
  height: fit-content;
  transform: translateX(-50%);
}
.goods-detail{
  background-color: #ff5810;
  position: relative;
  top: 20px;
}
.btn{
  position: relative;
  top: 10px;
  left: 10px;
}
</style>
