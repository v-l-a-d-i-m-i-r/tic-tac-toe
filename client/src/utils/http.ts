import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { getToken } from './localStorage';

export async function request<T, D = unknown>(config: AxiosRequestConfig<D>): Promise<T> {
  const headers: RawAxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  try {
    const { data } = await axios.request<T, AxiosResponse<T>, D>({
      ...config,
      headers: {
        ...config.headers || {},
        ...headers,
      },
    });

    return data;
  } catch (error) {
    // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      throw error.response.data.message;
    }
    throw error.message;
  }
}
