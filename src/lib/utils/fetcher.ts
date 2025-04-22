import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://localhost:8000';

const fetcherGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.get<T>(`${API_BASE}${url}`, config);
  return response.data;
};

const fetcherPost = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.post<T>(`${API_BASE}${url}`, data, config);
  return response.data;
};

export { fetcherGet, fetcherPost };
