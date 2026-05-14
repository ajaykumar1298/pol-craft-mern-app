import api from "./axios";

export const loginUser = async (body) => {
  const res = await api.post("/auth/login", body);
  return res.data;
};

export const registerUser = async (body) => {
  const res = await api.post("/auth/register", body);
  return res.data;
};
