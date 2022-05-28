import path from "path";
import { fileURLToPath } from 'url';
import { renderStatic } from "./scripts/render.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const PAGES = ["index", "profile", "settings"];
const pathToServer = __dirname+"/lib/index.js";
const pathToDist = "dist";

renderStatic(
  PAGES.map(p => ({
    entry: pathToServer,
    output: path.join(pathToDist, `${p}.html`),
    url: `/${p}`
  }))
);
