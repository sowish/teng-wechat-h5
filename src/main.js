import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/store.js";
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js';
Vue.use(Vant);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
