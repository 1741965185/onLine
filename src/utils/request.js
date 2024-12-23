import store from '@/store';
import errorCode from '@/utils/errorCode';
import axios from 'axios';
import { Message, MessageBox, Notification } from 'element-ui';
import i18n from "@/i18n";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 8000,
});
// request拦截器
service.interceptors.request.use(config => {
    // removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    // addPending(config) // 将当前请求添加到 pending 中
    // other code before request
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (sessionStorage.getItem('JWT') && !isToken) {
      config.headers['Authorization'] = sessionStorage.getItem('JWT'); // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['merNo'] = sessionStorage.getItem('merNo');//让每个请求携带商户号 请根据实际情况自行修改
      config.headers['merId'] = sessionStorage.getItem('merId');
      config.headers['user'] = sessionStorage.getItem('user');
    }
    config.headers['lang'] = localStorage.getItem('lang') || "zh";
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?';
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + '=';
        if (value !== null && typeof (value) !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              let params = propName + '[' + key + ']';
              var subPart = encodeURIComponent(params) + '=';
              url += subPart + encodeURIComponent(value[key]) + '&';
            }
          } else {
            url += part + encodeURIComponent(value) + '&';
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  });

// 响应拦截器
service.interceptors.response.use(res => {
    // removePending(res) // 在请求结束后，移除本次请求
    // 未设置状态码则默认成功状态
    //TODO code需要统一
    const code = res.data.code || res.data.status || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default'];
    if (code === 401) {
      MessageBox.confirm(i18n.t('sysText.expiredLoginStatus'), i18n.t('sysText.systemPrompt'), {
          confirmButtonText: i18n.t('sysText.reLogin'),
          cancelButtonText: i18n.t('sysText.cancel'),
          type: 'warning',
        },
      ).then(() => {
        sessionStorage.clear();
        store.dispatch('FedLogOut').then(() => {
          location.href = '/index';
        });
      }).catch(() => {
      });
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error',
      });
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      Notification.error({
        title: msg,
      });
      return Promise.reject('error');
    } else {
      return res.data;
    }
  },
  error => {
    // console.log("err" + error)
    let { message } = error;
    if (message == 'Network Error') {
      message = 'Network Error';
    } else if (message.includes('timeout')) {
      message = 'Timeout';
    } else if (message.includes('Request failed with status code')) {
      // message = '系统接口' + message.substr(message.length - 3) + '异常';
      message = 'Request failed with status code';
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
