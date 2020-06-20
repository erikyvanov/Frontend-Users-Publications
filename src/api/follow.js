import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export async function checkFollow(userID) {
  const url = `${API_HOST}/consultRelation?id=${userID}`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}

export function followAPI(userID) {
  const url = `${API_HOST}/relation?id=${userID}`;
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params);
}

export function unfollowAPI(userID) {
  const url = `${API_HOST}/relation?id=${userID}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params);
}

// retorna un array con usuarios o null
export async function getUsersAPI(paramsURL) {
  const url = `${API_HOST}/listUsers?${paramsURL}`;
  const params = {
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  try {
    const response = await fetch(url, params);
    return response.json();
  } catch (err) {
    return err;
  }
}
