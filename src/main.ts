import "./app.css";
import { createRouter } from "./lib/router";

createRouter({
  routes: [
    { url: /^\/\/?$/, component: () => import("./routes/A.svelte") },
    { url: /^\/b\/?$/, component: () => import("./routes/B.svelte") },
    { url: /^\/c\/?$/, component: () => import("./routes/C.svelte") },
    {
      url: /^\/shop\/([^/]+)\/?$/,
      params: ["shopId"],
      paramsMatcher: [(shopId) => /^\d+$/.test(shopId)],
      component: () => import("./routes/Shop.svelte"),
    },
    {
      url: /^\/item\/([^/]+)\/([^/]+)\/?$/,
      params: ["shopId", "itemId"],
      paramsMatcher: [
        (shopId) => /^\d+$/.test(shopId),
        (itemId) => /^\d+$/.test(itemId),
      ],
      component: () => import("./routes/Item.svelte"),
    },
    {
      url: /^\/help\/([^/]+)\/([^/]+)\/?$/,
      params: ["shopId", "itemId"],
      paramsMatcher: [
        (shopId) => /^\d+$/.test(shopId),
        (itemId) => /^\d+$/.test(itemId),
      ],

      component: () => import("./routes/Help.svelte"),
    },
  ],
  target: document.getElementById("app"),
});
