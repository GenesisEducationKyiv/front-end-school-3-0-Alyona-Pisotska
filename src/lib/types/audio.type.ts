import { z } from 'zod';
import { audioSchema } from '@/lib/validation-schema/validation-schema.ts';

type AudioData = z.infer<typeof audioSchema>;

export type { AudioData };
