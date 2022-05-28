import { renderToStringAsync } from "solid-js/web";
import App from "../web/src/components/App";

// entry point for server render
export default async req => {
  return await renderToStringAsync(() => <App url={req.url} />);
};
