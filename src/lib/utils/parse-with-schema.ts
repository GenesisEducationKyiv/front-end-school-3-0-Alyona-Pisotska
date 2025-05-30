import { ZodSchema } from 'zod';
import { Result, ok, err } from 'neverthrow';
import { formatZodError } from '@/lib/utils/utils.ts';

const parseWithSchema = <T>(data: unknown, schema?: ZodSchema<T>): Result<T, Error> => {
  if (!schema) {
    return ok(data as T);
  }

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    return err(new Error(formatZodError(parsed.error)));
  }

  return ok(parsed.data);
};

export { parseWithSchema };
