import { API_HOST } from "../utils/constants";

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
