import  { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// Import Bootstrap and BootstrapVue CSS files (order is important)
// Make BootstrapVue available throughout your projectimport router from './router/index';

import axios from 'axios';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://localhost:3000/api/v1';
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)
app.mount('#app')