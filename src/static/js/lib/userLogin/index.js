import {api} from "@/api/api";

export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // alert(window.location.search);
    // alert(window.location.href);
    // alert(window.location.search);
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

export function getUrlParamOpenId(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // alert(window.location.search);
    // alert(window.location.href);
    // alert(window.location.hash);
    var r = window.location.hash.substr(8).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// export function userLogin() {
//     // alert('执行userLogin');
//     const code = getUrlParam('code');
//     const wechartUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?',
//         webUrl = encodeURIComponent(window.location.href),
//         appId = 'wx7451fceb1d2e73d9',
//         resultUrl = wechartUrl + 'appid=' + appId + '&redirect_uri=' + webUrl + '&response_type=code&scope=snsapi_base#wechat_redirect';
//     if (code == null || code == "") {
//         // alert('跳转授权');
//         window.location.href = resultUrl;
//     } else {
//         //有了code,调接口请求用户信息openid
//         // console.log(code);
//         // alert('从微信获取到了code'+code);
//         api('/wechat/redirect/greetUser','post',{appid:appId,code:code}).then(res=>{
//             console.log(res);
//             if(res.data.code==2000){
//                 let openid=res.data.data.openId;
//                 sessionStorage.setItem('openid',openid);
//                 api('/wechat/userInfo/userCheck','post',{},{'openId':openid}).then(res=>{
//                     if(res.data.code==2000){  //注册过
//                         // alert('用户已经注册');
//                         // return 0;
//
//                     }
//                     if(res.data.code==2001){//没注册
//                         // alert('用户未注册');
//                         this.$router.replace('/phone');
//                         // return 1;
//
//                     }
//                 });
//             }
//         })
//     }
//
// }

