import { createApp } from 'vue'
//import { createStore } from 'vuex'
import store from './store'
import router from './router'

import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import dayjs from 'dayjs'

import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

// element plus css
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'

// tailwind css
//import './index.css'
//import 'flowbite'


// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';

const app = createApp(App)
app.use(router)
app.use(store)
app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000/')
  }, store)
);
//app.use(ElementPlus)
app.use(VueAxios, axios)
app.config.globalProperties.$dayjs = dayjs // agregamos dayjs globalmente para poder formatear las fechas en cualquier componente
app.mount('#app')
