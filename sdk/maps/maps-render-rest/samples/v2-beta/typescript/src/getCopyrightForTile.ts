// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { positionToTileXY } from "@azure-rest/maps-render";
import { DefaultAzureCredential } from "@azure/identity";
import MapsRender, { isUnexpected } from "@azure-rest/maps-render";

/**
 * @summary How to get the copyright of a certain tile.
 */
async function main(): Promise<void> {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://learn.microsoft.com/azure/azure-maps/azure-maps-authentication.
   */
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRender(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRender(credential);

  const zoom = 10;
  const tileSize = "512";
  const tileIndex = positionToTileXY([47.6101, -122.34255], zoom, tileSize);

  const response = await client.path("/map/copyright/tile/{format}", "json").get({
    queryParameters: {
      zoom,
      x: tileIndex.x,
      y: tileIndex.y,
      /** Optional, default to yes. If set to no, the textual data (generalCopyrights, copyrights under regions) won't present. */
      text: "yes",
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  if (response.body.generalCopyrights) {
    console.log("General copyrights:");
    console.log(response.body.generalCopyrights.join("\n"));
  }

  if (response.body.regions) {
    console.log("Copyright by regions");
    response.body.regions.forEach(({ country, copyrights }) => {
      console.log(`${country.ISO3}, ${country.label}: `);
      console.log(copyrights.join("\n"));
      console.log("==========");
    });
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
