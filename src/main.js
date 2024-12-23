import Vue from "vue";
import ElementUI from "element-ui";
import * as echarts from "echarts";
import _ from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import directive from "./directive"; //directive
import { aHrefToDownload } from "./utils/commonDownload";

//引入全局filters
import filters from './filters'

/**
 * import css
 **/
import "@/assets/styles/font-face.css";
import "@/assets/styles/global.scss";
import "@/assets/styles/element-variables.scss";
import "@/assets/styles/cover-components/index.scss";
import "@/assets/styles/common.less";
import "@/assets/styles/index.scss";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/icons"; // icon
import "./permission"; // permission control
import "./utils/filter"; // filter方法
import i18n from './i18n'

Vue.prototype.$echarts = echarts;
Vue.prototype._ = _;
Vue.prototype.dayjs = dayjs; // 全局挂载dayjs
dayjs.locale("zh-cn"); // 改变dayjs全局语言




Vue.use(ElementUI,
	{
		i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法,可以实现当点击切换按钮后，elementUI可以自动调用.js语言文件实现多语言切换
	}
)




const navLang = navigator.language || navigator.userLanguage;
let lang = (navLang.includes('zh')?'zh':'en'); //实际语言包
if (localStorage.getItem("lang")){
	lang = localStorage.getItem("lang").includes('zh')?'zh':'en';
}

console.info("lang",lang)
localStorage.setItem("lang", lang);
i18n.locale = lang;

Vue.use(directive);
Vue.use(filters);
Vue.prototype.$aHrefToDownload = aHrefToDownload;
Vue.config.productionTip = false;



new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
