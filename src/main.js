import  { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@fortawesome/vue-fontawesome'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Import Bootstrap and BootstrapVue CSS files (order is important)
// Make BootstrapVue available throughout your projectimport router from './router/index';
import VueGoogleMaps from '@fawmi/vue-google-maps'
import axios from 'axios';
import Toaster from '@meforma/vue-toaster';
import Dialog from 'vue3-dialog';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.baseURL = 'http://34.132.219.56:3000/api/v1';
const app = createApp(App)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBRtuXGql6gOktCpRriNRA1fpV2oIsfBLE',
    }})

app.use(Toaster)
app.use(Dialog);
app.mount('#app')