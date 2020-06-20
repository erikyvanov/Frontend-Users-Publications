import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export function addPostAPI(message) {
  const url = `${API_HOST}/post`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: JSON.stringify({ message }),
  };

  return fetch(url, params);
}

export function getPostsAPI(IDUser, page) {
  const url = `${API_HOST}/posts?id=${IDUser}&page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((err) => err);
}

export function getPostFollowAPI(page) {
  const url = `${API_HOST}/readFollowedPosts?page=${page}`;

  const params = {
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  return fetch(url, params)
    .then((response) => response.json())
    .catch((err) => err);
}
