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

interface Course {
  id?: number;
  name: string;
  time: string;
  start_date: Date;
  end_date: Date;
  user_id: number;
  days: number[];
  days_attended: number;
  days_missed: number;
  latitude: number;
  longitude: number;
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

// Courses API
export const getCourses = async () => {
  const response = await api.get("/courses/");
  return response.data;
};
export const getCourseDetail = async (id: number) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};
export const addCourse = async (course: Course) => {
  return await api.post("/courses/", course);
};
export const updateCourse = async (course: Course) => {
  return await api.put(`/courses/${course.id}`, course);
};
export const deleteCourse = async (id: number) => {
  return await api.delete(`/courses/${id}`);
};

export default api;
