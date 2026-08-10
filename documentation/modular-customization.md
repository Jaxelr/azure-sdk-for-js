# Modular (DPG) customization guide

This document describes the JavaScript customization workflow for modular/generated SDKs.

## Before you customize

Before editing generated code, first ask whether the change belongs in TypeSpec. TypeSpec-driven customizations survive regeneration better than source-only edits. See the [TypeSpec client customizations reference](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/knowledge/customizing-client-tsp.md) for supported decorators such as `@@clientName` and `@@access`.

Also remember this repo rule: do not manually edit files under `generated/` as your final customization. `generated/` is regeneration input; the shipped source of truth remains `src/`.

## Initial setup

If the package has not been prepared for customization yet, run this from the package directory:

```bash
npx dev-tool customization init
```

That copies the current `src/` contents into `generated/` to establish the baseline used for future merges.

## Expected folder structure

```text
my-sdk-package/
  generated/
    <baseline generated source>
  src/
    <customized source that is built and shipped>
  test/
    <tests against src/>
  README.md
  package.json
```

- `src/` is the code customers consume.
- `generated/` is the previous generated baseline used by the customization tool.

## Making customizations

Edit the code in `src/` directly:

- rename or add exports
- adjust method shapes
- add helper files and re-exports
- reorganize code when needed for the JavaScript SDK surface

Keep customizations as focused as possible. Avoid unrelated reformatting or file churn because it makes future merges harder.

## Regeneration workflow

When the service spec changes:

1. Regenerate the package code so the newly generated output lands in `generated/`.
2. Leave those generated changes unstaged.
3. From the package directory, run:

```bash
npx dev-tool customization apply
```

The tool computes the diff between the previous `generated/` baseline and your customized `src/`, then attempts a three-way merge onto the new generated baseline.

If conflicts appear, resolve them manually in `src/`. After resolution, `src/` should represent your customizations applied to the new generated output.

## Final checks

After applying or updating customizations, run the normal package validation flow:

```bash
pnpm turbo build --filter=<package-name>... --token 1
```

Then, from the package directory, run the package checks that match CI, typically:

```bash
npx dev-tool check --tag=local
```
