# Getting started: generate JavaScript/TypeScript RLC libraries with TypeSpec

> Only generate RLC clients when the Azure SDK architecture process has explicitly chosen that shape. Otherwise prefer the DPG workflow in [DPG-quickstart.md](./DPG-quickstart.md).

> Ensure your TypeSpec definition is merged into the main branch of [Azure REST API specs](https://github.com/Azure/azure-rest-api-specs) before starting.

For an overview of the review and release process for new libraries, see https://aka.ms/azsdk/dpcodegen.

## Prerequisites

- Node.js 22 or later
- `pnpm` installed via the [pnpm installation instructions](https://pnpm.io/installation)
- `pnpm install` already run at the root of your local `azure-sdk-for-js` clone
- `npm ci --prefix eng/common/tsp-client` run once to install the pinned `tsp-client` CLI package

## Set up your development environment

Follow the [setup guide in CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#prerequisites).

## Identify your service and package name

- **Service name**: usually the service directory in `azure-rest-api-specs`
- **Project folder**: typically `sdk/<service>/<package>-rest`
- **Package name**: usually `@azure-rest/<service>` or `@azure-rest/<service>-<module>`

## Configure `tspconfig.yaml`

In your TypeSpec project, configure the TypeScript emitter for an RLC package:

```yaml
parameters:
  "service-dir":
    default: "YOUR_SERVICE_DIRECTORY"

emit:
  - "@azure-tools/typespec-ts"

options:
  "@azure-tools/typespec-ts":
    emitter-output-dir: "{output-dir}/{service-dir}/YOUR_PACKAGE_FOLDER-rest"
    is-modular-library: false
    package-details:
      name: "@azure-rest/YOUR_PACKAGE_NAME"
      description: "SHORT_DESCRIPTION"
      version: "1.0.0-beta.1"
```

## Generate code

### Initialize a new RLC library

From the root of your local `azure-sdk-for-js` clone:

```sh
npm exec --prefix eng/common/tsp-client --no -- tsp-client init --tsp-config YOUR_REMOTE_TSPCONFIG_URL
```

### Regenerate an existing RLC library

For an existing SDK, update `tsp-location.yaml` in the package and then run this command from the SDK package directory:

```yaml
directory: specification/your-service/Your.TypeSpec.Project
commit: <spec-commit-sha>
repo: Azure/azure-rest-api-specs
```

```sh
npm exec --prefix ../../../eng/common/tsp-client --no -- tsp-client update
```

The pinned `tsp-client` dependency version is maintained in `eng/common/tsp-client/package.json`.

## Validate the generated package

Build from the repo root:

```sh
pnpm turbo build --filter=@azure-rest/YOUR_PACKAGE_NAME... --token 1
```

Then run package-local checks, typically from the package directory:

```sh
npx dev-tool check --tag=local
```

## After SDK generation

Generated code is only the starting point. Continue with the [steps after generation guide](./steps-after-generations.md) to update tests, samples, changelog entries, and CI configuration.
