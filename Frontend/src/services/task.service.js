import axios from "axios";
import { getData } from "../utils/manageData.js";

const BASE_URL = "http://localhost:4500";

const getToken = () => getData("token");

export const createTodoService = async (data) => {
  const token = getToken();
  const res = await axios.post(`${BASE_URL}/todo/create-todo`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res?.data;
};

export const updateTodoService = async (id, data) => {
  const token = getToken();
  const res = await axios.put(`${BASE_URL}/todo/update-todo/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res?.data;
};

export const getTodosService = async (page = 1, limit = 10, status = "all") => {
  const token = getToken();
  const res = await axios.get(`${BASE_URL}/todo/get-todos?page=${page}&limit=${limit}&status=${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res?.data;
};

export const deleteTodoService = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${BASE_URL}/todo/delete-todo/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res?.data;
};

export const updateStatusService = async (id) => {
  const token = getToken();
  const data = { status: "completed" }; 
  const res = await axios.patch(`${BASE_URL}/todo/update-todo-status/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res?.data;
};