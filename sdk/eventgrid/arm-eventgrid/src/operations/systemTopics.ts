/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { SystemTopics } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { EventGridManagementClient } from "../eventGridManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  SystemTopic,
  SystemTopicsListBySubscriptionNextOptionalParams,
  SystemTopicsListBySubscriptionOptionalParams,
  SystemTopicsListBySubscriptionResponse,
  SystemTopicsListByResourceGroupNextOptionalParams,
  SystemTopicsListByResourceGroupOptionalParams,
  SystemTopicsListByResourceGroupResponse,
  SystemTopicsGetOptionalParams,
  SystemTopicsGetResponse,
  SystemTopicsCreateOrUpdateOptionalParams,
  SystemTopicsCreateOrUpdateResponse,
  SystemTopicsDeleteOptionalParams,
  SystemTopicUpdateParameters,
  SystemTopicsUpdateOptionalParams,
  SystemTopicsUpdateResponse,
  SystemTopicsListBySubscriptionNextResponse,
  SystemTopicsListByResourceGroupNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing SystemTopics operations. */
export class SystemTopicsImpl implements SystemTopics {
  private readonly client: EventGridManagementClient;

  /**
   * Initialize a new instance of the class SystemTopics class.
   * @param client Reference to the service client
   */
  constructor(client: EventGridManagementClient) {
    this.client = client;
  }

  /**
   * List all the system topics under an Azure subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: SystemTopicsListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<SystemTopic> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: SystemTopicsListBySubscriptionOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SystemTopic[]> {
    let result: SystemTopicsListBySubscriptionResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listBySubscription(options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listBySubscriptionNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listBySubscriptionPagingAll(
    options?: SystemTopicsListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<SystemTopic> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List all the system topics under a resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: SystemTopicsListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<SystemTopic> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: SystemTopicsListByResourceGroupOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<SystemTopic[]> {
    let result: SystemTopicsListByResourceGroupResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByResourceGroup(resourceGroupName, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByResourceGroupNext(
        resourceGroupName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: SystemTopicsListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<SystemTopic> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Get properties of a system topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsGetOptionalParams,
  ): Promise<SystemTopicsGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, systemTopicName, options },
      getOperationSpec,
    );
  }

  /**
   * Asynchronously creates a new system topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param systemTopicInfo System Topic information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicInfo: SystemTopic,
    options?: SystemTopicsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SystemTopicsCreateOrUpdateResponse>,
      SystemTopicsCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SystemTopicsCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, systemTopicName, systemTopicInfo, options },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      SystemTopicsCreateOrUpdateResponse,
      OperationState<SystemTopicsCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Asynchronously creates a new system topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param systemTopicInfo System Topic information.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicInfo: SystemTopic,
    options?: SystemTopicsCreateOrUpdateOptionalParams,
  ): Promise<SystemTopicsCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      systemTopicName,
      systemTopicInfo,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Delete existing system topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, systemTopicName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Delete existing system topic.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    systemTopicName: string,
    options?: SystemTopicsDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      systemTopicName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Asynchronously updates a system topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param systemTopicUpdateParameters SystemTopic update information.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicUpdateParameters: SystemTopicUpdateParameters,
    options?: SystemTopicsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<SystemTopicsUpdateResponse>,
      SystemTopicsUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<SystemTopicsUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: {
        resourceGroupName,
        systemTopicName,
        systemTopicUpdateParameters,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      SystemTopicsUpdateResponse,
      OperationState<SystemTopicsUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Asynchronously updates a system topic with the specified parameters.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param systemTopicName Name of the system topic.
   * @param systemTopicUpdateParameters SystemTopic update information.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    systemTopicName: string,
    systemTopicUpdateParameters: SystemTopicUpdateParameters,
    options?: SystemTopicsUpdateOptionalParams,
  ): Promise<SystemTopicsUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      systemTopicName,
      systemTopicUpdateParameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * List all the system topics under an Azure subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: SystemTopicsListBySubscriptionOptionalParams,
  ): Promise<SystemTopicsListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * List all the system topics under a resource group.
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: SystemTopicsListByResourceGroupOptionalParams,
  ): Promise<SystemTopicsListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * ListBySubscriptionNext
   * @param nextLink The nextLink from the previous successful call to the ListBySubscription method.
   * @param options The options parameters.
   */
  private _listBySubscriptionNext(
    nextLink: string,
    options?: SystemTopicsListBySubscriptionNextOptionalParams,
  ): Promise<SystemTopicsListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listBySubscriptionNextOperationSpec,
    );
  }

  /**
   * ListByResourceGroupNext
   * @param resourceGroupName The name of the resource group within the user's subscription.
   * @param nextLink The nextLink from the previous successful call to the ListByResourceGroup method.
   * @param options The options parameters.
   */
  private _listByResourceGroupNext(
    resourceGroupName: string,
    nextLink: string,
    options?: SystemTopicsListByResourceGroupNextOptionalParams,
  ): Promise<SystemTopicsListByResourceGroupNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, nextLink, options },
      listByResourceGroupNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopic,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.systemTopicName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopic,
    },
    201: {
      bodyMapper: Mappers.SystemTopic,
    },
    202: {
      bodyMapper: Mappers.SystemTopic,
    },
    204: {
      bodyMapper: Mappers.SystemTopic,
    },
    default: {},
  },
  requestBody: Parameters.systemTopicInfo,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.systemTopicName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
  httpMethod: "DELETE",
  responses: { 200: {}, 201: {}, 202: {}, 204: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.systemTopicName,
  ],
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics/{systemTopicName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopic,
    },
    201: {
      bodyMapper: Mappers.SystemTopic,
    },
    202: {
      bodyMapper: Mappers.SystemTopic,
    },
    204: {
      bodyMapper: Mappers.SystemTopic,
    },
    default: {},
  },
  requestBody: Parameters.systemTopicUpdateParameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.systemTopicName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/systemTopics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopicsListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/systemTopics",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopicsListResult,
    },
    default: {},
  },
  queryParameters: [Parameters.apiVersion, Parameters.filter, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listBySubscriptionNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopicsListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SystemTopicsListResult,
    },
    default: {},
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.nextLink,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
