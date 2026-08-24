# How to Use the Azure SDK for JavaScript

This document gives a brief introduction for new users.

1. Prepare your environment.  
   - Install [Node.js LTS](https://nodejs.org/en/download/).  
   - Install TypeScript if you want to compile `.ts` files directly: `npm install -g typescript`.

2. Create an empty folder and `cd` into it.

   ```
   mkdir jstest
   cd jstest
   ```

3. Initialize a new Node project.

   ```
   npm init -y
   ```

   This step creates a `package.json` file in the current folder.

4. Install dependencies.

   ```
   npm install @azure/identity
   npm install @azure/arm-XXX
   ```

   Or install an unpublished package from a local artifact file:

   ```
   npm install D:\\dev\\test\\test-compute\\azure-arm-XXX-1.0.0.tgz
   ```

   If you are validating an unpublished package, you can download the artifact from the relevant CI pipeline or release workflow.

5. Create a TypeScript file, for example `test_1.ts`.

   ```ts
   import { DefaultAzureCredential } from "@azure/identity";
   import { TargetManagementClient } from "@azure/arm-target";

   const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID || "";
   const credential = new DefaultAzureCredential();

   async function test() {
     const client = new TargetManagementClient(credential, subscriptionId);
     const result = [];

     for await (const item of client.operations.list()) {
       result.push(item);
     }

     console.log("The result is:\n");
     console.log(result);
   }

   test();
   ```

   In this example we call `client.operations.list()`. You can replace that with resource CRUD operations for your scenario, for example:

   ```ts
   const client = new ComputeManagementClient(credential, subscriptionId);
   const result = await client.galleries.beginCreateOrUpdateAndWait(
     resourceGroupName,
     galleryName,
     gallery,
   );
   ```

6. Install all dependencies if you have changed `package.json`.

   ```
   npm install
   ```

7. Compile the TypeScript file.

   ```
   tsc test_1.ts
   ```

   This generates `test_1.js`.

8. Run the code.

   ```
   node test_1.js
   ```

Now you can see the response.
