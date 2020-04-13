export default {
  default: {
    reg: /./
  },
  phone: {
    reg: /^1\d{10}$/,
    tips: "请输入正确的手机号"
  },
  email: {
    reg: /./,
    tips: "请输入正确的邮箱"
  },
  username: {
    reg: /^[\w\W]{6,12}$/,
    tips: "用户名由6~12位的字母或数字组成"
  },
  password: {
    reg: /^[\w\W]{6,12}$/,
    tips: "密码由6~12位的字母或数字组成"
  }
};
// @手机号校验
export function isvalidPhone(str) {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}
// @密码校验
export function isvalidPwd(str) {
  const reg = /[a-zA-Z0-9]{6,20}$/;
  return reg.test(str);
}
// @密码账号
export function isvalidAccount(str) {
  const reg = /[a-zA-Z0-9]{2,20}$/;
  return reg.test(str);
}
