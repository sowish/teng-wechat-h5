import Vue from "vue";
import Router from "vue-router";
// import wx from 'weixin-js-sdk';
import routerFirst from './routerFirst';
Vue.use(Router);

const router =  new Router({
    routes: [
        ...routerFirst
    ]
});

// router.beforeEach((to, from, next) => {
//     // 特殊处理授权成功后的user个人中心页面点击返回退出到微信消息列表页
//     // let mark = to.fullPath.indexOf('code')
//     console.log(to);
//     console.log(from);
    
    
//     // if (mark !== -1 && from.fullPath === '/index' && from.fullPath === '/about') {
//     //     wx.closeWindow()
//     // }
// })
export default router;