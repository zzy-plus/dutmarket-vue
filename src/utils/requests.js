import axios from "axios"
import code from "@/common/code.js"
import {Msg} from "@/utils/ElMessage.js";

//配置全局的超时时长
axios.defaults.timeout = 10000
//配置全局的基本URL  开启vue代理时，不能设置这个
//axios.defaults.baseURL = 'http://localhost:6666'


//响应拦截器
axios.interceptors.response.use(res=>{
    if(res.data.code === code.NEED_LOGIN){
        window.location.href = '/login'
    }
    return res //该返回对象会传到请求方法的响应对象中
},err=>{
    // 响应错误处理
    Msg.error('请求出错!')
    return Promise.reject(err);
})


const request = axios

export {
    request
}

