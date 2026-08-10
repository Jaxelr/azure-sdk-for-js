# Getting started with Azure management libraries for JavaScript/TypeScript

This quickstart shows the current authentication and usage patterns for Azure Resource Manager libraries in this repo.

For guidance on upgrading from older track 1 or early track 2 management libraries, see [MIGRATION-guide-for-next-generation-management-libraries.md](./MIGRATION-guide-for-next-generation-management-libraries.md).

## Prerequisites

You typically need:

- `AZURE_SUBSCRIPTION_ID`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`

Set them as environment variables before running samples.

## Install packages

Example:

```sh
npm install @azure/arm-compute @azure/arm-resources @azure/identity
```

## Authenticate

Use `DefaultAzureCredential` from `@azure/identity`:

```ts
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
```

## Create clients

```ts
import { ComputeManagementClient } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();

const computeClient = new ComputeManagementClient(credential, subscriptionId);
const resourceClient = new ResourceManagementClient(credential, subscriptionId);
```

## Create a resource group

```ts
import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID!;
const credential = new DefaultAzureCredential();
const resourceClient = new ResourceManagementClient(credential, subscriptionId);

async function createResourceGroup(resourceGroupName: string) {
  const result = await resourceClient.resourceGroups.createOrUpdate(resourceGroupName, {
    location: "eastus",
    tags: {
      tag1: "value1"
    }
  });
  console.log(result.name);
}
```

## Update a resource group

```ts
async function updateResourceGroup(resourceGroupName: string) {
  const result = await resourceClient.resourceGroups.update(resourceGroupName, {
    tags: {
      tag1: "value1",
      tag2: "value2"
    }
  });

  console.log(result.tags);
}
```

## List resource groups

Management libraries use async iterators for list operations:

```ts
async function listResourceGroups() {
  for await (const item of resourceClient.resourceGroups.list()) {
    console.log(item.name);
  }
}
```

## Create a virtual machine client and begin an LRO

Long-running operations use the `begin*` / `begin*AndWait` patterns:

```ts
async function getVirtualMachine(resourceGroupName: string, vmName: string) {
  const vm = await computeClient.virtualMachines.get(resourceGroupName, vmName);
  console.log(vm.name);
}
```

For end-to-end service-specific examples, prefer the samples shipped with each `@azure/arm-*` package.
