import axios from "axios";

let databaseURL = "http://balls.webhop.me:8000/db";

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  points?: number;
  streak?: number;
  password: string;
}

const api = axios.create({
  baseURL: databaseURL,
});

export const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const getUserDetail = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (user: User) => {
  return await api.post("/users/", user);
};

export const updateUser = async (user: User) => {
  return await api.put(`/users/${user.id}`, user);
};

export const deleteUser = async (id: number) => {
  return await api.delete(`/users/${id}`);
};

export default api;
