import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import OpenQuiz from '../views/OpenProject.vue'
import SaveProject from '../views/SaveProject.vue'
import Editor from '../views/Editor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/open', component: OpenQuiz
  // },
  {
    path: '/editor', component: Editor 
  },
  {
    path: '/open_project', name: 'open_project', component: OpenQuiz
  },
  {
    path: '/save-project', name: 'save-project', component: SaveProject
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
