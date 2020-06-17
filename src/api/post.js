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

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Post enviado" };
      }
      return { code: 500, message: response.text() };
    })
    .catch(() => ({ code: 500, message: "El servidor no esta disponible" }));
}
