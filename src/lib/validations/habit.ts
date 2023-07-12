const { z } = require('zod');

const habitSchema = z.object({
  title: z.string().nonempty('Title is required.'),
  target: z.number().int().positive('Target must be a positive integer.'),
  timeframe: z.enum(['HOUR', 'DAY', 'WEEK', 'MONTH']),
  frequency: z.enum([
    'DAILY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ]),
  status: z.enum(['INCOMPLETE', 'CHECK', 'FAIL', 'SKIP']),
  timeOfDay: z.enum(['ANY', 'MORNING', 'AFTERNOON', 'NIGHT']),
});
