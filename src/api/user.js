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

export async function uploadAvatarAPI(file) {
  const url = `${API_HOST}/uploadAvatar`;
  const formData = new FormData();
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, params);
    if (response.status >= 200 && response.status < 300) {
      return { OK: true };
    } else {
      return { error: "No se subio la foto de perfil" };
    }
  } catch (err) {
    return err;
  }
}

export async function updateInfoApi(data) {
  const url = `${API_HOST}/modify-profile`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer${getTokenAPI()}`,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, params);
    if (response.status >= 200 && response.status < 300) {
      return { status: "OK" };
    } else {
      return { error: response.status, message: await response.text() };
    }
  } catch (err) {
    return { error: 401, message: "El servidor no esta disponible" };
  }
}
