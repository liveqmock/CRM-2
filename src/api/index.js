import axios from 'axios';
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
import utils from '../utils/index.js';
import qs from 'qs';
  
// axios.defaults.baseURL = 'https://www.easy-mock.com';
// axios.defaults.baseURL = 'http://172.16.10.252:8101/';//开发
 

axios.defaults.timeout = 20000;   

axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

var loading;
axios.interceptors.request.use(config => {
  let receiveData = config.data;
  // 免session
  // let nocheckout = ['/admin/adminLogin/pswLogin'];
  // let url = '/'+config.url.split(axios.defaults.baseURL)[1];
  // if(nocheckout.indexOf(url) == -1){
  //   let sessionId = sessionStorage.getItem('sessionId') || 'adsadsasasasd';
  //   let sessionPwd = sessionStorage.getItem('sessionPwd') || 'qewqeqeqeqwqe';
  //   receiveData.sessionId = sessionId;
  //   receiveData.sessionPwd = sessionPwd;
  // }
  if(config.data.url == undefined){
    receiveData.url = config.url;
  }
  if(config.method == 'post'){
    var sentData = qs.stringify(receiveData);
  }else{
    var sentData = receiveData;
  }
  config.data = sentData;
    return config;
});

axios.interceptors.response.use(
  res => {
    if(res.data.code == 210){
      sessionStorage.clear();
      localStorage.clear();
      Message.warning({duration:1000,message:'登陆超时，请重新登陆'})
    }
    if (res.status != '200') {
      Message.error({duration:1000,message:'响应失败'})
      setTimeout(()=>{
        Message.closeAll();
      },1000)
      return Promise.reject(res);
    }
    return res;
  },
  err => {
    Message.error({duration:1000,message:'网络异常'})
    return Promise.reject(err);
  }
);

export default axios;