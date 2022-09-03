import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/form",
    name: "form",
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/form/:id",
    name: "formId",
    component: () => import("../views/FormView.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
    path: "/productlist",
    name: "productlist",
    component: () => import("../views/ProductListView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
