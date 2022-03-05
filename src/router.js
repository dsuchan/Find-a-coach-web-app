// Here, all the routing logic will be stored
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  router: [
    { path: '/', redirect: '/coaches' }, // If user loads '/' route, then will be redirected to '/coaches' route
    { path: '/coaches', component: null },
    {
      path: '/coaches/:id',
      component: null,
      children: [
        { path: 'contact', component: null }, // /coaches/:id/contact
      ],
    },
    { path: '/register', component: null },
    { path: '/requests', component: null },
    { path: '/:notFound(.*)', component: null }, // This will be shown if user is looking for something that doesn't exists
  ],
});

export default router;
