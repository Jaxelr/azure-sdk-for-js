# Dependency management

This repository uses `pnpm` workspaces plus the version catalogs defined in `pnpm-workspace.yaml`.

For contributor workflows inside `azure-sdk-for-js`, prefer the dependency guidance in [CONTRIBUTING.md](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#installing-and-managing-dependencies). This document focuses on dependency policy and on application-level transitive dependency updates.

> **SDK authors:** for the policy on taking a new third-party runtime dependency in a shipped library, see [Adding a new third-party runtime dependency](./steps-after-generations.md#adding-a-new-third-party-runtime-dependency).

## Repo dependency rules

- Use `pnpm`, not `npm install`, for workspace package changes in this repo.
- Prefer existing catalog entries in `pnpm-workspace.yaml` when adding or updating shared dependencies.
- Use `workspace:` ranges for local first-party packages when appropriate.
- Commit `pnpm-lock.yaml` changes when dependency changes require them.

## Example scenario: updating a transitive dependency in an application

Sometimes a consuming application, not this repo, needs to move a transitive dependency forward because of a security advisory or bug fix.

As an example, suppose your app depends on `@azure/keyvault-keys` and a scanner flags an older transitive version of `node-fetch`.

### Identify the dependency tree

```text
npm ls node-fetch
```

Example output from an application might look like:

```text
my-app@1.0.0 /home/user/my-app
└─┬ @azure/keyvault-keys@4.10.0
  └─┬ <transitive dependency chain>
    └── node-fetch@2.6.6
```

The exact tree changes over time; the important step is to inspect your application's installed graph rather than assuming a specific Azure SDK internal package layout.

### Use `npm audit fix` in the consuming app

If `npm audit` reported the issue and the update is semver-compatible, try:

```text
npm audit fix
```

### Use `npm update` in the consuming app

For non-security cases, you can often refresh the resolved version with:

```text
npm update node-fetch
```

Both commands apply to the consuming application's own lockfile, not to the `azure-sdk-for-js` workspace.

## Updating dependencies inside this repo

When you need to update a dependency for an SDK package in this repo:

1. Check whether the dependency already exists in `pnpm-workspace.yaml` under `catalog` or `catalogs`.
2. From the package directory, use `pnpm add <package>` or `pnpm add -D <package>` when the dependency should be managed normally by pnpm.
3. If the dependency should use a shared catalog version, set the package entry to `catalog:` (or the named catalog such as `catalog:testing`) as appropriate.
4. Run `pnpm install` from the repo root.
5. Validate the affected package with its normal checks.

## Need help?

If you are unsure how to update a dependency range or catalog entry in this repo, open an issue or ask the JavaScript SDK maintainers before introducing a one-off version that fights the workspace configuration.
