import { renderToStringAsync } from "solid-js/web";
import Browser from "../web/src/components/Browser";

// entry point for server render
export default async req => {
  return await renderToStringAsync(() => <Browser url={req.url} />);
};
