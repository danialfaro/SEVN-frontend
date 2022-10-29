import { createApp } from 'vue'
import router from './router'

import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import dayjs from 'dayjs'

import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client'

import { createPinia } from 'pinia'

// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia) //pinia stores
app.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000/')
  })
);
app.use(VueAxios, axios)
app.config.globalProperties.$dayjs = dayjs // agregamos dayjs globalmente para poder formatear las fechas en cualquier componente
app.mount('#app')
