import type { ZodError } from 'zod';

const formatZodError = (error: ZodError) => {
  const firstError = error.errors[0];

  if (!firstError) {
    return 'Unknown validation error';
  }

  const path = firstError.path.join('.') || 'root';

  return `Invalid response format: ${path} — ${firstError.message}`;
};

export { formatZodError };
