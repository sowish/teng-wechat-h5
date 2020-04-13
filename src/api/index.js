import axios from 'axios';

axios.defaults.baseURL = 'https://wechat.tkhealthcare.com/internethospital/platformwechat';//开发

var loading;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.data = config.data || {};
    // if (config.method === 'post') {
    // //     //添加token判断登录状态
    //     config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.data = JSON.stringify(config.data);
    // }
    store.commit('updateLoading', true)
    return config;
}, function (error) {
    // 对请求错误做些什么
    // alert(error)
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    // loading.close();

    return res;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axios;