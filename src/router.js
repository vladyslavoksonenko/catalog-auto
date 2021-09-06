import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/Home.vue';
import PageCar from './views/PageCar.vue';
import NotFound from './views/NotFound.vue';
import AddCar from "./views/AddCar";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/addCar',
        name: 'AddCar',
        component: AddCar
    },
    {
        path: '/cars/:id', component: PageCar
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },




]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
