import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` 
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

const ENDPOINTS = {
  TASKS: '/tasks',
  TASK_BY_ID: (id) => `/tasks/${id}`,
  TASK_STATUS: (id) => `/tasks/${id}/status`,
};

export const getAllTasks = () => api.get(ENDPOINTS.TASKS);
export const createTask = (task) => api.post(ENDPOINTS.TASKS, task);
export const updateTask = (id, task) => api.put(ENDPOINTS.TASK_BY_ID(id), task);
export const deleteTask = (id) => api.delete(ENDPOINTS.TASK_BY_ID(id));
export const updateTaskStatus = (id, status) => api.patch(ENDPOINTS.TASK_STATUS(id), { status });