import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://localhost:8000';

const fetcherGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axios.get<T>(`${API_BASE}${url}`, config);
  return response.data;
};

export { fetcherGet };
