# Guide for migrating to code generation from TypeSpec (Azure JavaScript SDK)

> **Terminology used in this guide**
>
> - **Libraries generated from TypeSpec**: Client libraries produced by the **TypeSpec Emitter** (the new generation toolchain).  
>   Previously referred to as *“modular”/“modularized libraries.”*
> - **Libraries generated with AutoRest**: Client libraries produced by the **AutoRest Code Generator** (previous generation).  
>   Previously referred to as *“HLC”, "Swagger generator", "OpenAPI Generator"*

This guide helps developers transition their JavaScript/TypeScript applications to use the *TypeSpec generated* Azure SDK libraries.

**For new customers of the JavaScript/TypeScript SDK ([azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js)), please see [quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/quickstart-guide-for-libraries-generated-from-TypeSpec.md).**

## Current status

Several packages generated from *TypeSpec* have already reached General Availability (GA), including `@azure/arm-avs`, `@azure/arm-fabric`, `@azure/arm-oracledatabase`, `@azure/keyvault-admin`. We are actively working on releasing more packages and eventually cover all Azure services. Please find the latest version of those libraries in [npm](https://www.npmjs.com) and give them a try.

## Library improvements when generating from *TypeSpec*

We recommend reviewing the [complete guide](https://devblogs.microsoft.com/azure-sdk/azure-sdk-modularized-libraries-for-javascript/) for full details. Compared to libraries generated with *Autorest*, *TypeSpec code generation* has following key benefits:

1. Subpath exports: Libraries now leverage [subpath exports](https://nodejs.org/api/packages.html#subpath-exports) (introduced in Node.js version 12.7) to provide layered APIs. This means developers can access the familiar `Client` at the root level while also using the `/api` subpath for fine-grained, operation-level imports.
2. Bundle size optimization: By leveraging the new `/api` subpath export, developers can selectively import only the operations they need. This approach minimizes the overall library footprint in the application bundle, ensuring that only the required pieces are included.
3. Long-running operations: Based on customer feedback, the generated API is simpler. Previously, clients exposed two methods for each *long-running operation* (`beginDoSth` and `beginDoSthAndWait`). Libraries generated from *TypeSpec* now expose a single LRO entrypoint (for example, `doSth`) that returns a poller you can either await directly or drive manually.

## How to migrate to libraries generated from TypeSpec

If you’re updating an existing application from **libraries generated with AutoRest** to **libraries generated from TypeSpec**, focus on these key areas:

1. **Long-running operations (LROs)** – Updated method signatures and poller behavior
2. **List operations (paging)** – Simplified continuation token handling

### Long-running Operations (LROs)

Based on customer feedback, LROs were simplified to make the API **cleaner and more ergonomic**. Two changes matter most for migration:

- **Method shape**: two methods → one method  
- **Polling flow**: direct await is supported on the returned poller  

#### Method signature changes

Previously (libraries generated with **AutoRest**), each LRO exposed two methods (for example, `beginStart` and `beginStartAndWait`).  
Now (libraries generated from **TypeSpec**), there’s a **single** method that returns the poller.

**AutoRest-generated (previous)**

```ts
beginStart(
  options?: IntegrationRuntimesStartOptionalParams,
): Promise<
  SimplePollerLike<
    OperationState<IntegrationRuntimesStartResponse>,
    IntegrationRuntimesStartResponse
  >
>;
beginStartAndWait(
  options?: IntegrationRuntimesStartOptionalParams,
): Promise<IntegrationRuntimesStartResponse>;
```

**TypeSpec-generated (current)**

```ts
start(
  options?: IntegrationRuntimesStartOptionalParams,
): PollerLike<OperationState<IntegrationRuntimesStartResponse>, IntegrationRuntimesStartResponse>;
```

**Migrate your usage**

```ts
// Before (AutoRest-generated)
const result = await client.beginStartAndWait();

const poller = await client.beginStart();
const result2 = await poller.pollUntilDone();

// After (TypeSpec-generated)
const result = await client.start();

const poller = client.start();
const result2 = await poller.pollUntilDone();
```

> `PollerLike` returned by these libraries is promise-like, so `await client.start()` resolves to the final result.

#### Poller behavior differences

| Capability | AutoRest (`SimplePollerLike`) | TypeSpec (`PollerLike`) |
|---|---|---|
| Get the final result | `beginXxxAndWait()` or `pollUntilDone()` | `await client.xxx()` or `pollUntilDone()` |
| Poll manually | `poll()` | `poll()` |
| Observe progress | `onProgress()` | `onProgress()` |
| Check completion | `getOperationState().isCompleted` | `getOperationState().isCompleted` |
| Serialize state for resume | `toString()` | `toString()` |

For more detail, see the core-lro migration guide:  
<https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/docs/MIGRATION.md>

#### Quick migration checklist

- Replace `client.beginXxxAndWait()` → `await client.xxx()`.  
- Replace `const poller = await client.beginXxx()` → `const poller = client.xxx()`.  
- Continue using `await poller.pollUntilDone()` when you need manual poller access.  
- If you serialize pollers for later resume, follow the package-specific migration notes and the `core-lro` migration guide.  

### List operations (paging)

Paging has been simplified in libraries generated from TypeSpec. Two main changes:

- **Removed unsupported `maxpagesize`**  
- **Replaced `getContinuationToken` helper with direct `continuationToken` property**

#### `maxpagesize` removed

The `maxpagesize` setting was never supported in AutoRest-generated clients, so it has been removed from `PageSettings`. No behavioral impact is expected.

#### Continuation token access simplified

Previously, you needed a helper function to extract the continuation token:

**AutoRest-generated (previous)**

```ts
const firstPage = await iter.byPage().next();
const continuationToken = getContinuationToken(firstPage);
```

Now, the token is exposed directly on the page object:

**TypeSpec-generated (current)**

```ts
const firstPage = await iter.byPage().next();
const continuationToken = firstPage.value.continuationToken;
```

## Need help

If you have encountered an issue during migration, please file an issue via [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues) and make sure you add the 'Preview' label to the issue.
