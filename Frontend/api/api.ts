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

interface Group {
  id?: number;
  name: string;
  members: number[];
  admin: string;
}

const api = axios.create({
  baseURL: databaseURL,
});

// Users API
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

// Groups API
export const getGroups = async () => {
  const response = await api.get("/groups/");
  return response.data;
};
export const getGroupDetail = async (id: number) => {
  const response = await api.get(`/groups/${id}`);
  return response.data;
};
export const addGroup = async (group: Group) => {
  return await api.post("/groups/", group);
};
export const updateGroup = async (group: Group) => {
  return await api.put(`/groups/${group.id}`, group);
};
export const deleteGroup = async (id: number) => {
  return await api.delete(`/groups/${id}`);
};

export default api;
