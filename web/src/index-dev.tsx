import { render } from "solid-js/web";
import App from "./components/App";
import { RouteHOC } from "./router";

const RouteApp = RouteHOC(() => <App/>);

render(() => <RouteApp/>, document.getElementById("root")!);