import { createRouter, createWebHistory } from "vue-router";

/* ------------------- App Components --------------------- */
import AppLayout from "../views/app/layout/AppLayout.vue";
import Home from "../views/app/home/Index.vue";
import AllProducts from "../views/app/all-products/Index.vue";
import ProductDetails from "../views/app/product-details/Index.vue";
import Cart from "../views/app/cart/Index.vue";
import AppOrders from "../views/app/orders/all-orders/Index.vue";
import AppOrderDetails from "../views/app/orders/order-details/Index.vue";
import AboutUs from "../views/app/about-us/Index.vue";

/* ------------------- Admin Components ------------------- */
import AdminLayout from "../views/admin/layout/AdminLayout.vue";
import Dashboard from "../views/admin/dashboard/Index.vue";
import Products from "../views/admin/products/Index.vue";
import Users from "../views/admin/users/Index.vue";
import Orders from "../views/admin/orders/all-orders/Index.vue";
import OrderDetails from "../views/admin/orders/order-details/Index.vue";

/* -------------------- Auth Components ------------------- */
import AuthLayout from "../views/auth/layout/AuthLayout.vue";
import Register from "../views/auth/app/Register.vue";
import Login from "../views/auth/app/Login.vue";
import AdminLogin from "../views/auth/admin/Login.vue";

/* ----------------------- Others ------------------------ */
import NotFound from "../components/NotFound.vue";
import store from "../store";
const appName = store.state.app.appName;
const appFavIcon = store.state.app.appFavIcon;

const routes = [
  /* -------------------- App Routes --------------------- */
  {
    path: "/",
    name: "app",
    component: AppLayout,
    meta: { public: true, appTitle: true },
    children: [
      {
        path: "/",
        name: "app.home",
        component: Home,
        meta: { title: "Home" },
      },
      {
        path: "/products",
        name: "app.products",
        component: AllProducts,
        meta: { title: "Products" },
      },
      {
        path: "/product-details/:slug",
        name: "app.product-details",
        component: ProductDetails,
        meta: { title: "Product Details" },
      },
      {
        path: "/cart",
        name: "app.cart",
        component: Cart,
        meta: { title: "My Cart" },
      },
      {
        path: "/orders",
        name: "app.orders",
        component: AppOrders,
        meta: { title: "My Orders" },
      },
      {
        path: "/orders-details/:id",
        name: "app.orders-details",
        component: AppOrderDetails,
        meta: { title: "Order Details" },
      },
      {
        path: "/about-us",
        name: "app.about-us",
        component: AboutUs,
        meta: { title: "About Us" },
      },
    ],
  },

  /* ------------------- Admin Routes -------------------- */
  {
    path: "/admin",
    name: "admin",
    redirect: "/admin/dashboard",
    component: AdminLayout,
    meta: {
      requiresAdminAuth: true,
      adminTitle: true,
    },
    children: [
      {
        path: "dashboard",
        name: "admin.dashboard",
        component: Dashboard,
        meta: { title: "Dashboard" },
      },
      {
        path: "products",
        name: "admin.products",
        component: Products,
        meta: { title: "Products" },
      },
      {
        path: "users",
        name: "admin.users",
        component: Users,
        meta: { title: "Users" },
      },
      {
        path: "orders",
        name: "admin.orders",
        component: Orders,
        meta: { title: "Orders" },
      },
      {
        path: "orders/:id",
        name: "admin.orders.view",
        component: OrderDetails,
        meta: { title: "Orders Details" },
      },
    ],
  },

  /* -------------------- Auth Routes -------------------- */
  {
    path: "/auth",
    redirect: "/login",
    component: AuthLayout,
    meta: {
      authTitle: true,
    },
    children: [
      {
        path: "/register",
        name: "register",
        component: Register,
        meta: { requiresAppGuest: true, title: "Register" },
      },

      {
        path: "/login",
        name: "login",
        component: Login,
        meta: { requiresAppGuest: true, title: "Login" },
      },
      {
        path: "/admin-login",
        name: "adminLogin",
        component: AdminLogin,
        meta: { requiresAdminGuest: true, title: "Admin Login" },
      },
    ],
  },

  /* --------------------- 404 Route --------------------- */
  {
    path: "/:pathMatch(.*)",
    name: "notfound",
    component: NotFound,
    meta: { title: "404" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  /* ------------- Middleware-Authentication ------------- */
  if (to.meta.requiresAdminAuth && !store.state.user.token) {
    next({ name: "adminLogin" });
  } else if (to.meta.requiresAdminGuest && store.state.user.token) {
    next({ name: "admin.dashboard" });
  } else if (to.meta.requiresAppGuest && store.state.user.token) {
    next({ name: "app.home" });
  } else if (to.meta.public && !store.state.user.token) {
    next({ name: "login" });
  } else {
    next();
  }

  /* ----------------- Change Page-Title ----------------- */
  if (to.meta.appTitle) {
    document.title = to.meta?.title ? `${to.meta.title} • ${appName}` : appName;
  } else if (to.meta.adminTitle) {
    document.title = to.meta?.title ? `${to.meta.title} • Admin` : "Admin";
  } else if (to.meta.authTitle) {
    document.title = to.meta?.title ? `${to.meta.title} • ${appName}` : appName;
  } else {
    document.title = to.meta?.title ? `${to.meta.title} • ${appName}` : appName;
  }

  /* ------------------- Change FavIcon ------------------ */
  document.getElementById("favicon").setAttribute("href", appFavIcon);
});

export default router;
