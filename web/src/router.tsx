import { createSignal, createContext, useContext, useTransition, JSX } from "solid-js";
import { isServer } from "solid-js/web";

// Super simplistic pushstate router that matches on absolute paths
const RouterContext = createContext();
function RouteHOC(Comp: () => JSX.Element) {
  return (props: any = {}) => {
    const [location, setLocation] = createSignal(
        (props.url ? props.url : window.location.pathname).slice(1) || "index"
      ),
      matches = (match: string) => match === (location() || "index"),
      [pending, start] = useTransition();
    !isServer && (window.onpopstate = () => setLocation(window.location.pathname.slice(1)));

    return (
      <RouterContext.Provider
        value={[location, pending, { setLocation: (v: string) => start(() => setLocation(v)), matches }]}
      >
        <Comp />
      </RouterContext.Provider>
    );
  };
}

const Link = (props: any) => {
  //@ts-ignore
  const [, , { setLocation }] = useContext(RouterContext);
  const navigate = (e: Event) => {
    if (e) e.preventDefault();
    window.history.pushState("", "", `/${props.path}`);
    setLocation(props.path);
  };
  return (
    <a class="link" href={`/${props.path}`} onClick={navigate}>
      {props.children}
    </a>
  );
};

export { RouteHOC, RouterContext, Link };
