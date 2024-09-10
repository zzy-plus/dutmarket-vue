import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/list',
          component: ()=> import("@/views/GoodsListView.vue")
        },
        {
          path: '/detail/:id',
          component: ()=> import("@/views/GoodsDetailView.vue")
        },
        {
          path: '/publish',
          component: ()=> import("@/views/PublishView.vue")
        }
      ]
    },{
      path: '/login',
      component: ()=> import("@/views/LoginView.vue")
    }
  ]
})

export default router
