import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import DetailsPage from '@/views/DetailsPage.vue';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    },
    {
        path: '/details/:id',
        component: DetailsPage,
        name: 'DetailsPage',
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
