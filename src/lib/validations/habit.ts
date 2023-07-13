import { z } from 'zod';

export const Timeframe = z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']);
export const Frequency = z.enum([
  'DAILY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]);
export const TimeOfDay = z.enum(['ANY', 'MORNING', 'AFTERNOON', 'NIGHT']);

export const HabitValidator = z.object({
  title: z.string().nonempty('Title is required.'),
  target: z.number().int().positive('Target must be a positive integer.'),
  timeframe: Timeframe,
  frequency: Frequency,
  timeOfDay: TimeOfDay,
});

export type HabitFormationPayload = z.infer<typeof HabitValidator>;
export type HabitFormationFormData = z.infer<typeof HabitValidator>;
