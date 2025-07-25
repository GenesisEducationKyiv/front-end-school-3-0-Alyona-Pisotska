import axios, { type AxiosRequestConfig } from 'axios';
import { type ZodSchema } from 'zod';
import { type Result, err } from 'neverthrow';
import { handleAxiosError, parseWithSchema } from '@/lib/utils/utils';
import { API_BASE_URL } from '@/config/config';

const fetcherGet = async <T>(
  url: string,
  config: AxiosRequestConfig = {},
  schema: ZodSchema<T>,
): Promise<Result<T, Error>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${url}`, config);

    return parseWithSchema(response.data, schema);
  } catch (e) {
    return err(handleAxiosError(e));
  }
};

const fetcherPost = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config: AxiosRequestConfig = {},
  schema?: ZodSchema<TResponse>,
): Promise<Result<TResponse, Error>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}${url}`, data, config);

    return parseWithSchema(response.data, schema);
  } catch (e) {
    return err(handleAxiosError(e));
  }
};

const fetcherPut = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig,
  schema?: ZodSchema<TResponse>,
): Promise<Result<TResponse, Error>> => {
  try {
    const response = await axios.put<TResponse>(`${API_BASE_URL}${url}`, data, config);

    return parseWithSchema(response.data, schema);
  } catch (e) {
    return err(handleAxiosError(e));
  }
};

const fetcherDelete = async <T>(
  url: string,
  config: AxiosRequestConfig = {},
  schema?: ZodSchema<T>,
): Promise<Result<T, Error>> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${url}`, config);

    return parseWithSchema(response.data, schema);
  } catch (e) {
    return err(handleAxiosError(e));
  }
};

export { fetcherGet, fetcherPost, fetcherPut, fetcherDelete };
