<script setup>
import {ref} from "vue";

const formRef = ref()
const formData = ref({
  account: '',
  password: '',
  checkPass: '',
  nickname: '',
  code: '',
  email: ''
})
const formRules = ref()
const isLogin = ref(true)
const switchLogin = ()=>{
  isLogin.value = !isLogin.value
}

const emit = defineEmits(['change-pass'])
const forgetPass = ()=>{
  emit('change-pass')
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
          <el-input v-model.number="formData.checkPass" type="password"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" v-if="!isLogin">
          <el-input v-model.number="formData.email" />
        </el-form-item>
        <el-form-item label="验证码" prop="code" v-if="!isLogin">
          <div style="display: flex">
            <el-input v-model.number="formData.code"/>
            <el-button type="warning" style="margin-left: 5px">获取</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="position: relative; left: 50px">
      <div style="margin-top: 10px">
        <el-button @click="switchLogin">
          {{isLogin? '注册账号': '返回登陆'}}
        </el-button>
        <el-button type="primary" style="width: 100px">
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
  position: absolute;
  top: 250px;
  right: 400px;
  background-image: url("@/assets/login_dlg_back.jpg");
  background-size: cover;
  background-position: inherit;
  box-shadow: 8px 8px 5px 1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
</style>


