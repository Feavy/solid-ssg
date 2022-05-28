import path from "path";
import util from "util";
import child_process from "child_process";
const execFile = util.promisify(child_process.execFile);

const pathToRunner = "ssg/scripts/writeToDisk.js";

async function run({ entry, output, url }: any) {
  const { stdout, stderr } = await execFile("node", [pathToRunner, entry, output, url, "--trace-warnings"]);
  if (stdout.length) console.log(stdout);
  if (stderr.length) console.log(stderr);
}

export async function renderStatic(config: any) {
  if (Array.isArray(config)) {
    await Promise.all(config.map(run));
  } else await run(config);
};
