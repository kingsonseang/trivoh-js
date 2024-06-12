export type RequestMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
export type Meeting = {
  title: string;
  schedule: boolean;
  start_time: string;
  end_time: string;
  password?: string;
};
export interface HttpResponseData {
  statusCode: number | string;
  answer: any;
}

export const ENDPOINT = {
  create: {
    uri: "/meeting/ext/create",
    requireId: false,
    method: "POST",
  },
  get: {
    uri: "/meeting/ext/get",
    requireId: false,
    method: "GET",
  },
  getById: {
    uri: "/meeting/ext/get/{id}",
    requireId: true,
    method: "GET",
  },
  updateById: {
    uri: "/meeting/ext/update/{id}",
    requireId: true,
    method: "PUT",
  },
  deleteById: {
    uri: "/meeting/ext/delete/{id}",
    requireId: true,
    method: "DELETE",
  },
};

export const ERRORS = {
  invalid_token: {
    message: "Invalid client id",
  },
  fetch_failed: {
    message: "Request failed",
  },
  unauthorized: {
    code: 401,
    message: "You are not authorized",
  },
};
