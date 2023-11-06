import { createApp } from 'vue'
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
createApp(App).use(router).mount('#app')
