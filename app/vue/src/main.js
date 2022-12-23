import { createApp } from 'vue';
import App from './MainApp';
import router from './router/index';
import store from "./store/index";
import i18n from "@/i18n";
import './styles/app.css';
import { createMetaManager } from 'vue-meta'

const app = createApp(App);
app.use(router);
app.use(store);
app.use(i18n);
app.use(createMetaManager());
app.mount('#app');
