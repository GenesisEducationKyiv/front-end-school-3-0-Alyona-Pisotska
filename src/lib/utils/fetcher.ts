import axios, { AxiosRequestConfig } from 'axios';
import { ZodSchema } from 'zod';
import { Result, ok, err } from 'neverthrow';

const API_BASE = 'http://localhost:8000';

const fetcherGet = async <T>(
  url: string,
  config: AxiosRequestConfig = {},
  schema: ZodSchema<T>,
): Promise<Result<T, Error>> => {
  try {
    const response = await axios.get(`${API_BASE}${url}`, config);
    const parsed = schema.safeParse(response.data);

    if (!parsed.success) {
      return err(new Error(`Invalid response format: ${parsed.error.message}`));
    }

    return ok(parsed.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response?.data?.message || e.message || 'Axios error';

      return err(new Error(message));
    }

    return err(e instanceof Error ? e : new Error('Unknown error'));
  }
};

const fetcherPost = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config: AxiosRequestConfig = {},
  schema?: ZodSchema<TResponse>,
): Promise<Result<TResponse, Error>> => {
  try {
    const response = await axios.post(`${API_BASE}${url}`, data, config);

    if (schema) {
      const parsed = schema.safeParse(response.data);

      if (!parsed.success) {
        return err(new Error(`Invalid response format: ${parsed.error.message}`));
      }

      return ok(parsed.data);
    }

    return ok(response.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response?.data?.message || e.message || 'Axios error';

      return err(new Error(message));
    }

    return err(e instanceof Error ? e : new Error('Unknown error'));
  }
};

const fetcherPut = async <TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  config?: AxiosRequestConfig,
): Promise<TResponse> => {
  const response = await axios.put<TResponse>(`${API_BASE}${url}`, data, config);
  return response.data;
};

const fetcherDelete = async <TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> => {
  const response = await axios.delete<TResponse>(`${API_BASE}${url}`, config);
  return response.data;
};

export { fetcherGet, fetcherPost, fetcherPut, fetcherDelete };
