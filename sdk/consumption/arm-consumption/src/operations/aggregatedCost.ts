/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { AggregatedCost } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ConsumptionManagementClient } from "../consumptionManagementClient.js";
import {
  AggregatedCostGetByManagementGroupOptionalParams,
  AggregatedCostGetByManagementGroupResponse,
  AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams,
  AggregatedCostGetForBillingPeriodByManagementGroupResponse
} from "../models/index.js";

/** Class containing AggregatedCost operations. */
export class AggregatedCostImpl implements AggregatedCost {
  private readonly client: ConsumptionManagementClient;

  /**
   * Initialize a new instance of the class AggregatedCost class.
   * @param client Reference to the service client
   */
  constructor(client: ConsumptionManagementClient) {
    this.client = client;
  }

  /**
   * Provides the aggregate cost of a management group and all child management groups by current billing
   * period.
   * @param managementGroupId Azure Management Group ID.
   * @param options The options parameters.
   */
  getByManagementGroup(
    managementGroupId: string,
    options?: AggregatedCostGetByManagementGroupOptionalParams
  ): Promise<AggregatedCostGetByManagementGroupResponse> {
    return this.client.sendOperationRequest(
      { managementGroupId, options },
      getByManagementGroupOperationSpec
    );
  }

  /**
   * Provides the aggregate cost of a management group and all child management groups by specified
   * billing period
   * @param managementGroupId Azure Management Group ID.
   * @param billingPeriodName Billing Period Name.
   * @param options The options parameters.
   */
  getForBillingPeriodByManagementGroup(
    managementGroupId: string,
    billingPeriodName: string,
    options?: AggregatedCostGetForBillingPeriodByManagementGroupOptionalParams
  ): Promise<AggregatedCostGetForBillingPeriodByManagementGroupResponse> {
    return this.client.sendOperationRequest(
      { managementGroupId, billingPeriodName, options },
      getForBillingPeriodByManagementGroupOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getByManagementGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Consumption/aggregatedcost",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementGroupAggregatedCostResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.filter, Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.managementGroupId],
  headerParameters: [Parameters.accept],
  serializer
};
const getForBillingPeriodByManagementGroupOperationSpec: coreClient.OperationSpec = {
  path:
    "/providers/Microsoft.Management/managementGroups/{managementGroupId}/providers/Microsoft.Billing/billingPeriods/{billingPeriodName}/providers/Microsoft.Consumption/aggregatedCost",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ManagementGroupAggregatedCostResult
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.billingPeriodName,
    Parameters.managementGroupId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
