import "./app.css";
import { createRouter } from "./lib/router";

createRouter({
  routes: [
    { url: "/", component: () => import("./routes/A.svelte") },
    { url: "/b", component: () => import("./routes/B.svelte") },
    { url: "/c", component: () => import("./routes/C.svelte") },
  ],
  target: document.getElementById("app"),
});
