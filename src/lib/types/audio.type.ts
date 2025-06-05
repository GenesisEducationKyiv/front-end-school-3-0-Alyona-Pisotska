import type { z } from 'zod';
import type { audioSchema } from '@/lib/validation-schema/validation-schema';

type AudioData = z.infer<typeof audioSchema>;

export type { AudioData };
