const getDeviceIdUrl = "app://getDeviceId";
// import { JSEncrypt } from "jsencrypt";

export function isEmptyObject(obj) {
  let i;
  for (i in obj) {
    return false;
  }
  return true;
}

export function getBaseUrl() {
  let baseUrl = ""; //这里是一个默认的url，可以没有
  switch (process.env.VUE_APP_CURENV) {
    case "development":
      baseUrl = "http://app-t.healthservice.mobile.taikang.com:80"; //这里是本地的请求url
      break;
    case "production":
      baseUrl = "http://mall.healthservice.mobile.taikang.com"; //生产环境url
      break;
  }
  return baseUrl;
}
export function setItem(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

export function getItem(name) {
  return JSON.parse(localStorage.getItem(name));
}
export function setItemSession(name, item) {
  sessionStorage.setItem(name, JSON.stringify(item));
}

export function getItemSession(name) {
  return JSON.parse(sessionStorage.getItem(name));
}

export function removeItem(name) {
  localStorage.removeItem(name);
}

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * [getUrlParam 解析 url 中的参数]
 * @param {[type]} name [要获取的参数名]
 * @return {[type]} [description]
 */
export function getUrlParam(name) {
  let len = location.href.split("?").length;
  let paramsString = location.href.split("?")[len - 1],
    res = {};
  if (!paramsString) {
    return null;
  }
  let params = paramsString.split("&");
  for (let param of params) {
    let tmp = param.split("=");
    res[tmp[0]] = tmp[1];
  }
  if (name) {
    return res[name];
  } else {
    return res;
  }
}

/**
 * [getDeviceId 获取设备码]
 * @return {[type]} [description]
 * @description
 * 1、获取用户唯一标识码
 */
export function getUuid() {
  return getItem("uuid");
}

/**
 * [getDeviceIdFromApp 从原生 app 获取设备码]
 * @return {[type]} [description]
 * !!! 有可能有异步操作的问题
 */
export function getDeviceIdFromApp() {
  let deviceId = getItem("deviceId");

  // 如果已经有设备号就不作任何操作
  if (deviceId) {
    return;
  }
  // 如果是 windows 环境，设备号随机生成，仅作为测试使用
  if (window.navigator.platform.indexOf("Win") > -1) {
    deviceId = randomInt(10000, 99999) + new Date().getTime().toString();
    setItem("deviceId", deviceId);
  } else {
    if (!window.setDeviceId) {
      window.setDeviceId = deviceId => {
        setItem("deviceId", deviceId);
      };
    }
    window.location = getDeviceIdUrl;
  }
}
/**
 * 将日期转换为指定的格式
 * @param {Object} dateStr   "1469281920000" "2016-07-23 21:52"
 * @param {Object} fmt   "yyyy.MM.dd" "yyyy/MM/dd" "yyyy-MM-dd"
 * eg:var time2 = new Date().format("yyyy-MM-dd");
 */
export function dateFormat(dateStr, fmt) {
  dateStr = new Date(dateStr);
  var o = {
    "M+": dateStr.getMonth() + 1, //月份
    "d+": dateStr.getDate(), //日
    "h+": dateStr.getHours(), //小时
    "m+": dateStr.getMinutes(), //分
    "s+": dateStr.getSeconds(), //秒
    "q+": Math.floor((dateStr.getMonth() + 3) / 3), //季度
    S: dateStr.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (dateStr.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}

// // 加密
// export function encrypt(str) {
//   let encrypt = new JSEncrypt();
//   let public_key = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMwJ3kFxrAXTRY2X7TXQrzT7Ocuxo0K/M3PHahI9Ap4R7meDJvu8+4olpcCGUabKjhDka41Jr2G1aHmU+TbThC0CAwEAAQ==";
//   encrypt.setPublicKey(public_key);
//   return encrypt.encrypt(str);
// }
// // 解密
// export function decrypt(str) {
//   var decrypt = new JSEncrypt();
//   var PRIVATE_KEY = 'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAzAneQXGsBdNFjZftNdCvNPs5y7GjQr8zc8dqEj0CnhHuZ4Mm+7z7iiWlwIZRpsqOEORrjUmvYbVoeZT5NtOELQIDAQABAkEAmfHsHkaMuwxvkuiJEix0tS3DqptJiefHA1j2//HGUsntoSPPNy0l1KvDhJZzXr6KcK9M4oTpurBN2Q7mM8u15QIhAOvTi2uN75CAaGzC8PD/hwV+MnAci9mJ0cggeQJOTsxLAiEA3X4wm5Fw1+6rWtu+vnwrMwx3O50Msa6lnZONLJ5mtmcCIG0KmLm3nGDlbuNzU/MrQ+RfULUUDfodRrnRggJ18Ot3AiEA1YUywqXAjMkuM1anWOZGlt2ri7JobFmamn+Flr/U8H0CIHBc1O/spMCs5ytnvTm5u//vi/4/muvMyMFBjh6O87R3';
//   decrypt.setPrivateKey(PRIVATE_KEY);
//   return decrypt.decrypt(str);
// }
