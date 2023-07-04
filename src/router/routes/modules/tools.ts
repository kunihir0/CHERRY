const tools = [{
  path: "/tools",
  name: "Tools",
  component: () => import("~/pages/tools/index.vue"),
  meta: {
    title: "Tools",
  },
}, {
  path: "/tools/electric",
  name: "Electric",
  component: () => import("~/pages/tools/electric.vue"),
},
];

export default tools;
