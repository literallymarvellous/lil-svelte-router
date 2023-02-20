import type { SvelteComponent } from "svelte";
import NotFound from "./NotFound.svelte";

interface RouterParams {
  routes: Route[];
  target: HTMLElement;
}

interface Route {
  url: string;
  component: typeof SvelteComponent;
}

export function createRouter({ routes, target }: RouterParams) {
  const addRouting = (e: MouseEvent) => {
    const target = e.target;
    const anchorTag = findAnchorTag(target as HTMLElement);

    console.log(target, anchorTag);
    if (!anchorTag) return;
    if (anchorTag.target) return;
    e.preventDefault();
    const targetLaction = anchorTag.href;
    const targetPathname = new URL(targetLaction).pathname;

    history.pushState({}, undefined, targetPathname);

    matchRoute(targetPathname);
  };

  const matchRoute = (pathname: string) => {
    if (currentComponent) {
      currentComponent.$destroy();
      window.removeEventListener("click", addRouting);
    }

    const matchedRoute = routes.find((route) => {
      return route.url === pathname;
    });

    const matchedComponent = matchedRoute.component ?? NotFound;

    currentComponent = new matchedComponent({ target });

    document.body.addEventListener("click", addRouting);

    window.addEventListener("popstate", () => {
      matchRoute(window.location.pathname);
    });
  };

  let currentComponent: SvelteComponent;
  matchRoute(window.location.pathname);
}

const findAnchorTag = (el: HTMLElement) => {
  if (el.tagName === "HTML") return null;
  if (el.tagName === "A") return el;
  return findAnchorTag(el.parentElement);
};
