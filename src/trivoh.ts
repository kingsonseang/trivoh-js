/* eslint @typescript-eslint/no-explicit-any: "off" */
/* eslint @typescript-eslint/no-unused-vars: "off" */
"use strict";

import * as https from "https";
import * as crypto from "crypto";
import {
  ENDPOINT,
  ERRORS,
  RequestMethod,
  Meeting,
  HttpResponseData,
} from "./config";

const API_URL = "https://api.trivoh.com/api";
let CLIENT_ID = "";

/**
 * MD5
 *
 * data - Data to hash
 * @return {string} Hashed string
 */
function md5(data: string | number | Record<string, any>): string {
  const md5sum = crypto.createHash("md5");
  md5sum.update(data.toString());
  return md5sum.digest("hex");
}

/**
 * Trivoh-js API initialization
 */
export function init(client_id: string, callback = (arg0: string) => {}) {
  CLIENT_ID = client_id;

  if (!CLIENT_ID.length) {
    return returnError(ERRORS.invalid_token);
  }

  callback(CLIENT_ID);
}

/**
 * Request handler
 */
async function sendRequest(
  path: string,
  method = "GET",
  data: any = null,
  useToken?: boolean,
  callback = (arg0: any) => {},
) {
  if (method === undefined) {
    method = "POST";
  }

  const options: https.RequestOptions = {
    hostname: API_URL,
    path: path,
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (useToken === undefined) {
    useToken = false;
  }

  if (useToken && options.headers) {
    options.headers["x-api-key"] = CLIENT_ID;
  }

  try {
    const postData = data ? JSON.stringify(data) : null;
    const { statusCode, answer } = await httpsRequest(options, postData);

    if (statusCode !== 200 || answer.status === true) {
      callback(returnError({ message: answer.message, code: statusCode }));
      return;
    }

    callback(answer);
  } catch {
    callback(returnError(ERRORS.fetch_failed));
  }
}

/**
 * Create path for request
 */
function createPath(
  pathConfig: {
    uri: string;
    method: RequestMethod | string;
    requireId: boolean;
  },
  id: string | null = null,
) {
  const data = {
    path: pathConfig.uri,
    method: pathConfig.method,
  };

  if (pathConfig.requireId) {
    if (!id) {
      throw new Error(ERRORS.invalid_token.message);
    }
    data.path = data.path.replace("{id}", id);
  }

  return data;
}

/**
 * Makes an HTTPS request.
 *
 */

function httpsRequest(
  options: https.RequestOptions,
  postData: null | string = null,
): Promise<HttpResponseData> {
  return new Promise<HttpResponseData>((resolve, reject) => {
    const req = https.request(options, (res) => {
      let str = "";

      res.on("data", (chunk) => {
        str += chunk;
      });

      res.on("end", () => {
        try {
          const answer = JSON.parse(str);
          resolve({ statusCode: res.statusCode || 200, answer });
        } catch (error) {
          resolve({ statusCode: "401", answer: "Invalid JSON response" });
        }
      });
    });

    req.on("error", (e) => {
      console.error(e);
      resolve({ statusCode: "401", answer: "an error occurred" });
    });

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
}

/**
 * Form error object
 *
 */
function returnError(error: { message: string; code?: string | number }) {
  const data: { is_error: 1; message?: string; error_code?: number } = {
    is_error: 1,
  };
  if (error.message) {
    data.message = error.message;
  }
  if (error.code) {
    data.error_code = parseInt(String(error.code), 10);
  }
  return data;
}

/**
 * API interface implementation
 */

/**
 * Handler to create trivoh meeting
 */
export async function createMeeting(
  data: Meeting,
  callback = (arg0: any) => {},
) {
  if (!data.password) {
    data.password = md5(data);
  }

  const endpoint = createPath(ENDPOINT.create);

  await sendRequest(endpoint.path, endpoint.method, data, true, callback);
}

/**
 * Handler to get all trivoh meeting from client id
 *
 */
export async function getAllMeetings(callback = (arg0: any) => {}) {
  const endpoint = createPath(ENDPOINT.get);

  await sendRequest(endpoint.path, endpoint.method, null, true, callback);
}

/**
 * Handler to get trivoh meeting from client id
 *
 */
export async function getMeetingById(id: string, callback = (arg0: any) => {}) {
  const endpoint = createPath(ENDPOINT.getById, id);

  await sendRequest(endpoint.path, endpoint.method, null, true, callback);
}

/**
 * Handler to update trivoh meeting
 *
 */
export async function updateMeeting(
  id: string,
  data: Partial<Meeting>,
  callback = (arg0: any) => {},
) {
  const endpoint = createPath(ENDPOINT.updateById, id);

  await sendRequest(endpoint.path, endpoint.method, data, true, callback);
}

/**
 * Handler to delete trivoh meeting
 *
 */
export async function deleteMeeting(id: string, callback = (arg0: any) => {}) {
  const endpoint = createPath(ENDPOINT.deleteById, id);

  await sendRequest(endpoint.path, endpoint.method, null, true, callback);
}
