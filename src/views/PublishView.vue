<script setup>
import {Plus} from "@element-plus/icons-vue";
import {ref, onMounted} from "vue";
import cfg from "@/config.js";
import {Msg} from "@/utils/ElMessage.js";
import {useStore} from "@/stores/store.js";
import {request} from "@/utils/requests.js";
import router from "@/router/index.js";

const store = useStore();

const categorys = ref([])

onMounted(async ()=>{

  if(store.category){
    categorys.value = store.category
  }else {
    const resp = await request.get('/api/category')
    if(resp.data.code === 0){
      categorys.value = resp.data.data
    }
  }

})

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
  price: '',
  description: '',
  category: '',
  mainImg: '',
  images: ''

})

const onSubmit = async ()=>{
  if(imgNames.value.length === 0){
    Msg.warning('请至少上传一张图片.')
    return
  }
  if(goodsData.value.name === '' || goodsData.value.price === ''
      || goodsData.value.category === ''){
    Msg.warning('请填写必要信息！')
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

// 价格验证
let oldVal = '0'
const formatPrice = (value)=>{
  // 移除非数字和小数点的字符
  let formatted = value.replace(/[^0-9.]/g, '')
  // 限制小数点个数
  if(value.split('.').length > 2){
    formatted = oldVal
  }
  // 处理以小数点开头
  if(formatted.startsWith('.')){
    formatted = '0' + value
  }
  // 限制小数点后最多两位
  const parts = formatted.split('.')
  if (parts.length > 1 && parts[1].length > 2) {
    parts[1] = parts[1].substring(0, 2)
    formatted = parts.join('.')
  }
  // 限制整数最多6位
  if(parts[0].length > 6){
    formatted = oldVal
  }
  oldVal = formatted
  goodsData.value.price = formatted
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
    <div style="height: 30px">
      <el-button type="danger" plain
                 :style="{position: 'relative', left: -125 + 200*imgUrls.length + 'px'}"
                 v-if="imgUrls.length>0" @click="delImg" size="small">
        删除</el-button>
    </div>

    <div class="goods-info">
      <el-form :model="goodsData" label-width="auto" style="max-width: 400px">
        <el-form-item label="名称">
          <div style="width: 250px;"><el-input v-model="goodsData.name"/></div>
        </el-form-item>
        <el-form-item label="价格">
          <div style="width: 150px;"><el-input v-model="goodsData.price" @input="formatPrice"/></div>
        </el-form-item>
        <el-form-item label="分类">
          <div style="width: 150px;">
            <el-select v-model="goodsData.category">
              <el-option
                  v-for="item in categorys"
                  :key="item.id"
                  :label="item.name"
                  :value="item.categoryNum"
              />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="描述/交易信息">
          <el-input v-model="goodsData.description" type="textarea" :rows="10"/>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              @click="onSubmit"
              style="position: relative; left: 100px;width: 300px">
            发布
          </el-button>
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
  background-color: rgba(145, 158, 176, 0.62);
}
.goods-info{
  font-weight: bold;
  margin-top: 20px;
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