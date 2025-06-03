import axios from 'axios';
import { z } from 'zod';

const ServerErrorSchema = z.object({ error: z.string() });

const handleAxiosError = (e: unknown): Error => {
  if (axios.isAxiosError(e)) {
    const parsed = ServerErrorSchema.safeParse(e.response?.data);
    const message = parsed.success ? parsed.data.error : e.message || 'Axios error';

    return new Error(message);
  }

  return e instanceof Error ? e : new Error('Unknown error');
};

export { handleAxiosError };
