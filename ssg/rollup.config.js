import { DEFAULTS, nodeResolve } from "@rollup/plugin-node-resolve";
import common from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { DEFAULT_EXTENSIONS } from '@babel/core';

const typescriptExtensions = [
  '.ts',
  '.tsx'
];

const nodeResolveExtensions = [
  ...(DEFAULTS.extensions),
  ...typescriptExtensions
];

const babelExtensions = [
  ...DEFAULT_EXTENSIONS,
  ...typescriptExtensions
];

export default [
  {
    input: "ssg/index.js",
    output: [
      {
        dir: "ssg/lib",
        exports: "auto",
        format: "module"
      }
    ],
    external: ["solid-js", "solid-js/web"],
    plugins: [
      nodeResolve({ nodeResolveExtensions, preferBuiltins: true, exportConditions: ["solid", "node"] }),
      typescript(),
      babel({
        extensions: babelExtensions,
        babelHelpers: "bundled",
        presets: [["solid", { generate: "ssr", hydratable: true }]]
      }),
      common()
    ]
  },
  {
    input: "web/src/index.tsx",
    output: [
      {
        dir: "dist/js",
        format: "esm"
      }
    ],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve({ extensions: nodeResolveExtensions, exportConditions: ["solid"] }),
      typescript(),
      babel({
        extensions: babelExtensions,
        babelHelpers: "bundled",
        presets: [["solid", { generate: "dom", hydratable: true }]]
      }),
      terser(),
      common(),
      copy({
        targets: [
          {
            src: ["web/static/*"],
            dest: "dist"
          }
        ]
      })
    ]
  }
];
