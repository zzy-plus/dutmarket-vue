<script setup>
import {Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import cfg from "@/config.js";
import {Msg} from "@/utils/ElMessage.js";
import {useStore} from "@/stores/store.js";
import {request} from "@/utils/requests.js";
import router from "@/router/index.js";

const store = useStore();

const categorys = store.category

const imgUrls = ref([])
const imgNames = ref([])
const uploadCount = ref(0)
const handleAvatarSuccess = (res)=>{
  if(res.code === 0){
    if(imgUrls.value.length < 5){
      imgUrls.value.push(`/api/common/download?name=${res.data}`)
      imgNames.value.push(res.data)
      uploadCount.value = uploadCount.value + 1
    }
  }
}
const beforeAvatarUpload = (file)=>{
  if(!file.type.startsWith('image')){
    Msg.error('仅支持上传图片文件!')
    return false
  }
}

const delImg = ()=>{
  if(imgUrls.value.length === 0) return
  imgUrls.value.pop()
  imgNames.value.pop()
  uploadCount.value = uploadCount.value - 1
}

const goodsData = ref({
  name: '',
  price: 0,
  description: '',
  category: -1,
  mainImg: '',
  images: ''

})

const onSubmit = async ()=>{
  if(imgNames.value.length === 0){
    Msg.warning('请至少上传一张图片.')
    return
  }
  goodsData.value.mainImg = imgNames.value[0]
  goodsData.value.images = imgNames.value.join(';')
  const resp = await request.post('/api/goods', goodsData.value)
  if(resp.data.code === 0){
    Msg.success('成功!')
    router.push('/list')
  }else{
    Msg.error(resp.data.msg)
  }
}


</script>

<template>
  <div class="publish-container">
    <div style="display: flex; background-color: #eaeaea" :style="{width: 200*(uploadCount===5? 5: uploadCount+1) + 'px'}">
      <el-upload
          class="avatar-uploader"
          action="/api/common/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-for="j in Array.from({ length: uploadCount===5? 5: uploadCount+1 }, (_, i) => i)"
          style="margin: 10px"
      >
        <img v-if="imgUrls[j]" :src="imgUrls[j]" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div>
      <el-button type="danger" plain
                 :style="{position: 'relative', left: -125 + 200*imgUrls.length + 'px'}"
                 v-if="imgUrls.length>0" @click="delImg">
        删除</el-button>
    </div>

    <div class="goods-info">
      <el-form :model="goodsData" label-width="auto" style="max-width: 400px">
        <el-form-item label="名称">
          <el-input v-model="goodsData.name"/>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="goodsData.price"/>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="goodsData.category">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.name"
              :value="item.categoryNum"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述/交易信息">
          <el-input v-model="goodsData.description" type="textarea" :rows="10"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
        </el-form-item>


      </el-form>

    </div>
  </div>

</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.publish-container{
  height: 100%;
  width: 100%;
  background-color: white;
}
.goods-info{
  font-weight: bold;
  margin-top: 50px;
  margin-left: 50px;
}

</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>