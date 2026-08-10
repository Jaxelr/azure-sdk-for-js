# Steps after SDK generation

Generated code is only the starting point. Use this checklist after generating or regenerating an SDK package.

## Build your project

From the repo root:

```shell
pnpm install
pnpm turbo build --filter=<your-package-name>... --token 1
```

## Customize generated code when necessary

If the generated output does not meet the desired experience, use the [modular customization guide](./modular-customization.md) and coordinate significant customization work with the JavaScript architects.

## Update `CHANGELOG.md`

The release-tools package still provides the changelog helper:

```bash
npm ci --prefix eng/tools/js-sdk-release-tools
npm exec --prefix eng/tools/js-sdk-release-tools --no -- changelog-tool <your-package-path>
```

Example:

```bash
npm exec --prefix eng/tools/js-sdk-release-tools --no -- changelog-tool sdk/advisor/arm-advisor
```

## Improve `README.md`

The TypeSpec emitter produces a minimal README. Expand it with service-specific guidance, examples, prerequisites, and troubleshooting.

Reference examples:

- RLC example: [Maps Route README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/maps-route-rest/README.md)
- DPG example: [OpenAI README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/README.md)

## How to write tests for DPG/RLC/MPG

Generated packages usually include a starter `sampleTest.spec.ts` under `test/public`. Replace it with real scenarios for your service.

See the [test quickstart](./Quickstart-on-how-to-write-tests.md) for recorder setup, `TEST_MODE`, and example patterns.

### Run tests

Build from the repo root first:

```shell
pnpm turbo build --filter=${PACKAGE_NAME}... --token 1
```

Then, from the package directory, run tests in the appropriate mode:

```shell
# Linux / macOS
export TEST_MODE=record
pnpm test

# Windows CMD
set TEST_MODE=record
pnpm test
```

Use `TEST_MODE=playback` for recorded test validation and `TEST_MODE=live` for direct live runs.

If your package uses asset-sync recordings, push them after recording:

```shell
npx dev-tool test-proxy push
```

## Write samples

Author TypeScript source samples under `samples-dev/`.

Reference examples:

- DPG sample: [OpenAI samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai/samples-dev)
- RLC sample: [Maps Route samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/maps-route-rest/samples-dev)
- Template sample scaffold: [template samples-dev](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/template/template/samples-dev)

Update `tsconfig.json` so samples resolve against local source:

```json
{
  "compilerOptions": {
    "paths": {
      "@azure/your-package": ["./src/index"]
    }
  },
  "include": ["./src/**/*.ts", "./test/**/*.ts", "samples-dev/**/*.ts"]
}
```

Add sample publishing metadata to `package.json`:

```json
"//sampleConfiguration": {
  "productName": "A description of your service",
  "productSlugs": ["azure"],
  "disableDocsMs": true,
  "apiRefLink": "<learn.microsoft.com link>"
}
```

Generate the camera-ready `samples/` output from the package directory:

```shell
npx dev-tool samples publish -f
```

## Format and lint

From the package directory:

```shell
pnpm format
pnpm lint
pnpm lint:fix
```

## Adding a new third-party runtime dependency

Shipped client and management libraries (`"sdk-type": "client"` or `"sdk-type": "mgmt"`) may not take a new third-party runtime dependency without approval. CI enforces this through the `@azure/azure-sdk/ts-package-json-approved-dependencies` ESLint rule.

First-party dependencies are always allowed and do not need allow-list entries:

- `@azure/`
- `@azure-rest/`
- `@azure-tools/`
- `@microsoft/`
- `@typespec/`

To add a new third-party runtime dependency:

1. Get approval for the dependency.
2. Add it to [`eng/approved-third-party-dependencies.yml`](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/approved-third-party-dependencies.yml).
3. Run `pnpm lint` and the rest of the normal package checks.

## Create a package artifact

Once the package builds and tests cleanly:

```shell
pnpm turbo build --filter=<your-package-name>... --token 1
cd <your-sdk-folder>
pnpm pack
```

## Create or update `ci.yml`

Before opening the PR, ensure the package has the right CI file.

- `ci.yml` is used for data-plane packages.
- `ci.mgmt.yml` is used for management-plane packages.

If the package is new, follow the engineering systems guidance linked from the existing CI templates in nearby packages. If the service folder already has CI, add your package artifact entry there instead of creating a redundant pipeline file.

## Final validation before PR

From the package directory, run the local check set that mirrors CI as closely as possible:

```shell
npx dev-tool check --tag=local
```

Also run any package-specific validation scripts required by existing CI.
