import type { audioSchema } from '@/lib/validation-schema/validation-schema.ts';
import type { z } from 'zod';
type AudioData = z.infer<typeof audioSchema>;

export type { AudioData };
