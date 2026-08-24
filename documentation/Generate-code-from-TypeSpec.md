Getting Started: Generate JS SDK with TypeSpec
===========================================================================


# Before you Start

[TypeScript Azure SDK Design Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) is the overall design guideline of the client SDK.

## Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- [Git](https://git-scm.com/downloads)
- Local Clone of Rest API Spec Repo Fork
  - If you don't already have a fork, [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) the [Rest API Spec Repo](https://github.com/Azure/azure-rest-api-specs).
  - Clone your fork of the repo.
    ```
      git clone https://github.com/{YOUR_GITHUB_USERNAME}/azure-rest-api-specs.git
    ```
- Local Clone of JS Language Repo Fork
  - If you don't already have a fork, [Fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository) the [JS Repo](https://github.com/Azure/azure-sdk-for-js).
  - Clone your fork of the repo.

    ```
      git clone https://github.com/{YOUR_GITHUB_USERNAME}/azure-sdk-for-js.git
    ```


# Generate SDK

## Use TypeSpec defined in REST API specifications

It is recommended to configure TypeSpec package on [REST API specifications](https://github.com/Azure/azure-rest-api-specs). Please refer to [these guidelines](https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/Getting-started-with-TypeSpec-specifications.md).

### How to configure tspconfig.yaml
You can reference these two config files to configure the Modular or RLC package:
- [Modular tspconfig.yaml](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.Management/tspconfig.yaml)
- [RLC tspconfig.yaml](https://github.com/Azure/azure-rest-api-specs/blob/main/specification/contosowidgetmanager/Contoso.WidgetManager/tspconfig.yaml)

Please make sure `service-dir`, `emitter-output-dir`, `package-details`, `flavor`(for typespec-ts) is correctly configured. `experimental-extensible-enums` is the optional config.The `is-modular-library` option is true by default, if you want to generate RLC libraries for data-plane SDKs, you must add `is-modular-library: false` in your tspconfig.yaml.

- "parameters.service-dir.default" would be `sdk/<service>`
- "options.@azure-tools/typespec-ts.emitter-output-dir" would be `{output-dir}/{service-dir}/<module>`

SDK module would be generated under the SDK project folder at `sdk/<service>/<module>`.

### Generate Code with code-gen-pipeline tool (recommend)
**Notice** These steps are to generate code using the local spec repo. If you want to generate code with the github url, please refer [Generate Code with tsp-client tool](#generate-code-with-tsp-client-tool)

Install the pinned dependencies used by `tsp-client` from the repo root:
```ps
npm --prefix eng/common/tsp-client ci
```

Install `pnpm` by following the official [pnpm installation instructions](https://pnpm.io/installation) if it is not already available.

Then run `tsp-client` from the repo root against your TypeSpec configuration URL:

```
npm exec --prefix eng/common/tsp-client --no -- tsp-client init --tsp-config <url-to-tspconfig>
```

For an existing package with `tsp-location.yaml`, regenerate from the package directory with:

```ps
npm exec --prefix ../../../eng/common/tsp-client --no -- tsp-client update
```

Unlike the older release automation described in previous revisions of this document, local generation does **not** automatically update changelogs, bump versions, or create CI YAML files for you. Follow `documentation/steps-after-generations.md` for those post-generation tasks.


After all the steps finished, you can prepare the release for this generation. See [Prepare Release](#prepare-release)

### Generate Code with tsp-client tool
> To reduce workload and unnecessary mistakes, it is recommended to use the simple method from the previous section. Only if you are clear about what you are doing and the method from the previous section does not meet your needs, should you consider using the method below.

Install `tsp-client` CLI tool

```ps
npm --prefix eng/common/tsp-client ci
```

For initial set up, from the root of the SDK repo, call

```
npm exec --prefix eng/common/tsp-client --no -- tsp-client init --tsp-config <url-to-tspconfig>
```

For updating TypeSpec generated SDK, call below in the SDK module folder (`sdk/<service>/<module>`) where `tsp-location.yaml` exists

```ps
npm exec --prefix ../../../eng/common/tsp-client --no -- tsp-client update
```

**Notice**
If you use tsp-client to generate code and your generated SDK is new, you need to do one extra thing:


**1**: You should add `ci.yml` or `ci.mgmt.yml` under `sdk/<service>/<module>`. `ci.yml` is for data-plane SDKs and `ci.mgmt.yml` is for management-plane SDKs. See [Create/Update the ci.yaml](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/steps-after-generations.md#createupdate-the-ciyaml).

#### Build

See [steps-after-generations](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/steps-after-generations.md).

After all the steps finished, you can prepare the release PullRequest for this generation. See [Prepare Release](#prepare-release)

## Prepare Release

Prepare your SDK for release. The necessary approvals, guidance for testing, documentation, and release pipelines is described in your release plan. More information about the Azure SDK Release Tool is [here](https://eng.ms/docs/products/azure-developer-experience/plan/release-plan).
