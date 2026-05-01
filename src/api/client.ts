import { API_URL } from "@/config/constants";
import axios, { type AxiosResponse } from "axios";

const api = axios.create({
  baseURL: API_URL,
});

export interface PaginatedResponse<T> {
  data: T[];
  total: string;
}

export type Response<T> = T;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}, Promise.reject);

export const apiClient = {
  get: <T>(url: string, params?: object): Promise<PaginatedResponse<T>> =>
    api.get(url, { params }).then((response) => response.data),

  getBlob: (url: string, params?: object): Promise<Blob> =>
    api.get(url, { params, responseType: 'blob' }).then((response) => response.data),

  getOne: <T>(url: string, params?: object): Promise<T> =>
    api.get(url, { params }).then((response) => response.data),

  findOne: <T>(url: string, params?: object): Promise<Response<T>> =>
    api.get(url, { params }).then((response) => response.data),

  post: <T, R = T>(url: string, data: T): Promise<R> =>
    api.post<T, AxiosResponse<R>>(url, data).then((response) => response.data),

  put: <T, R = T>(url: string, data: T): Promise<R> =>
    api.put<T, AxiosResponse<R>>(url, data).then((response) => response.data),

  patch: <T, R = T>(url: string, data: T): Promise<R> =>
    api.patch<T, AxiosResponse<R>>(url, data).then((response) => response.data),

  delete: (url: string): Promise<void> => api.delete(url).then(() => undefined),
};
