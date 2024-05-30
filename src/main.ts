import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import Main from './view/main.vue'
import App from './App.vue'


import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            component: Main
        }
    ]
})
const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
