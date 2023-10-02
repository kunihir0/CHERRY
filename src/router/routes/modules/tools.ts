const tools = [{
  path: "/tools",
  name: "Tools",
  component: () => import("~/pages/tools/index.vue"),
  meta: {
    title: "Tools",
  },
},
{
  path: "/tools/electric",
  name: "Electric",
  component: () => import("~/pages/tools/electric.vue"),
},
{
  path: "/tools/cannabis",
  name: "Cannabis",
  component: () => import("~/pages/tools/cannabis.vue"),
},
{
  path: "/tools/mortgage",
  name: "Mortgage",
  component: () => import("~/pages/tools/mortgage.vue"),
},
];

export default tools;
