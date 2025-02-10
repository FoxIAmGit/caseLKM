import { $host } from "./index";

export const loginApi = async (login, password) => {
  const { data } = await $host.post("api/user/login", { login, password });
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
  return data;
};

export const check = async () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logOutAPI = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return true;
};
