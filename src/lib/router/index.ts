import type { SvelteComponent } from "svelte";

const NotFound = () => import("./NotFound.svelte");

interface RouterParams {
  routes: Route[];
  target: HTMLElement;
}

interface Route {
  url: string;
  component: () => Promise<{ default: typeof SvelteComponent }>;
}

export function createRouter({ routes, target }: RouterParams) {
  const addRouting = (e: MouseEvent) => {
    const target = e.target;
    const anchorTag = findAnchorTag(target as HTMLElement);

    if (!anchorTag) return;
    if (anchorTag.target) return;
    e.preventDefault();
    const targetLaction = anchorTag.href;
    const targetPathname = new URL(targetLaction).pathname;

    history.pushState({}, undefined, targetPathname);

    matchRoute(targetPathname);
  };

  const popBack = () => {
    matchRoute(window.location.pathname);
  };

  const matchRoute = (pathname: string) => {
    if (currentComponent) {
      currentComponent.$destroy();
    }

    const matchedRoute = routes.find((route) => {
      return route.url === pathname;
    });

    const matchedComponentPromise = matchedRoute?.component ?? NotFound;

    matchedComponentPromise().then(({ default: matchedComponent }) => {
      currentComponent = new matchedComponent({ target });
    });
  };

  let currentComponent: SvelteComponent;
  matchRoute(window.location.pathname);

  document.body.addEventListener("click", addRouting);

  window.addEventListener("popstate", popBack);
}

const findAnchorTag = (el: HTMLElement) => {
  if (el.tagName === "HTML") return null;
  if (el.tagName === "A") return el;
  return findAnchorTag(el.parentElement);
};
