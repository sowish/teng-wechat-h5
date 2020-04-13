
import axios from "./index";
// import { Toast } from 'vant';
// import {getToken,getItem} from '@/utils/util'
export function api(url, method, request, other) {
    //   console.log(request);
    if (method == "post") {
        return axios({
            url: url,
            method: method,
            // params:request,
            params: other ? other : "",
            data: request,
            // headers: {
            //     "Content-Type": "application/json"
            // }
        }).then(res => {
            return res;
        }).catch(err=>{
            console.log(err);
        });
    } else {
        return axios({
            url: url,
            method: "get",
            params: request,
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            // }
        }).then(res => {
            return res;
        }).catch(err=>{
            // alert(err);
        });
    }
}