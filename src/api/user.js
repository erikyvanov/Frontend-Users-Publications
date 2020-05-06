import { API_HOST } from "../utils/constants";
import { getTokenAPI } from "./auth";

export async function getUserAPI(id) {
  const url = `${API_HOST}/view-profile?id=${id}`;
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
  };

  try {
    const response = await fetch(url, params);
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      return { error: response.status, message: await response.text() };
    }
  } catch (err) {
    return { error: 401, message: "El servidor no esta disponible" };
  }
}
