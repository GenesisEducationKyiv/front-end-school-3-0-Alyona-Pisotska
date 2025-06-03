import axios from 'axios';

type ServerError = {
  error: string;
};

const handleAxiosError = (e: unknown): Error => {
  if (axios.isAxiosError<ServerError>(e)) {
    const errorData = e.response?.data;

    const message =
      typeof errorData === 'object' && errorData !== null && 'error' in errorData
        ? errorData.error
        : e.message || 'Axios error';

    return new Error(message);
  }

  return e instanceof Error ? e : new Error('Unknown error');
};

export { handleAxiosError };
