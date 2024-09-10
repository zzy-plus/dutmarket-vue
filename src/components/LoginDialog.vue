<script setup>
import {ref} from "vue";
import {request} from "@/utils/requests.js";
import {Msg} from "@/utils/ElMessage.js";
import {useRouter} from "vue-router";

const router = useRouter()

const formRef = ref()
const formData = ref({
  account: '',
  password: '',
  checkPass: '',
  nickname: '',
  code: '',
  email: ''
})
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (formData.value.checkPass !== '') {
      formRef.value.validateField('checkPass')
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formData.value.password) {
    console.log(value, formData.value.password)
    callback(new Error("密码不匹配！"))
  } else {
    callback()
  }
}
const formRules = ref({
  account: {required: true, message: '账号不能为空', trigger: 'blur' },
  password: {required: true, validator: validatePass, trigger: 'blur'},
  checkPass: {required: true, validator: validatePass2, trigger: 'blur'},
  nickname: {required: true, message: '昵称不能为空', trigger: 'blur' },
  code: {required: true, message: '验证码不能为空', trigger: 'blur' },
  email: {required: true, message: '邮箱不能为空', trigger: 'blur' }
})

const isLogin = ref(true)
const switchLogin = ()=>{
  isLogin.value = !isLogin.value
}

// 修改密码
const emit = defineEmits(['change-pass'])
const forgetPass = ()=>{
  emit('change-pass')
}

const onSubmit = async ()=>{
  if(isLogin.value){  // 登录逻辑
    if(formData.value.account === '' || formData.value.password === ''){
      Msg.warning("账号/密码不能为空")
      return
    }
    const resp = await request.post('/api/lg/login',formData.value)
    console.log(resp.data)
    if(resp.data.code === 0){
      router.push('/list')
    }else{
      Msg.error(resp.data.msg)
    }
  }else{     // 注册逻辑
    formRef.value.validate(async (valid)=>{
      if(valid){
        const resp = await request.post(`/api/user/register?code=${formData.value.code}`, formData.value)
        if(resp.data.code === 0){
          Msg.success("注册成功，返回登录")
          isLogin.value = true
        }else{
          Msg.error(resp.data.msg)
        }
      }
    })
  }
}

const btnLoading = ref(false)
const getCode = async ()=>{
  if(formData.value.email === ''){
    Msg.warning('请输入邮箱地址')
    return
  }
  btnLoading.value = true
  setTimeout(()=>{
    btnLoading.value = false
  }, 5000)
  const resp = await request.get(`/api/lg/code?email=${formData.value.email}`)
  if(resp.data.code !== 0){
    Msg.error(resp.data.msg)
  }else{
    Msg.success('验证码发送成功!')
  }

  btnLoading.value = false
}

</script>

<template>
  <div class="login-dlg" :style="{height: isLogin? '160px': '350px'}">
    <div style="font-weight: bolder">
      <el-form
          ref="formRef"
          style="max-width: 250px"
          :model="formData"
          :rules="formRules"
          label-width="auto"
      >
        <el-form-item label="昵称" prop="nickname" v-if="!isLogin">
          <el-input v-model="formData.nickname" />
        </el-form-item>
        <el-form-item label="账号" prop="account" >
          <el-input v-model="formData.account" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="!isLogin">
          <el-input v-model="formData.checkPass" type="password"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" v-if="!isLogin">
          <el-input v-model="formData.email" type="text"/>
        </el-form-item>
        <el-form-item label="验证码" prop="code" v-if="!isLogin">
          <div style="display: flex">
            <el-input v-model="formData.code"/>
            <el-button type="warning" style="margin-left: 5px"
                       :loading="btnLoading" @click="getCode">获取</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="position: relative; left: 50px">
      <div style="margin-top: 10px">
        <el-button @click="switchLogin">
          {{isLogin? '注册账号': '返回登陆'}}
        </el-button>
        <el-button type="primary" style="width: 100px" @click="onSubmit">
          {{isLogin? '登陆': '提交'}}
        </el-button>
      </div>
      <div style="position: relative; left: 130px; font-size: 14px; color: #2397ee; padding-top: 10px; cursor: pointer"
          v-if="isLogin" @click="forgetPass">
        忘记密码？
      </div>
    </div>
  </div>

</template>

<style scoped>
.login-dlg{
  width: 280px;
  padding: 30px;
  background-image: url("@/assets/login_dlg_back.jpg");
  background-size: cover;
  background-position: inherit;
  box-shadow: 8px 8px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
</style>


