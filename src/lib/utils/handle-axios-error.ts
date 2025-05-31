import axios from 'axios';

const handleAxiosError = (e: unknown): Error => {
  if (axios.isAxiosError(e)) {
    const message = e.message || 'Axios error';

    return new Error(message);
  }

  return e instanceof Error ? e : new Error('Unknown error');
};

export { handleAxiosError };
