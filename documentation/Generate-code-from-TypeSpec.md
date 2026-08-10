# Generate JavaScript SDKs from TypeSpec

This guide describes the supported local workflows for generating JavaScript/TypeScript SDKs from TypeSpec definitions.

## Before you start

Review the [TypeScript Azure SDK design guidelines](https://azure.github.io/azure-sdk/typescript_design.html) before changing generated client libraries.

### Prerequisites

- Node.js 22 or later
- `pnpm` installed via the [pnpm installation instructions](https://pnpm.io/installation)
- A local clone of your `azure-rest-api-specs` fork
- A local clone of your `azure-sdk-for-js` fork
- `pnpm install` already run in `azure-sdk-for-js`

## Generate SDKs from TypeSpec in `azure-rest-api-specs`

It is recommended to keep the TypeSpec project in [Azure REST API specs](https://github.com/Azure/azure-rest-api-specs). For service-side setup, see the [TypeSpec getting started guide](https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/Getting-started-with-TypeSpec-specifications.md).

### Configure `tspconfig.yaml`

Use one of these examples as references:

- [Modular client example](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.Management/tspconfig.yaml)
- [RLC example](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.WidgetManager/tspconfig.yaml)

Verify these settings carefully:

- `parameters.service-dir.default` should be the service folder under `sdk/`
- `options.@azure-tools/typespec-ts.emitter-output-dir` should point at `sdk/<service>/<package>`
- `package-details` should match the intended npm package
- `flavor` should be configured appropriately when required by `@azure-tools/typespec-ts`
- `is-modular-library: false` is required for RLC generation

Generated SDK code lands under `sdk/<service>/<package>` in this repo.

## Recommended workflow: `code-gen-pipeline`

If you are generating from a local specs checkout, prefer the release-tools pipeline command instead of calling `tsp-client` directly.

Install the required tool dependencies:

```bash
npm ci --prefix eng/common/tsp-client
npm ci --prefix eng/tools/js-sdk-release-tools
```

Create a local `generatedInput.json` file such as:

```json
{
  "dryRun": false,
  "specFolder": "<path-to-local-spec-repo>",
  "headSha": "<spec-commit-sha>",
  "repoHttpsUrl": "https://github.com/Azure/azure-rest-api-specs",
  "relatedTypeSpecProjectFolder": [
    "specification/SERVICE_DIRECTORY_NAME/PACKAGE_DIRECTORY_NAME/"
  ]
}
```

Run the pipeline tool:

```bash
npm exec --prefix eng/tools/js-sdk-release-tools --no -- code-gen-pipeline --inputJsonPath=<path-to-generatedInput.json> --outputJsonPath=<path-to-generatedOutput.json> --typespecEmitter=@azure-tools/typespec-ts --local
```

This workflow can:

1. Generate package code from TypeSpec
2. Build the package
3. Generate and optionally run tests
4. Generate samples when enabled
5. Create or update `CHANGELOG.md`
6. Bump the package version according to repo policy
7. Create or update `ci.yml` / `ci.mgmt.yml` for new packages

After generation, continue with [steps after generation](./steps-after-generations.md).

## Direct workflow: `tsp-client`

Use `tsp-client` directly only when you need more granular control.

Install the pinned CLI package first:

```bash
npm ci --prefix eng/common/tsp-client
```

### Initialize a new SDK

From the root of the `azure-sdk-for-js` repo, run:

```bash
npm exec --prefix eng/common/tsp-client --no -- tsp-client init --tsp-config <url-to-tspconfig>
```

### Update an existing SDK

For an existing package, run the command from the package directory that contains `tsp-location.yaml`:

```bash
npm exec --prefix ../../../eng/common/tsp-client --no -- tsp-client update
```

If you use `tsp-client` directly for a brand-new package, you must still handle the follow-up repo work yourself, including CI configuration and the post-generation cleanup described in [steps after generation](./steps-after-generations.md).

## Build and validate the generated package

After code generation:

```bash
pnpm turbo build --filter=<package-name>... --token 1
```

Then run the package checks that match CI for the affected package, typically from the package directory:

```bash
npx dev-tool check --tag=local
```

## Prepare release work

Release approval, testing, and publishing guidance live in the release plan workflow. See the Azure SDK release tooling documentation referenced from your service team's process.
