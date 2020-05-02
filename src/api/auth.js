import { TOKEN, API_HOST } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function signUpAPI(user) {
  const url = `${API_HOST}/user`;
  const tempUser = {
    ...user,
    email: user.email.toLowerCase(),
  };
  delete tempUser.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempUser),
  };

  return fetch(url, params);
}

export async function signInAPI(user) {
  const url = `${API_HOST}/login`;
  const tempUser = {
    ...user,
    email: user.email.toLowerCase(),
  };
  delete tempUser.repeatPassword;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempUser),
  };

  try {
    const response = await fetch(url, params);
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    } else {
      const m = await response.text();
      return { error: 400, message: m };
    }
  } catch (err) {
    return { error: 404, message: "El servidor no esta disponible" };
  }
}

export function setTokenAPI(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenAPI() {
  return localStorage.getItem(TOKEN);
}

export function logoutAPI() {
  localStorage.removeItem(TOKEN);
}

export function isUserLogedAPI() {
  const token = getTokenAPI();

  if (!token) {
    logoutAPI();
    return null;
  }

  if (isExpired(token)) {
    logoutAPI();
    return null;
  }

  return jwtDecode(token);
}

export function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now();

  if (timeout < 1) {
    return true;
  }

  return false;
}
