import axios, { AxiosRequestConfig } from 'axios';

const API_BASE = 'http://localhost:8000';

const fetcherGet = async <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> => {
  const response = await axios.get<TResponse>(`${API_BASE}${url}`, config);
  return response.data;
};

const fetcherPost = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await axios.post<TResponse>(`${API_BASE}${url}`, data, config);
  return response.data;
};

export { fetcherGet, fetcherPost };
