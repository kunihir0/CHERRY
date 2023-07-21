import appstore from "~/store";

function requireAuth(to, from, next) {
  const userStore = appstore.useUserStore;
  if (!userStore.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
}

const user = [{
  path: "/user",
  name: "Users",
  component: () => import("~/pages/user/index.vue"),
  meta: {
    title: "Users",
  },
},
{
  path: "/user/login",
  name: "Login",
  component: () => import("~/pages/user/login.vue"),
},
{
  path: "/user/register",
  name: "Register",
  component: () => import("~/pages/user/register.vue"),
},
{
  path: "/user/profile/:email",
  name: "Profile",
  component: () => import("~/pages/user/profile.vue"),
  beforeEnter: requireAuth,
},

];

export default user;
