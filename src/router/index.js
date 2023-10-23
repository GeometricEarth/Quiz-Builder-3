import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import OpenQuiz from "../views/OpenProject.vue";
import SaveProject from "../views/SaveProject.vue";
import Editor from "../views/Editor.vue";
import PageToPrint from "../views/PageToPrint.vue";
import Editor2 from "../views/Editor2.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
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
    path: "/editor",
    name: "editor",
    component: Editor,
  },
  {
    path: "/editor2",
    name: "editor2",
    component: Editor2,
  },
  {
    path: "/open_project",
    name: "open_project",
    component: OpenQuiz,
  },
  {
    path: "/save-project",
    name: "save-project",
    component: SaveProject,
  },
  {
    path: "/page-to-print",
    name: "pagetoprint",
    component: PageToPrint,
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

const onError = (e) => {
  // avoid NavigationDuplicated
  if (e.name !== "NavigationDuplicated") throw e;
};

// keep original function
const _push = router.__proto__.push;
// then override it
router.__proto__.push = function push(...args) {
  try {
    const op = _push.call(this, ...args);
    if (op instanceof Promise) op.catch(onError);
    return op;
  } catch (e) {
    onError(e);
  }
};

export default router;
