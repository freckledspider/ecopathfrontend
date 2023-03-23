import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import TheIndex from './components/pages/TheIndex.vue'
import TheLog from './components/pages/TheLog.vue'
import TheShow from './components/pages/TheShow.vue'
import TheCreate from './components/pages/TheCreate'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'index', path: '/', component: TheIndex },
        { name: 'log', path: '/log', component: TheLog },
        { name: 'show', path: '/log/:id', component: TheShow },
        { name: 'new', path: '/new', component: TheCreate },
    ]
})

const app = createApp(App)

app.use(router);

app.mount('#app');