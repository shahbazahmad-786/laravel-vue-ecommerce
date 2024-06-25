import { createApp } from "vue";

/* ------------------ Import ------------------ */
import App from "./App.vue"; /* App-Component */
import "./index.css"; /* Tailwind-CSS-File */
import router from "./router"; /* Router-Dir */
import store from "./store"; /* Vuex-Store-Dir */
import plugins from "./plugins"; /* Custom-Plugins-Dir */
import currencyUSD from "./filters/currency.js" /* Change-into-USD-Currency */;
import subStr from "./filters/substr.js"; /* Convert Str to SubStr */

const app = createApp(App);

/* ------------------ Usage ------------------ */
app.use(router); /* Router */
app.use(store); /* Store */
app.use(plugins); /* Plugins */
app.mount("#app"); /* App Mount */
app.config.globalProperties.$filters = { currencyUSD, subStr }; /* Filters */
