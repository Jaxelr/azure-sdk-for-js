# Linting in azure-sdk-for-js

This repository uses ESLint, `typescript-eslint`, and the custom `@azure/eslint-plugin-azure-sdk` ruleset to enforce Azure SDK conventions.

## Build the ESLint plugin

The repo-local ESLint plugin must be available before linting SDK packages. After `pnpm install`, either build the plugin directly or build the package you care about and let Turbo build dependencies for you.

```bash
pnpm install
pnpm turbo build --filter=@azure/eslint-plugin-azure-sdk... --token 1
```

## Lint a package

From the package directory:

```bash
cd sdk/<service-directory>/<package-directory>
pnpm lint
```

For `sdk/*` packages, `npx dev-tool check --fix` is often the fastest way to run the standard local checks and auto-fix what it can.

## Fix lint issues

Never disable rules from `@azure/eslint-plugin-azure-sdk` with `eslint-disable` comments just to make lint pass. Fix the underlying issue instead.

If a rule supports auto-fix, run:

```bash
pnpm lint:fix
```

If `lint:fix` does not resolve the issue, inspect the source and correct it manually.

## Generated code

Do not hand-edit files under `generated/`. For generator-produced packages, some warnings may originate from generated content. When suppression is truly necessary, update the package's ESLint configuration carefully rather than editing generated files.

Generated packages whose names start with `@azure/arm-` or `@azure-rest/` may see `tsdoc/syntax` warnings from generated reference text. If that happens, adjust the package's `eslint.config.mjs` using an existing package as a template and only add the minimal suppression needed.

## References

- [ESLint rules documentation](https://eslint.org/docs/latest/rules/)
- [typescript-eslint rules documentation](https://typescript-eslint.io/rules/)
