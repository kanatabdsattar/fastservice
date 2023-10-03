import { createApp } from 'vue'
import './style.css'
import Main from './view/main.vue'
import App from './App.vue'
import PickUp from './components/pickUp.vue'


import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path: '/',
            component: Main
        },
        {
            path: '/pickUp',
            component: PickUp
        }
    ]
})
createApp(App).use(router).mount('#app')
