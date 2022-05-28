import fs from "fs";
import path from "path";

import server from "../lib/index.js";

async function write() {
  const res = await server({ url: process.argv[4] });
  fs.mkdir(path.dirname(process.argv[3]), {recursive: true},  () =>
    fs.writeFile(process.argv[3], "<!DOCTYPE html>\n"+res, () => process.exit(0))
  );
}
write();
