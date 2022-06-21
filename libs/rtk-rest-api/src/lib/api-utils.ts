import type { SerializedError } from '@reduxjs/toolkit';

declare type NetworkError = {
  status: string;
  error: string;
};

export declare type HydroQueryError = {
  status: number;
  data: {
    error: {
      status: number;
      name: string;
      message: string;
      details?: any;
    };
  };
};

/**
 * Redux Toolkit Query Response Types
 */

export type RtkQueryError =
  | HydroQueryError
  | NetworkError
  | SerializedError
  | undefined;

type RtkQueryResponse<T = any> = T | RtkQueryError;

export enum RestErrorStatus {
  UnknownError = -1,
  NullResponse = -2,
  NetworkError = -3,
  SerializedError = -4,
}

export type RestRequestError = {
  status: RestErrorStatus;
  name: string;
  message: string;
  details?: string;
};

export const isErrorResponse = (res: RtkQueryResponse) =>
  !res || !('data' in res) || ('error' in res['data'] && res['data']['error']);

export const formatRestRequestError = (
  rawError: RtkQueryError
): RestRequestError => {
  let status: RestErrorStatus | undefined;
  let name: string | undefined;
  let message: string | undefined;
  let details: string | undefined;

  if (!rawError) {
    status = RestErrorStatus.NullResponse;
    name = 'NULL_RESPONSE';
    message = '';
  } else if ('error' in rawError) {
    // RTKQueryNetworkError
    status = RestErrorStatus.NetworkError;
    name = rawError['status'];
    message = rawError['error'];
  } else if ('stack' in rawError && 'code' in rawError) {
    // SerializedError
    status = RestErrorStatus.SerializedError;
    name = rawError['name'] ?? 'no name';
    message = rawError['message'] ?? 'no message';
    details = `${rawError['code'] || 'no code'}\n${
      rawError['stack'] || 'no stack'
    }`;
  } else if ('status' in rawError) {
    status = rawError['status'];
    ({ name, message, details } = rawError['data']['error']);
  } else {
    status = RestErrorStatus.UnknownError;
    name = 'UNKNOWN_ERROR';
    message = JSON.stringify(rawError);
  }

  return {
    status,
    name,
    message,
    details,
  };
};
