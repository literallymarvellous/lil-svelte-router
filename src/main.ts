import "./app.css";
import { createRouter } from "./lib/router";

createRouter({
  routes: [
    { url: /^\/\/?$/, component: () => import("./routes/A.svelte") },
    { url: /^\/b\/?$/, component: () => import("./routes/B.svelte") },
    { url: /^\/c\/?$/, component: () => import("./routes/C.svelte") },
    {
      url: /^\/shop\/([^/]+)\/?$/,
      params: [{ name: "shopId", matching: (shopId) => /^\d+$/.test(shopId) }],
      component: () => import("./routes/Shop.svelte"),
    },
    {
      url: /^\/item\/([^/]+)\/([^/]+)\/?$/,
      params: [
        { name: "shopId", matching: (shopId) => /^\d+$/.test(shopId) },
        { name: "itemId", matching: (itemId) => /^\d+$/.test(itemId) },
      ],
      component: () => import("./routes/Item.svelte"),
    },
    {
      url: /^\/help\/([^/]+)\/([^/]+)\/?$/,
      params: [{ name: "shopId" }, { name: "itemId" }],
      component: () => import("./routes/Help.svelte"),
    },
    {
      url: /^\/a(?:\/?|\/(.+)\/?)$/,
      params: [
        {
          name: "rest",
          isRest: true,
        },
      ],
      component: () => import("./routes/Rest.svelte"),
    },
  ],
  target: document.getElementById("app"),
});
