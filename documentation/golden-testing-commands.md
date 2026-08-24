# Useful Commands while Testing your packages

If you're not familiar with the recorder refer to [recorder-readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/README.md).

If you're looking to be onboarded to the asset-sync workflow to push out the test recordings to `Azure/azure-sdk-assets` repository, refer to [asset-sync-workflow](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md).

## `pnpm` Commands

| script name | What does it do? |
|:--|:--|
| `pnpm install` | Updates dependencies |
| `pnpm turbo build --filter=<package-name>... --token 1` | Run from the repo root to build the package and its dependency tree. |

## Commands - to run the tests inside the package directory

| script name | command (usually) |
|:--|:--|
| `pnpm test:browser` | `dev-tool run test:vitest --browser` |
| `pnpm test:node` | `dev-tool run test:vitest` |

## After migrating to asset-sync

Expects that you have `dev-tool` among your devDependencies.  
Expects that you have [powershell] installed.

| script command | What does it do? |
| :-- | :-- |
| `npx dev-tool test-proxy init` | **[Only once per package]** Generates the `assets.json` with an empty tag. After `init`, run test commands such as `pnpm test:node` to generate test recordings and `push` them. |
| `npx dev-tool test-proxy migrate --initial-push` | **[Only once per package]** To migrate the test recordings to the assets repo for the first time. Also generates `assets.json`. |
| `npx dev-tool test-proxy push` | Push the test recordings to the assets repo. |
| `npx dev-tool test-proxy reset` | Revert local changes to recordings and reset to what is currently checked in to the assets repo. This is a destructive operation. |
| `npx dev-tool test-proxy restore` | Pull the recordings from the assets repo referenced in `assets.json`. This typically happens automatically on the first playback run, but you can run it in advance for offline work. |

## Debug logs from test-proxy tool

| script command | What does it do? |
| :-- | :-- |
| `dev-tool run test:vitest --test-proxy-debug` | Provides helpful test-proxy debug logs that include sanitization modifications for both the central sanitizers and the user-specified ones. |

## Run a single test instead of the whole test suite

### [Method 1] The `.only` way

1. Update the `vitest.config.ts` as follows to include the test file you're interested in.

```ts
export default mergeConfig(
  {
    ...viteConfig,
    test: {
      include: ["test/public/node/analysis.spec.ts"],
    },
  },
  defineConfig({
    test: {
      testTimeout: 1200000,
      hookTimeout: 1200000,
    },
  }),
);
```

2. Set `.only` on the test you're interested in.

```ts
it.only("test title...")
```

3. Run the package test command, for example `pnpm test:node`.

[powershell]: https://github.com/PowerShell/PowerShell

### [Method 2] `--testNamePattern`

```bash
pnpm test:node -- --testNamePattern "simple"
```

Reference - [Filtering Tests — Introduction to Testing JavaScript with Vitest](https://stevekinney.net/courses/testing/filtering-tests)

### [Method 3] Test file path

```bash
pnpm test:node -- test/public/metricsClient.spec.ts
```
