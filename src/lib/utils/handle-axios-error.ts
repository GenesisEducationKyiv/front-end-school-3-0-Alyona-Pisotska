import axios from 'axios';

export const handleAxiosError = (e: unknown): Error => {
  if (axios.isAxiosError(e)) {
    const message = e.response?.data?.message || e.message || 'Axios error';

    return new Error(message);
  }

  return e instanceof Error ? e : new Error('Unknown error');
};
