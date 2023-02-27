import type { SvelteComponent } from "svelte";
import LoadingIndicator from "./LoadingIndicator.svelte";
const NotFound = () => import("./NotFound.svelte");

interface RouterParams {
  routes: Route[];
  target: HTMLElement;
}

interface Route {
  url: RegExp;
  component: () => Promise<{ default: typeof SvelteComponent }>;
  params?: {
    name: string;
    matching?: (param: string) => boolean;
    isRest?: boolean;
  }[];
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
    let matchedRouteParams: Record<string, number>;
    let matchedRoute: Route;

    match_routing: for (const route of routes) {
      const match = pathname.match(route.url);
      if (match) {
        const params = {};
        const paramsLen = route.params ? route.params.length : 0;
        for (let i = 0; i < paramsLen; i++) {
          const { name, matching, isRest } = route.params[i];

          const paramValue = match[i + 1] ?? "";
          if (matching) {
            if (!matching(paramValue)) {
              continue match_routing;
            }
          }

          params[name] = isRest ? paramValue.split("/") : paramValue;
        }

        matchedRoute = route;
        matchedRouteParams = params;
        break;
      }
    }

    const matchedComponentPromise = matchedRoute?.component ?? NotFound;
    showLoadingIndicator();

    matchedComponentPromise().then(({ default: matchedComponent }) => {
      hideLoadingIndicator();

      if (currentComponent === matchedComponent) {
        currentComponentInstance.$set(matchedRouteParams);
      } else {
        if (currentComponentInstance) {
          currentComponentInstance.$destroy();
        }
        currentComponentInstance = new matchedComponent({
          props: matchedRouteParams,
          target,
        });
      }

      currentComponent = matchedComponent;
    });
  };

  const indicator = new LoadingIndicator({
    target: document.body,
  });

  function showLoadingIndicator() {
    indicator.show();
  }
  function hideLoadingIndicator() {
    indicator.hide();
  }

  let currentComponent: typeof SvelteComponent;
  let currentComponentInstance: SvelteComponent;
  matchRoute(window.location.pathname);

  document.body.addEventListener("click", addRouting);

  window.addEventListener("popstate", popBack);
}

const findAnchorTag = (el: HTMLElement) => {
  if (el.tagName === "HTML") return null;
  if (el.tagName === "A") return el;
  return findAnchorTag(el.parentElement);
};
