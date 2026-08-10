# Bundling Azure SDK libraries for the browser

To use Azure SDK libraries in a browser app, bundle your application with a browser-capable bundler. This guide uses standard npm-based app setup because it targets consumers of published Azure SDK packages rather than contributors working inside this monorepo.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/)
- Use the npm CLI that ships with Node.js
- Pick a bundler such as [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), or [Parcel](https://parceljs.org/)

Check your tools:

```sh
node --version
npm --version
```

## Set up a sample app

If you do not already have a web app project:

```sh
mkdir example
cd example
npm init -y
```

Then install the Azure SDK package you want to use. For example:

```sh
npm install @azure/storage-blob
```

## Choose a bundler

Most Azure SDK browser scenarios work with modern bundlers. If your selected package depends on browser shims or additional plugins, consult that package's README for browser-specific notes.

## Webpack example

Install webpack locally in your app:

```sh
npm install --save-dev webpack webpack-cli
```

### JavaScript entrypoint

Create `src/index.js`:

```js
import { BlobServiceClient } from "@azure/storage-blob";

console.log(BlobServiceClient);
```

Run webpack:

```sh
npx webpack --mode=development
```

By default, webpack writes the bundle to `dist/main.js`.

Use it from HTML:

```html
<script src="./dist/main.js"></script>
```

### TypeScript entrypoint

Install TypeScript support:

```sh
npm install --save-dev typescript ts-loader
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es2020"
  }
}
```

Create `src/index.ts`:

```ts
import { BlobServiceClient } from "@azure/storage-blob";

console.log(BlobServiceClient);
```

Create `webpack.config.js`:

```js
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
```

Bundle it:

```sh
npx webpack --mode=development
```

## Rollup example

Install Rollup locally:

```sh
npm install --save-dev rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-json
```

Create `src/index.js`:

```js
import { BlobServiceClient } from "@azure/storage-blob";

console.log(BlobServiceClient);
```

Create `rollup.config.mjs`:

```js
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "esm"
  },
  plugins: [nodeResolve({ browser: true }), commonjs(), json()]
};
```

Run Rollup:

```sh
npx rollup -c
```

## Parcel example

Install Parcel locally:

```sh
npm install --save-dev parcel
```

Create `index.html`:

```html
<!doctype html>
<html>
  <body>
    <script type="module" src="./src/index.ts"></script>
  </body>
</html>
```

Create `src/index.ts`:

```ts
import { BlobServiceClient } from "@azure/storage-blob";

console.log(BlobServiceClient);
```

Run Parcel:

```sh
npx parcel index.html
```

## Notes

- Prefer local dev dependencies plus `npx` over global bundler installs.
- Some Azure SDK packages are Node-only and are not intended for browsers. Check the package README before adopting it in a browser app.
- If bundling fails because of missing browser polyfills, consult your bundler's documentation and the SDK package README for browser support guidance.
